# react基础

## 创建组件的三种方式

- 函数式无状态无生命周期组件

```js
const divs = () => {
  return (
    <div>...</div>
  )
}
```

- React.createClass方法

```js
const Button = React.createClass({
  // 传入的默认值
  getDefaultProps(){
    return {
      color: "blue",
      text: '警告'
    }
  },
  render(){
    const {color,text}  = this.props;
    return (
      <button className={`btn-${color}`}>{text}</button>
    )
  }
})
```

- es6 的class来写

```js
import React,{Component} from 'react';
class Button extends Compoent{
  constructor(...args){
    super(...args);
  }
  render (){
    const {color,text}  = this.props;
    return (
      <button className={`btn-${color}`}>{text}</button>
    )
  }
}
```

## setState 方法是一个异步方法，最后不要在组件中添加太多的state

## props

## ref 属性

- 在组件中定义，它可以是一个函数(ref)=>{this.dom = ref};
- 可以通过this.refs.ref值访问该dom。

## 事件系统

- 添加事件
- 使用bind绑定事件
- onClick={::this.handleClick} 双冒号语法,如果方法只调用不传参，可以使用::来代替bind
- :: 效果与 this.handleClick.bind(this);
- 事件中绑定上下文this的方式：箭头函数和bind
- componentDidMount 会在组件已经完成安装并且在浏览器中存在真实的 DOM 后调用，此时我们就可以完成原生事件的绑定。
- 组件卸载时要删掉事件 componentWillUnmount 移除事件

## 表单

- 使用onChange来动态赋值输入框数据给state。
- 单选框和复选框
- Select组件
- 受控组件更新 state 的流程：
1. 可以通过在初始 state 中设置表单的默认值。
2. 每当表单的值发生变化时，调用 onChange 事件处理器。
3. 事件处理器通过合成事件对象 e 拿到改变后的状态，并setState更新应用的 state。

- 通过一个事件处理器来处理多个表单域

```js
import React,{Component} from 'react';

class FormData extends Component {
  constructor(...args){
    super(...args);
    this.state = {
      name: "",
      age: ""
    }
  }
  handleChange(name, e){
    const value = e.target.value;
    this.setState({
      [name]: value
    })
  }
  render (){
    const {name, age} = this.state;
    return (
      <div>
        <input value={name} onChange={handleChange.bind(this,'name')}/>
        <input value={age} onChange={handleChange.bind(this,'age')}/>
      </div>
    )
  }
}
```

## 样式处理

- className 设置类名
- 通过 style 设置行内样式
- BEM 命名样式：B:模块名; E:element元素名; M:当前元素的状态

## 组件间通信

- 父 -> 子

```js
class Father extends ...{
  render(){
    const  mess = '123';
    return <Son sendMess={mess}></Son>
  }
}
class Son extends ...{
  render (){
    const { sendMess } = this.props;
    <div>{sendMess}</div>
  }
}
```

- 子 -> 父

```js
class Father extends ...{
  sendFun(val){
    console.log(val);
  }
  render(){
    const  mess = '123';
    return <Son sendMess={sendFun}></Son>
  }
}
class Son extends ...{
  componentWillMount(){
    const {sendMess} = this.props;
    sendMess(1);
  }
  render (){
    <div>{sendMess}</div>
  }
}
```

## 跨级组件之间通信

- 使用 context 来进行跨级组件之间的通信

## 理解 react 中的mixin混入

## React 中的全局函数

## React 中有条件渲染

```js
// 通过 && 运算符
return (
    <div>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
// 或者是使用三元表达式
return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0?
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>:""
      }
    </div>
  );

```

## 使用 PropTypes 来进行静态类型检查：要在组件中进行类型检测，你可以赋值 propTypes 属性。

```js
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}
// 指定 props 的默认值：
Greeting.defaultProps = {
  name: 'Stranger'
};
// 定义该组件接受的 name 关键字的值是string，我们可以通过 isRequired 关键字来强制组件某个参数必须传入：
Greeting.propTypes = {
  name: PropTypes.string.isRequired
};
```

## React 中可视化，结合D3

-   

## 关于react中你要知道的东西

- 组件的 state 中不能出现 props，把计算和条件判断都交给render()方法吧

```js
 // 错误:
  constructor (props) {
    this.state = {
      fullName: `${props.firstName} ${props.lastName}`
    };
  }
  render () {
    var fullName = this.state.fullName;
    return (
      <div>
        <h2>{fullName}</h2>
      </div>
    );
  }
```

```js
// 正确 在render中获取
render () {
   // 赋值计算和条件判断在这里都留给 render 方法中进行计算
  //  并且state 中存储的是组件自己数据，不是props传入的数据
  var fullName = `${this.props.firstName} ${this.props.lastName}`;
}
```

当然，复杂的 display logic（显示逻辑） 也应该避免全堆放在 render()中，因为那样可能导致整个 render()方法变得臃肿，不优雅。我们可以把一些复杂的逻辑通过 helper function（辅助函数） 移出去。

```js
// 辅助函数
renderFullName () {
  return `${this.props.firstName} ${this.props.lastName}`;
}
render () {
  var fullName = this.renderFullName();
}
```

- 保持 state 的简洁，不要出现计算得来的 state ，state中不允许出现计算以及属性获取。
- 能用三元判断符，就不用 If ，直接放在 render()里
- 不要把 display logic（显示逻辑） 写在，生命周期componentWillReceiveProps或componentWillMount中，把它们都移到 render()中去。
- 如何动态处理 classNames 1.使用布尔值或者是使用三元表达式

## 所有的数据请求都放在一个单独的文件夹，然后通过`export出来的方法进行调用`

## 使用redux最好在action中发起请求

## IMMUTABLE.js 对JavaScript数据Array和Object进行包装

## 高阶组件

- 属性代理

```js
// 让传入的 wrapperContainer 组件拥有 myContainer 组件的props
const myContainer = (wrapperContainer) =>
// 箭头函数返回一个 class 赋值给 myContainer
  class extends Component{
    render(){
      return(
        <div>{...this.props}</div>
      )
    }
  }
```

- 使用 decorator 修饰器来完成高阶组件

```js
import React, { Component } from 'React';
// 使用修饰符，MyComponent 中就可以访问 MyContainer 的属性
@MyContainer()
class MyComponent extends Component {
 render() {}
}
export default MyComponent;
```

- 渲染劫持：更改 render 方法渲染的内容
- 高阶组件深入：百度
- 组件性能优化

## 动画

- css 动画： 持 cubic-bezier
- react-smooth
- React CSS Transition
- React Transition
- 缓动函数

## 自动化测试

- 。。。

## React 源码

- Virtual DOM

```js
{
  // 标签名
 tagName: 'div',
  // 属性
 properties: {
   // 样式
   style: {}
  },
  // 子节点
 children: [],
  // 唯一标识
  key: 1
}
```
