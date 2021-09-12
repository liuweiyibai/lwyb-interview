let {spawn } = require('child_process');
let path = require('path');

let child1 = spawn('node',['1.test.js','a','b','c'],{
    cwd:path.join(__dirname,'pro'),
    stdio:'pipe'
});

let child2 = spawn('node',['2.test.js','a','b','c'],{
    cwd:path.join(__dirname,'pro'),
    stdio:'pipe'
});

child1.stdout.on('data',function(data){
  child2.stdout.write(data);
});