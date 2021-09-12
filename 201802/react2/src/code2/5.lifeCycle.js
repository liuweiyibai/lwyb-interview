import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// 生命周期执行时是同步操作
class LifeCycle extends Component {
    static defaultProps = {
        name:'zfpx'
    }
    constructor(props) {
        super();
        console.log('father:constructor')
        this.state = {name:props.name,count:1}
    }
    componentWillMount(){
        console.log('father:componentWillMount')
    }
    render() {
        console.log('father:render');
        return (<div>   
            计数器:{this.state.count}
            <button onClick={()=>{this.setState({count:this.state.count+1})}}>+</button>
            <Child count={this.state.count}></Child>
        </div>)
    }
    componentDidMount(){
        console.log('father:componentDidMount');
    }
    // shouldComponentUpdate可以做优化 pureComponent
    shouldComponentUpdate(nextProps,nextState){ // 如果没有写这个生命周期 默认相当于返回true
        console.log('father:shouldComponent')
        if(nextState.count === this.state.count){
            return false
        }
        return true;
    }
    componentWillUpdate(){ // 这个方法其实没啥用 这个方法就被删除了 16.3 又给你一个新方法
        console.log('father:componentWillUpdate')
    }
    componentDidUpdate(){
        console.log('father:componentDidUpdate')
    }
    
}
class Child extends Component{
    componentWillMount(){
        console.log('child:componentWillMount');
    }
    render(){
        console.log('child:render');
        return <div>{this.props.count}</div>
    }
    // shouldComponentUpdate(nextProps,nextState){
    //     return true;
    // }
    componentDidMount(){
        console.log('child:componentDidMount');
    }
    // 此方法中可以调用setState方法进行更新
    componentWillReceiveProps(newProps) { // 后期16.3中也更新了
        console.log('child:ReceiveProps')
    }
}
// LifeCycle.defaultProps = {}
ReactDOM.render(<LifeCycle></LifeCycle>, window.root);