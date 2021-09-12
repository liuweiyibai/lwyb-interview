import React, { Component } from 'react'
import { render } from 'react-dom'

function school(name, age) {
    return <h1>{name} {age}</h1>
}
let el = (
    <ul>{school('zfpx', 9)}</ul>
)

let dinner = ['汉堡', '可乐', '薯条'];
// 判断 循环
// 数组可以直接渲染到页面上
// 渲染列表要用map
let eleObj = dinner.map((item, index) => (
    <li key={index}>{item}</li>
));
render(eleObj, window.root);

