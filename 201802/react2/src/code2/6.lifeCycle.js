import React, { Component } from 'react';
import ReactDOM from 'react-dom';
class LifeCycle extends Component {
    constructor(props) {
        super();
        this.state = {name:props.name,count:1}
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
    shouldComponentUpdate(nextProps,nextState){ // 如果没有写这个生命周期 默认相当于返回true
        console.log('father:shouldComponent')
        if(nextState.count === this.state.count){
            return false
        }
        return true;
    }
    componentDidUpdate(){
        console.log('father:componentDidUpdate')
    }
}
class Child extends Component{
    constructor(){
        super();
        this.state = {}
    }
    render(){
        console.log('child:render');
        return <div>{this.props.count} {this.state.a}</div>
    }
    static getDerivedStateFromProps(newProps){
        console.log('receiveProps');
        // 这个方法 已经不算生命周期的，返回的结果会作为状态返回
        // 这个方法中可没有this了
        return {a:10000}
    }
    getSnapshotBeforeUpdate(){
        // 得到更新前的快照
        console.log('getSnapshotBeforeUpdate');
        return {a:1}
    }
    // componentDidCatch
    componentDidUpdate(prevProps,prevState,obj){
        console.log(obj)
        console.log('child:componentDidUpdate');
    }
}
// LifeCycle.defaultProps = {}
ReactDOM.render(<LifeCycle></LifeCycle>, window.root);