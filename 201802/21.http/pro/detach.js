// 会自动将这个描述符包装成可写流
setInterval(function(){
    process.stdout.write('hello');
},1000);


