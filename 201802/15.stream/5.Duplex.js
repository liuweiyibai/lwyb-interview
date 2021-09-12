let {Duplex} =  require('stream');
// 双工流 又能读 又能写，而且读取可以没关系(互不干扰);
// let d = Duplex({
//     read(){
//         this.push('hello');
//         this.push(null)
//     },
//     write(chunk,encoding,callback){
//         console.log(chunk);
//         callback();
//     }
// });
// d.on('data',function(data){
//     console.log(data);
// });
// d.write('hello');
// tranform流 他就是duplex 他不需要实现read write,实现的叫transform



// class D extends Duplex{
//     _write(){

//     }
// }
// let d = new D();