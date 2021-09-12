// 多语言  vue-i18n 国际化
// 可以支持语言的切换

// 服务端如何支持多语言
let pack = {
    'zh-CN':{content:'你好'},
    'en':{content:'hello'},
    'fr-FR':{content:'Bonjour'}
};
let http = require('http');
let server = http.createServer();
server.on('request',function(req,res){
    let lan = 'en'; // 默认语言
    let language = req.headers['accept-language'];
    // Accept-Language: zh;q=0.9,en;q=0.7,fr-FR
    let arrs = [];
    if(language){
        arrs = language.split(',').map(l=>{
            l = l.split(';');
            return {
                name:l[0],
                q:l[1]?Number(l[1].split('=')[1]):1
            }
        }).sort((lang1,lang2)=>lang2.q-lang1.q);
        console.log(arrs);
    }
    res.setHeader('Content-Type','text/plain;charset=utf8');
    for(var i = 0;i<arrs.length;i++){
        // 去语言包里找对应的内容 看看有没有
        let name = arrs[i].name
        if(pack[name]){
            res.end(pack[name].content);
            break;
        }
    }
    res.end(pack[lan].content);
}).listen(8888);