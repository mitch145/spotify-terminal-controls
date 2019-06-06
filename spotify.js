require('dotenv').config()
var exec = require('child_process').exec;
var readline = require('readline');
var chalk = require('chalk');

function execute(command) {
  return new Promise(resolve => {
    exec(command, function (error, stdout, stderr) { resolve(stdout); });
  });
};

async function getState() {
  return JSON.parse(await execute('osascript get_state.applescript'));
}

async function getTrack() {
  return JSON.parse(await execute('osascript get_track.applescript'));
}

async function print() {
  const progressLength = 50;

  let track = await getTrack();
  let state = await getState();
  let progress = Math.floor((state.position / (track.duration / 1000)) * progressLength) + 1;

  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(`${track.artist} - ${track.name} ${'\u25A0'.repeat(progress - 1)}${chalk.green('\u25A0')}${'\u25A0'.repeat(progressLength - progress)}`);
}

setInterval(() => {
  print();
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
