import React,{Component} from 'react';
import PropTypes from 'prop-types';
// 1. 语法区别
// 2. propType和getDefaultProps
// 3. 状态的区别
// 4. this的区别
// 5. Mixins 混合的区别

// 1. 创建组件的不同
// 1-15版本创建
// export default React.createClass({})
// 1-16版本创建
 class Son extends Component{
    componentDidMount() {
        console.log('Son组件的功能:hello');
    }
    // 3. 父组件传递参数是验证和默认值不同
    // name: 必须是string并且引入
    static propTypes = {
        name: PropTypes.string.isRequired
    }
    // 3.1 注释一下就会报错,可以知道效果
    static defaultProps = {
        name: 'jack'
    }
    // 15与16限制属性不同
    // propTypes:{
    //     text: PropTypes.string.isRequired
    // },
    // getDefaultProps(){
    //     return{
            //  text: 'abc'
    //      }
    // },
    constructor(){
        super();
        // 2: 状态初始化不同
        // 2-15 
        // getInitialState(){
        //     return { 
        //         num: 1
        //     }
        // }
        // 2-16
        this.state = {
            num: 1
        }
    }
    testThis(){
        // 3: this的指向不同, 需要处理
        console.log(this);
    }
    render(h) {
        return (
            <div>
                <button onClick={ this.testThis }>

                </button>
            </div>
        )
    }
}

// 导出成一个包装组件
export default Son;