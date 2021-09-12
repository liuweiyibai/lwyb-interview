// 组件分为两种  函数组件(函数) function 类组件 class

// 函数组件中没有this 没有生命周期 没有状态
import React,{Component} from 'react'
import {render} from 'react-dom';

// 怎么区分是组件还是jsx元素
// 如果名字是大写就是组件 小写就是jsx元素
// 组件必须要有返回值 也可以返回null null也是合法的
function School(props) {
    return <h1>{props.name}{props.age}</h1>
}
// School({name:'zfpx',age:8});
// 组件可以通过属性传递数据
render(<School name="zfpx" age="8"></School>,window.root)
