import React,{Component}from 'react';

// 测试连接,引入连接对象
import { connect } from 'dva';

class Home extends Component{
    render(){
        return (<React.Fragment>
                数据是{ this.props.num }
                <button onClick={ e=>this.props.dispatch({type: 'index/changeNum',payload:{num:8}}) }>
                    dianji
                </button>
            </React.Fragment>)
    }
}
export default connect(state=>{
    return {
        num: state.index.num
    }
})(Home)