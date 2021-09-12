// context 代理request和response属性
// 设置getter和setter
let proto = {

}
// proto = ctx
// proto.query = {
//     get (){
//       return  ctx.request.query
//     }
// }
function delateGetter(property,name){
    proto.__defineGetter__(name,function(){
        return this[property][name];
    })
}
function delateSetter(property,name){
    proto.__defineSetter__(name,function(val){
        this[property][name] = val;
    })
}
delateGetter('request','query');
delateGetter('request','method')
delateGetter('response','body');
delateSetter('response','body');
module.exports = proto;

