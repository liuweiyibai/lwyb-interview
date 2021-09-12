let { spawn } = require('child_process');
let path = require('path');
function fork(modulePath, args, options = {}) {
    if (options.silent) {
        options.stdio = ['ignore', 'ignore', 'ignore', 'ipc']
    } else {
        options.stdio = [0, 1, 2, 'ipc']
    }
    return spawn('node', [modulePath, ...args],options)
}
let child = fork('fork.js', ['a', 'b', 'c'], {
    cwd: path.join(__dirname, 'pro'),
    silent: false // 这句话的意思就是 ['ignore','ignore','ignore','ipc']
});
// 默认支持ipc的方式
// 默认的fork [0,1,2,'ipc']
child.send('hello');