import React, { Component } from 'react'
import { render } from 'react-dom'
render(<h1>hello zfpx</h1>, window.app)
import 'bootstrap'
import 'a'
// import './style.css';
// import a from './a.js'
// document.getElementById('app').innerHTML = a;

// 图片 webpack处理图片的问题
// 在项目中引用图片的方式
// 1.直接通过路径引用 相对 html
// 2.在js中引用图片
// 3.在背景图中使用

// let oImg = new Image();
// import png from './1.png'; //  如果引入了图片 就可以把图片进行打包,png是文件的路径
// oImg.src = png;
// document.body.appendChild(oImg);






// if(module.hot){
//     // 这里可以实现热更新
//     module.hot.accept('./a.js',function (params) {
//         document.getElementById('app').innerHTML = a;
//     });
// }
// // 代码里也想区分开发环境还是生成环境
// if(__DEV__){
//     alert('开发环境')
// }else{
//     alert('生产环境')
// }

