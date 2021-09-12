let net = require('net');
let {StringDecoder} = require('string_decoder');
let {Readable} = require('stream');
class IncomingMessage extends Readable{
    _read(){}
}
function parser(socket,callback){
    let buffers = []; // 每次读取的数据放到数组中
    let sd = new StringDecoder();
    let im = new IncomingMessage();
    function fn(){
        let res = {write:socket.write.bind(socket),end:socket.end.bind(socket)}
        let content = socket.read(); // 默认将请缓存区内容读干，读完后如果还有会触发readable事件
        buffers.push(content);
        let str = sd.write(Buffer.concat(buffers));
        if(str.match(/\r\n\r\n/)){
            let result = str.split('\r\n\r\n');
            let head = parserHeader(result[0]);
            // im = {...im,...head}
            Object.assign(im,head);
            socket.removeListener('readable',fn); // 移除监听
            socket.unshift(Buffer.from(result[1]));// 将内容塞回流中
            if(result[1]){ // 有请求体
                socket.on('data',function(data){
                    im.push(data);
                    im.push(null);
                    callback(im,res);
                });
            }else{ // 没请求体
                im.push(null);
                callback(im,res);
            }
            //callback(socket);
            // 先默认socket 是req对象 （内部又封装了一个可读流 IncomingMessage）
        }
    }
    socket.on('readable',fn)
}
function parserHeader(head){
    let lines = head.split(/\r\n/);
    let start = lines.shift();
    let method = start.split(' ')[0];
    let url = start.split(' ')[1];
    let httpVersion = start.split(' ')[2].split('/')[1];
    let headers = {};
    lines.forEach(line => {
        let row = line.split(': ');
        headers[row[0]] = row[1];
    });
    return {url,method,httpVersion,headers}
}
let server = net.createServer(function(socket){
    parser(socket,function(req,res){
        server.emit('request',req,res);
    });
});
server.on('request',function(req,res){
    console.log(req.url);
    console.log(req.headers);
    console.log(req.httpVersion);
    console.log(req.method);

    req.on('data',function(data){
        console.log('ok',data.toString());
    });
    req.on('end',function(){
        res.end(`
HTTP/1.1 200 OK
Content-Type: text/plain
Content-Length: 5

hello`)
    });
})
server.on('connection',function(){
    console.log('建立连接');
});
server.listen(3000);