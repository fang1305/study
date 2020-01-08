import React from 'react';

let index = {
    namespace: 'index',
    state: {
        num: 0
    },
    effects: {
        // 异步action
        *changeNum({payload},{select,put,call}){

            // 发送请求,作为函数放在call里, 获取返回值
            let res = yield call(request('xxx',{

            }))

            // select 获取当前的state
            // call 调用异步函数
            // put 调用reducer
            yield put({
                type: 'addNum',
                payload
            })
            // 封装请求对象 yarn add axios
        }
    },
    reducers:{
        addNum(state,{payload}){
            return {
                // 返回一个新值,值不可变性
                num: state.num+payload.num
            }
        }
    }
}

export default index;