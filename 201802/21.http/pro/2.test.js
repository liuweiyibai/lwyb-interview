let fs = require('fs');
let ws = fs.createWriteStream('./1.txt')
process.stdout.on('data',function(data){
    ws.write(data);
})
