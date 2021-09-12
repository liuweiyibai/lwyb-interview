// 时钟  每秒更新一次 (react 可以根据更改来渲染部分页面 domdiff);
import React, { Component } from 'react';
import { render } from 'react-dom';
function Clock(props) {
    return (
        <div>
            <span>当前时间:</span>
            {props.date.toString()}
        </div>
    )   
}
// 不会一直渲染 只渲染一次
// 组件的特点 就是复用 多次使用它
setInterval(function () {
    render(<Clock date={new Date()} />, window.root);
},1000);
