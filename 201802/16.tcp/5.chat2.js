// 默认情况下用户应该是匿名状态
// 通过关键命令改名 r:zhangsan
// 支持显示在线的用户列表 l:
// 广播的功能      b:xxx
// 私聊的功能      s:lisi:我爱你

let net = require('net');
let clients  = {};
// 改名
function rename(nickname,data,socket){
    clients[nickname].nickname = data;
    socket.write(`您当前的用户名是${data}\r\n`);
}
// 展示用户列表
function list(socket){
    let str = `当前用户列表是:\r\n`
    let ls = Object.keys(clients).map(key=>{
        return clients[key].nickname;
    }).join('\r\n');
    socket.write(str+ls+'\r\n');
}
// 根据用户名取到对应人的socket
function private(nickname,content,key){
    let user;
    Object.keys(clients).forEach(function(key){
        if(clients[key].nickname === nickname){
            user = clients[key].socket;
        }
    });
    user.write(clients[key].nickname+":"+content+'\r\n');
}
function broadcast(nickname,content){
    Object.keys(clients).forEach(item=>{
        if(clients[item].nickname!= nickname){
            clients[item].socket.write(content+'\r\n')
        }
    })
}
let server = net.createServer(function (socket) {
    let key = socket.remoteAddress + socket.remotePort; // 唯一
    clients[key] = {nickname:'匿名',socket}
    // server.maxConnections = 3;
    server.getConnections((err, count) => {
        socket.write(`欢迎来到聊天室 当前用户${count}个\r\n`);
    });
    socket.setEncoding('utf8');
    socket.on('data', function (chunk) {
        chunk = chunk.replace(/\r\n/, '');
        let chars = chunk.split(':');
        switch (chars[0]) {
            case 'r': // r:zhangsan
                rename(key,chars[1],socket);
                break;
            case 'l':
                list(socket);
                break;
            case 'b': // b:content
                broadcast(key,chars[1]);
                break;
            case 's': // s:lisi:你好吗
                private(chars[1],chars[2],key);
                break;
            default:
                socket.write('当前命令无法解析，重新输入\r\n')
        }
    });

});
server.listen(8080, function () {
    console.log(`server start 8080`);
})