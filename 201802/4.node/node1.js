// 在浏览器端 全局作用域window访问

// 我们可以直接在node中访问global

// node在执行的时候 为了实现模块增加了一个闭包
var a = 1;
console.log(global.a);

//1.console 标准输出
console.log('log');
console.info('info');
// 错误输出
console.warn('warn');
console.error('error');
// 标准输出 是1表示  错误输出是2表示

// 默认有些属性是隐藏属性
console.dir(Array.prototype,{showHidden:true});

// time 和 timeEnd中的内容是一对 名字相同，相同时才能打印出两段时间的间隔
console.time('label');
for(var i = 0;i<1000;i++){
}
console.timeEnd('label');

// 栈 指的就是代码的调用栈 先进后出 函数调用
console.log(1);
console.log(2);
function one(){
    var a =1;
    console.log(a);
    two();
    function two(){
        var b = 2;
        console.log(b)
        three();
        function three(){
            console.log(5);
            //console.trace();
        }
    }
}
one();


// 断言  会抛出一个AccertException,测试 mocha kamra
// chai TDD BDD DDD 持续继承  测试覆盖率
// node也提供了一个模块 asset
//console.assert((1+3)===2,'error');



console.log(global)
// process 进程
    // argv  后续我们在执行时可能会传递参数 http-server --port 3000
    // pid 进程id 端口占用的情况 任务管理器 lsof -i :8080 kill -9 id号
    // chdir change directory 工作目录
    // cwd current working directory 当前工作目录
    // nextTick 微任务
    // stdout stderr stdin
// Buffer 存储文件内容 二进制
// setImmediate 设置立即
// setInteval
// setTimeout
// vscode处理路径 永远都是最底下的目录
console.log(process.cwd());
process.chdir('..');
console.log(__dirname); // 这个属性不是global上的,指代的永远时当前文件所在文件夹
console.log(process.cwd());

// 1
process.stdout.write('1');
console.log(1);
// 2
process.stderr.write('1');
console.error('1');


// 微任务 
// then  nextTick ( messageChannel mutationObersve)

// 宏任务 
// setTimeout setInterval setImmediate

// 浏览器中 先执行当前栈 执行完走微任务 走事件队列里的内容（拿出一个）放到栈里执行
// 在去执行微任务 
console.log(1);
console.log(2);
setTimeout(function(){
    console.log('setTimeout1')
    Promise.resolve().then(function(){
        console.log('promise')
    });
})
setTimeout(function(){
    console.log('setTimeout2');
});
// --------------------------------
// nextTick 和 then 都是在 阶段转化时才会调用
process.nextTick(function(){
    console.log('nextTick')
});
setImmediate(function(){
    console.log('immediate')
});

// ------------------------------

// timeout immediate
// 这个取决于node的执行时间
setTimeout(function(){
    console.log('timeout');
})
setImmediate(function(){
    console.log('immediate')
});

// i/o文件操作 宏任务
let fs = require('fs');
fs.readFile('./1.log',function(){
    console.log('fs');
    setTimeout(function(){
        console.log('timeout');
    })
    setImmediate(function(){
        console.log('setImmediate')
    })
});
// i/o操作阶段完成后 会走check阶段，所以setImmediate会优先于timeout
// nextTick 会比 then快
Promise.resolve().then(function(){
    console.log('then')
})
process.nextTick(function(){
    console.log('nextTick')
});

// ------------------------------
setImmediate(function(){
    console.log(1);
    process.nextTick(function(){
        console.log(4)
    }) 
})
process.nextTick(function(){
    console.log(2)
    setImmediate(function(){
        console.log(3);
    })
})
// 2 1 3 4


// nextTick的用法
function Fn(){
    this.arrs;
    process.nextTick(()=>{
        this.arrs();
   })
}
Fn.prototype.then = function(){
    this.arrs = function(){console.log(1)}
}
let fn = new Fn();
fn.then();

// nextTick千万不要写递归,可以放一些比setTimeout优先执行的任务

function nextTick(){
    process.nextTick(function(){
        nextTick();
    })
}
nextTick()
setTimeout(function(){

},499)