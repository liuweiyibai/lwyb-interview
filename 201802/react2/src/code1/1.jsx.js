import React from 'react';
import { render } from 'react-dom';

// jsx语法 javascript和xml语法的集合体
// jsx语法是facebook自己发明的 babel-preset-react
let ele = (
    <h1 className="red">
        <span>zfpx</span>
        hello,world
    </h1>
);

// type,props,children
// console.log(React.createElement(
//     "h1",
//     { className: "red" },
//     "hello,world"
// ));

// -> react.element
// let obj = {
//     type:'h1',
//     props:{
//         className:'red',
//         children:[
//             {type:'span',
//              props:{children:'zfpx'}},
//             'hello world'
//         ]
//     }
// }
// 先将jsx语法转化成 createElement格式 -> 转化成对象 -> render方法渲染
render(ele, document.getElementById('root'))