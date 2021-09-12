
import React, { Component } from 'react';
import { render } from 'react-dom';

// jsx和html的写法不完全一样
// className 他要转化成 class
// htmlFor 他要转化成for属性 label for
// jsx元素可以嵌套
// 相邻的react元素 不能不被包裹使用 必须加一层标签
// jsx里面可以放js 里面取分是不是js根据的是{}
// style 标签
// dangerouslySetInnerHTML 会导致xss攻击
let name = 'zfpx';
let age = 9;
let sty = { background: 'red' }
let ele = (
    <React.Fragment>
        <label htmlFor="a">输入焦点</label>
        <input type="text" id="a"/>
        <h1>{/*注释*/} 
            {name} <br /> 
            {age}  <br />
            {function name(params) {
                return 100
            }()}<br />
            {1 + 3}<br />
            {1 == 1 ? '2' : '3'}<br />
        </h1>
        <h1 style={sty}>hello</h1>
        <div dangerouslySetInnerHTML={{__html:'<h1>hello zf</h1>'}}></div>
    </React.Fragment>
)

render(ele, window.root)


