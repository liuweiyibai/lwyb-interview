import React,{Component} from 'react';
import ReactDOM,{render} from 'react-dom';
import PropTypes from 'prop-types';
class Person extends Component{
    // 不会终端页面渲染
    static propTypes = {
        name: PropTypes.string.isRequired,
        age:PropTypes.number,
        gender:PropTypes.oneOf(['男','女']),
        hobby:PropTypes.array,
        salary:function (props,key,com) {
            if (props[key]<1000){
                throw new Error(`${com} error ${props[key]} is too low`)
            }
        },
        position:PropTypes.shape({
            x: PropTypes.number,
            y:PropTypes.number
        })

    }
    constructor(props){
        super();
   }
   // 类组件的属性会挂载再this.props上
   render(){
       let {name,age,gender,hobby,salary,position} = this.props;
      return (<div>
          {name}{age}
          {gender}{hobby}
          {salary} {JSON.stringify(position)}
     </div>)
 }
}
// Person.propTypes = {}
let person = {
    name:'jw',
    age:18,
    gender:'男',
    hobby:['sleeping'],
    salary:100,
    position:{
        x:1000,
        y:1000
    }
}
render(<Person {...person}/>,window.root)