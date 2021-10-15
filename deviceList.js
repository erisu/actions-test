const shelljs = require('shelljs');

function exec (cmd, onFinish, onData) {
  console.log('$ ' + cmd);
  if (onFinish instanceof Function || onFinish === null) {
      const result = shelljs.exec(cmd, { async: true, silent: false }, onFinish);

      if (onData instanceof Function) {
          result.stdout.on('data', onData);
      }
  } else {
      return shelljs.exec(cmd, { silent: false });
  }
}

const deviceListBin = 'xcrun';
const cmdDeviceList = deviceListBin === 'instruments'
  ? 'instruments -s devices'
  : 'xcrun xctrace list devices';
const cmd = `${cmdDeviceList} | grep '^iPhone'`;
const results = exec(cmd).grep(/^iPhone/);

console.log(results);

if (results.code > 0) {
  console.log('Failed to get the list of simulators');
} else {
  let collection = results.grep(/^iPhone/);
  // let simulatorCollection = results.stdout.split('\n');

  console.log(collection);
}
