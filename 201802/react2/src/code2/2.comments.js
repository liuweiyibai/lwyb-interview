import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
// 智能组件
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
class Comments extends Component {
    constructor() {
        super();
        this.state = { comments: [], count: 0 }
    }
    async componentDidMount() {
        // 再react中发送ajax请求 fetch比较底层  axios 封装了RESTFul 基于promise的 不支持jsonp 用再服务端
        let { data: comments } = await axios.get('/user.json');
        this.setState({ comments })
    }
    handleAdd = (count) => {
        this.setState({ count: this.state.count + count });
    }
    render() {
        return (<div className="container">
            {this.state.comments.map((item, index) => (
                <List key={index} index={index} {...item} parent={this.handleAdd}></List>
            ))}
           <Total count={this.state.count}></Total>
        </div>)
    }
}
class Total extends Component{
    render(){
        return <div className="h2">总数量：{this.props.count}</div>
    }
}
class List extends Component {
    handleClick= ()=>{
        this.props.parent(2);
    }
    render() {
        let { avatar, username, content } = this.props;
        return <div className="media">
            <div className="media-left">
                <img src={avatar} alt="" style={{ width: '64px' }} />
            </div>
            <div className="media-body">
                <h3 className="h3">{username}</h3>
                <p>{content}</p>
                <button className="btn btn-danger" onClick={this.handleClick}>喜欢</button>
            </div>
        </div>
    }
}
// 1.组件间的通信 第一种方式就是通过属性传递 父-> 子 -> 孙子
// 单向数据流 数据方向是单向的 儿子不能更改父亲的属性
// 2.父子通信 父亲写好一个方法 传递给儿子，儿子调用这个方法，相当于调用了父类的方法，这个方法中可以去更改状态
// 3.同级数据传递 同级组件想要传递数据 可以找到共同的父级没有父级就创造父级
render(<Comments></Comments>, window.root);