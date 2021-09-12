---
title: React 高级技巧
tags:
	- React
---

根据`React`官方配置`React`官方脚手架

```bash
npm install create-react-app -g
mkdir demo & cd demo
create-react-app # 新建一个 React 项目
```

--------------------

组件的声明方式之函数式组件

```jsx
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};
const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);
```

引入的问题，import React,{Component} from 'react';
我们在文件头部从 react 的包当中引入了 React 和 React.js 的组件父类 Component。记住，只要你要写 React.js 组件，那么就必须要引入这两个东西。
rende方法是React 提供的，Component 是我们声明组件时的继承类
--------------------------------------------
所谓的 JSX 其实就是 JavaScript 对象
。每当在 JavaScript 代码中看到这种 JSX 结构的时候，脑子里面就可以自动做转化，这样对你理解 React.js 的组件写法很有好处。


-----------------------
表达式用 {} 包裹。
{} 内可以放任何 JavaScript 的代码，包括变量、表达式计算、函数执行等等

-------------------
React.js 中定义了一种新的方式：className 来帮助我们给元素添加类名。


---------------------
事件 驼峰命名法
这些 on* 的事件监听只能用在普通的 HTML 的标签上，而不能用在组件标签上

事件中的this，如果直接打印this会为null或者undefined，所以在标签中使用onClick={one().bind(this)}来将this绑定上


------------------------------
setState的使用方法1
this.setState({ count: this.state.count + 1}) 更改state的值，但是会缓存，稍后才会进行赋值
方法2
setState接受一个函数作为参数。React会把上一个 setState 的结果传入这个函数，你就可以使用该结果进行运算、操作，然后返回一个对象作为更新 state 的对象
 this.setState((prevState) => {
      return { count: prevState.count + 1 } // 上一个 setState 的返回是 count 为 0，当前返回 1
    })



----------------------
组件是独立的单元
一个组件可能在很多地方被用到
每个组件都可以接受一个 props 参数，它是一个对象，包含了所有你对这个组件的配置
组件内部是通过this.props 的方式获取到组件的参数的
const likedText = this.props.likedText || '取消'
调用的时候likedText=“xxxx”即可传值到子组件
props 一旦传入进来就不能改变，入过我们要改变传到子组件的值得话，我们在父组件设置state的值传入子组件，然后通过setState的方式来更改state的值，同样的，传入到子组件的值也被更改了


--------------------------------------
state和props的区别
state是组件内部的状态，外部无法访问
props是调用当前组件的父组件可以传入的值
也就是说state 是让组件控制自己的状态，props外部对组件自己进行配置。
react鼓励无状态组件


---------------------------
数组渲染jsx
通过map进行迭代，然后通过props传入到列表中

---------------------------------------------
我们把 React.js 将组件渲染，并且构造 DOM 元素然后塞入页面的过程称为组件的挂载（这个定义请好好记住）。


--------------------------------------------------------
生命周期，挂载阶段的生命周期：
componentWillMount() 组件挂载之前，可以在这里发送ajax请求，
componentDidMount() 组件挂在完成之后
componentWillUnmount() 卸载组件之前 在这里清除定时器等
更新阶段的几个生命周期：
说白了就是 setState 导致 React.js 重新渲染组件并且把组件的变化应用到 DOM 元素上的过程，这是一个组件的变化过程。
shouldComponentUpdate(nextProps, nextState)：你可以通过这个方法控制组件是否重新渲染。如果返回 false 组件就不会重新渲染。这个生命周期在 React.js 性能优化上非常有用。
componentWillReceiveProps(nextProps)：组件从父组件接收到新的 props 之前调用。
componentWillUpdate()：组件开始重新渲染之前调用。
componentDidUpdate()：组件重新渲染并且把更改变更到真实的 DOM 以后调用。


-----------------------------------------------
constroctor 所有关于组件自身的状态的初始化工作都会放在 constructor 里面去做。所的state的初始化工作都是放在constructor中


------------------------------------------------
ref中的dom操作
ref是一个函数，在react中，当我们在页面上挂在完成之后，就会调用这个函数 ，我们可以给任意代表 HTML 元素标签加上 ref 从而获取到它 DOM 元素然后调用 DOM API。但是记住一个原则：能不用 ref 就不用。特别是要避免用 ref 来做 React.js 本来就可以帮助你做到的页面自动更新的操作和事件监听。多余的 DOM 操作其实是代码里面的“噪音”，不利于我们理解和维护。


-------------------------------------------
如何在组件内编写html嵌套结构：
所有嵌套在组件中的 JSX 结构都可以在组件内部通过 props.children 获取到
也就是说:
class Cart extends Component{
	render(){
		return (
			<div className='content'>
				{this.props.children}
			</div>
		)
	}
}

----------------------------------------
react中如何动态渲染html，提供了一个属性dangerousSetInnerHTML可以让我们设置动态元素的innerHTML
this.state.content='<div>...'
render (){
	return (
		<div className='one' dangerousSetInnerHTML={{__html:this.state.content}}>
			
		</div>
	)
}

