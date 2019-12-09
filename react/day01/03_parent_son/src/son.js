import React,{Component} from 'react';
import PropTypes from 'prop-types';

class Son extends Component{
    // 属性的约定和默认值
    static propTypes = {
        text: PropTypes.string.isRequired // ||number
        // 通过isRequired关键字强制组件,某个参数必须传入
    };
    static defaultProps = {
        text: 'abc'
    };

    constructor(props) {
        super(props)
    }
    render(){
        console.log(this.props.children);
        // 解构数据类型
        // 声明一个age,name属性,this.props中的同名属性进行赋值
        // 改变age与与this.props.age无关
        let { age,name,text } = this.props;
        // 引用数据类型 -- 声明一个引用类型属性,this.props中同名属性的地址进行赋值
        // let { obj } = this.props;
        // 改变obj.xxx与this.props.xxx有关

        return (
            <div>
                我是子组件
                <hr />
                { text }
                <hr />
                { name }
                { /* this.props 是一个对象,可以在这里输出数组 */ }
                <div style={ {background: 'red'} }>
                { this.props.header }
                </div>
                { this.props.children }
                <div style={ {background: 'green'} }>
                { this.props.footer }
                </div>
            </div>
        )
    }
}
export default Son;