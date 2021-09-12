process.on('message',function(msg,socket){
    if(msg === 'socket'){
        socket.write('child')
    }
})