style={{fontSize:'12px',color:'red'}} // 行内的样式应该这样写


------------------------------------------------
React.js提供了一种机制，让你可以给组件的配置参数加上类型验证
需要安装一个库：npm install --save prop-types
他可以帮助我们验证props的参数类型
import React,{Compoent} from 'react'
import PropTypes from 'prop-type'

class Comment extends Component{
	static proTypes={
		comment:PropTypes.number.isRequired
		我们可以通过 isRequired 关键字来强制组件某个参数必须传入：
	}
	render(){
		return ...
	}
}
// 设置props传入的默认的参数类型：
PropTypes.array
PropTypes.bool
PropTypes.func
PropTypes.number
PropTypes.object
PropTypes.string
PropTypes.node
PropTypes.element


----------------------------
react中组件的内容编写的规范：
static 开头的类属性，如 defaultProps、propTypes。
构造函数，constructor。
getter/setter（还不了解的同学可以暂时忽略）。
组件生命周期。
_ 开头的私有方法。
事件监听方法，handle*。
render*开头的方法，有时候 render() 方法里面的内容会分开到不同函数里面进行，这些函数都以 render* 开头。
render() 方法。


高阶组件：
就是一个函数：传给他一个组件，然后他会返回一个新组件
const newComponet = higherOrderComponent(oldComponent)
定义一个高阶组件
import {react,Component} from 'react'

export defalut (wrapperCompoent)=>{
	class newComponet extends Compoent{
		constructor(){
			super()
			this.state={
				data:null
			}
		}
		componentWillMount(){
			ajax.get('api'+name,(result)=>{
				this.setState({data:result})
			})
		}
		render(){
			return <wrapperCompoent data={this.state.data}/>
		}
	}
	return newComponet
}

在其他的组件中如何使用这个高阶组件
import wrapperCompoent from 'wrapperCompoent'

class inputCoompoent extends Components{
	render <input value={this.props.data}/>
}
// 使用高阶组件
inputCoompoent = wrapperCompoent(inputCoompoent,'username')
export defalut inputCoompoent


高阶组件的嵌套；先注册一个然注册另一个

context是什么：context是react中组件的全局共享状态
如何设置:
通过：getChlidContext(){
	return {
		data:this.state.data
	}
}
获取：在组建中获取：
this.context.themeColor




简单的模拟redux的代码：
创建store的方法
function createStore (state, stateChanger) {
  const getState = () => state
  const dispatch = (action) => stateChanger(state, action)
  return { getState, dispatch }
}
参数一是：是表示应用程序状态的 state
另外一个是 stateChanger，它来描述应用程序状态会根据action发生什么变化

  
  
  
  
  
纯函数：纯函数的第一个条件：一个函数的返回结果只依赖于它的参数。


redux中：

```jax
bindActionCreators from 'redux'
import { connect } from 'react-redux'
this.props.cityName.update({
})
```

header组件：某个组件是否和后台要进行交互。
import PureRenderMixin from 'react-addons-pure-render-mixin'

class header extends components{
	onstructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.xxx
	}
}


// 不涉及到数据交互：木偶组件
轮播图：react-swipe轮播图组件
npm installl react-swipe --save
三个li按钮如何切换：底部三个点点，根据当前索引，然后添加样式
li className={ this.state.index == 0?'select':none }


超值特惠：Ad.jsx
如果要使用后端数据 运行npm mock
获取数据源：
fetch跨域：webpack自动配置代理。
componentDidMount(){
	const result = getData();
	result.then((res)=>{res}).then((json)=>{console.log(json)})
	console.dir(result);
}

猜你喜欢：List.jsx,接受参数是一个城市的名字
获取数据:componentDidMount(){
	调用方法获取数据。参数是cityName
}
加载更多按钮：加载更多是否显示，点击这个按钮，先记录状态-》当前是加载中还是加载更多，控制loading的显示，加载数据。
 通过后台返回值，hasMore来判断显示和隐藏
让页面实现加载中的效果三元表达式 请求的数据.length>0?显示:加载ing，
如果加载更多有值，通过concat来拼成为一个数组。


实现上拉更多：
let timeoutid;,
通过监控：window.addEventListener('scroll',,function(){
	console.log(1) 上拉滚动加载更多。要进行函数节流	
	判断如果是正在加载ing，就会执行return。
	滚一下判断一下。通过定时器
	if(timeoutid){
		clearTimeout(timeoutid)
	}
	timeoutid = setTimeout(funciton(){}.bind(this),50)
	
}.bind(this),false)


react中拿dom，通过ref来拿。
getBoundClientReact()



生命周期补充：
componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用

shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用



react中的样式这样写
className="类名"
style={{opacity: this.state.opacity}}
这是因为 React 组件样式是一个对象，所以第一重大括号表示这是 JavaScript 语法，第二重大括号表示样式对象。