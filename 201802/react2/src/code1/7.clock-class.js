import React, { Component } from 'react';
import ReactDOM,{ render } from 'react-dom';
// 我们的组件要继承React组件 因为react组件封装了很多方法 this.setState()
class Clock extends Component{
    constructor(){
        super();
        this.state = {date:new Date().toLocaleString(),name:'zfpx'}
       
    }
    // state = { date: new Date().toLocaleString() }
    // 如果用类组件需要提供一个render方法
    // 组件渲染完成后会调用这个生命周期
    // 什么时候放在this上 什么时候放在this.state上
    componentDidMount(){
        this.timer = setInterval(()=>{
            // setState可以更新页面
            this.setState({ date: new Date().toLocaleString() });
        },1000)
    }
    componentWillUnmount(){ // 组件将要被卸载
        clearInterval(this.timer); // 一般卸载组件后要移除定时器 和绑定的方法
    }
    // 绑定方法有几种方式 方法中可能会用this
    // 1.箭头函数
    // 2.bind
    // 3.再构造函数中绑定this  this.handleClick = this.handleClick.bind(this)
    // 4.es7语法 可以解决this指向
    handleClick=()=>{
        ReactDOM.unmountComponentAtNode(document.querySelector('#root'));
    }
    render(){
        return (
            <div onClick={this.handleClick}>
                时间是:{this.state.date} 名字:{this.state.name}
            </div>
        )
    }
}
render(<div>
    <Clock /> 
</div>, window.root);

// 组件有两个数据源 一个是属性 外界传递的  还有一个叫状态是自己的
// 你传递的属性可能不是我预期的