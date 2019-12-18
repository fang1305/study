import * as userConstants from '../constants/user';
// reducer是一个纯函数， 用来修改state的， 接收两个参数 state和action， 生成一个新的state返回
export default function (state = {},action) {
    switch (action.type) {
        // 缺点: 没办法完成异步的逻辑
        // 解决: 通过中间键,把action完成从同步到异步的改变
        // 安装: npm i redux-thunk 
        // 优势: 允许发送函数,而不是对象信息,在函数里可以完成异步逻辑
        case userConstants.USER_LOGIN:{
            return {
                ...state,
                ...action.payload,
                isLogin: true,
            }
        }
        case userConstants.USER_LOGOUT: {
            return {
                isLogin: false,
            }
        }
        case userConstants.USER_UPDATE: {
            return {
                ...state,
                ...action.payload,
            }
        }
        default: {
            return state
        }
    }
    
}
