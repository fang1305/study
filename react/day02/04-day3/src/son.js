import React,{Component} from 'react';

class Son extends Component {
    constructor(){
        super();
        this.state = {
            num: 2
        }
    }
    render(){
        let { num } = this.state;
        let { children } = this.props;
        // return ([<span>{num}</span>,<hr/>])
        return (
            <div className="son">
                {num}
                <hr />
                {/* {this.props.children} */}
                {/* 以下函数返回数组,可以直接输出,避免传递参数过程中出现null和undefined */}
                { React.Children.map(children,child => child) }
           </div>
        )
    }
}

export default Son;