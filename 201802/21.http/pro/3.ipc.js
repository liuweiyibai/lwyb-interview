process.on('message',function(msg){
    process.send(msg.name+'很帅')
})
