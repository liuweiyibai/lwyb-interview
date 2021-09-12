import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// 1.函数的方式 
// 2.React.createRef(); 16.3+
export default class App extends Component {
    constructor(){
        super();
        this.text = React.createRef();
    }
    componentDidMount(){
        //this.text.focus();
        this.text.current.focus();
    }
    render() {
        return (<div>
            {/* <input type="text" ref={input=>this.text = input}/> */}
            {/* 会自动的将当前输入框 放在this.text.current */}
            <input type="text" ref={this.text}/>
        </div>)
    }
}
// 非受控组件 1.可以操作dom 获取真实dom 
//           2.可以和第三方库结合
//           3.不需要对当前输入的内容进行校验，也不需要默认值
ReactDOM.render(<App></App>, window.root)