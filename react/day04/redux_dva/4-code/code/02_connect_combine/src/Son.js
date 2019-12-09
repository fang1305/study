import React,{Component} from 'react';
import { connect } from 'react-redux';

class Son extends Component {

    render() {
        return (
            <div>
                子组件内的数据 { this.props.num}
                <button onClick={ e=> this.props.add({type:'ADD',num:10})}>增加10</button>
            </div>
        );
    }
}

function getStateMap (state) {
    return { num:state.goodsReducer.num }   
}
function dispatchs (dispatch) {

    return {
        add:(action)=> dispatch(action)
    }
}
export default connect(getStateMap,dispatchs)(Son);