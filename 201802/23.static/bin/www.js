#! /usr/bin/env node
let yargs = require('yargs')
// zf-server -p 3000
let argv = yargs.options('p',{
    alias:'port',
    default:5000, // 默认值
    demand:false, // 是否必填
    type:Number,
    description:'端口号'
}).options('o',{
    alias:'hostname',
    default:'localhost', // 默认值
    demand:false, // 是否必填
    type:String,
    description:'主机'
}).options('d',{
    alias:'dir',
    default:process.cwd(), // 默认值
    demand:false, // 是否必填
    type:String,
    description:'执行目录'
}).usage('usage zf-server [options]')
.alias('h','help')
.example('zf-server --port 3000 ')
.argv

let Server = require('../src/app');
let server = new Server(argv);
server.start();
// 判断当前系统的 类型是window 还是mac 
let os = require('os').platform();
let {exec}  = require('child_process');
let url = `http://${argv.hostname}:${argv.port}`
if(argv.open){
    // 希望打开浏览器
    if(os === 'win32'){
        exec(`start ${url}`);
    }else{
        exec(`open ${url}`);
    }
}























// let argv = {};
// let args = process.argv.slice(2)
// args.forEach((item,index)=>{
//     if(item.includes('-')){
//         argv[item] = args[index+1];
//     }
// })
// console.log(argv)