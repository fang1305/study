import React from 'react';

let index = {
    state: {},
    effects: {
        // 异步action
        *changeNum({payload},{select,put,call}){
            // select 获取当前的state
            // call 调用异步函数
            // put 调用reducer
            yield put({
                type: 'addNum',
                payload
            })
        }
    },
    reducers:{
        addNum(){

        }
    }
}

export default index;