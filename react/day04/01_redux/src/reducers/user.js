import * as userConstants from '../constants/user';
// reducer是一个纯函数， 用来修改state的， 接收两个参数 state和action， 生成一个新的state返回
export default function (state = {},action) {
    switch (action.type) {
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
