require('dotenv').config()
var exec = require('child_process').exec;
var readline = require('readline');

function execute(command, callback) {
  exec(command, function (error, stdout, stderr) { callback(stdout); });
};

function msToMinutesAndSeconds(ms) {
  var minutes = Math.floor(ms / 60000);
  var seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

class SpotifyAppleScriptAPI {
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
    const progressLength = 20;

    let track = await spotify.getTrack();
    let state = await spotify.getState();
    let progress = Math.floor((state.position / (track.duration / 1000)) * progressLength);

    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`${track.artist} - ${track.name} [${'='.repeat(progress)}${' '.repeat(progressLength - progress)}]`);
  }
}

const spotify = new SpotifyAppleScriptAPI();
// let fn = async () => {

//   let output = await spotify.getState();
//   let output2 = await spotify.getTrack();
//   console.log(output)
//   console.log(output2)
// };
// fn();


setInterval(() => {
  spotify.print();
}, 100);

process.on('SIGINT', () => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.exit();
});