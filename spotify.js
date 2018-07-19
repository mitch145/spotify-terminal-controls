require('dotenv').config()
var exec = require('child_process').exec;
var readline = require('readline');
var chalk = require('chalk');

function execute(command, callback) {
  exec(command, function (error, stdout, stderr) { callback(stdout); });
};

function msToMinutesAndSeconds(ms) {
  var minutes = Math.floor(ms / 60000);
  var seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

class Spotify {
  async getState(){
    return new Promise((resolve, reject) => {
      exec('osascript get_state.applescript', function (error, stdout, stderr) { resolve(JSON.parse(stdout.replace(/\n$/, ''))); });
    })
  }
  async getTrack(){
    return new Promise((resolve, reject) => {
      exec('osascript get_track.applescript', function (error, stdout, stderr) { resolve(JSON.parse(stdout.replace(/\n$/, ''))); });
    })
  }
  async print() {
    const progressLength = 50;

    let track = await spotify.getTrack();
    let state = await spotify.getState();
    let progress = Math.floor((state.position / (track.duration / 1000)) * progressLength) + 1;

    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`${track.artist} - ${track.name} ${'\u25A0'.repeat(progress - 1)}${chalk.green('\u25A0')}${'\u25A0'.repeat(progressLength - progress)}`);
  }
}

const spotify = new Spotify();

setInterval(() => {
  spotify.print();
}, 200);

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  } else if (key.name === 'n') {
    exec('osascript next.applescript')
  } else if (key.name === 'p') {
    exec('osascript previous.applescript')
  }
});

process.on('SIGINT', () => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.exit();
});