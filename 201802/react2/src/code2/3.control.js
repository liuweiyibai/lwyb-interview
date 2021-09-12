// 受控组件 和非受控组件 (state)
// 指的都是表单元素
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
export default class App extends Component {
    constructor() {
        super();
        this.state = { a: 'zf', b: 'zfpx' }
    }
    handleSubmit = (e) => {
        e.preventDefault(); // 指的就是提交表单事件
    }
    handleChange = (e) => {
        let name = e.target.name
        this.setState({ [name]: e.target.value });
    }
    render() {
        // 通过ajax 传递数据
        return (<form onSubmit={this.handleSubmit}>
            {/*  双向数据绑定 */}
            {/* react默认先将状态绑定到视图上 状态不变视图就不会刷新 */}
            <input type="text"
                required={true}
                value={this.state.a}
                onChange={this.handleChange}
                name="a"
            /> {this.state.a}
            <input type="text"
                required={true}
                value={this.state.b}
                onChange={this.handleChange}
                name="b"
            />{this.state.b}
            <input type="submit" />
        </form>)
    }
}
// 受控组件 可以对输入进行监控,而且可以对表单进行默认值操作
ReactDOM.render(<App></App>, window.root)