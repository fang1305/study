import * as userConstants from '../constants/user';
// action表示当前dispatch（操作）的类型和载荷（数据）（payload）
// 比方说我要修改系统主题色，那这个action可能就这么定义了
// {type: 'CHANGE_THEME', color: 'red'}，其中type是约定俗成的参数，且必填
// action: 其实就是对象的描述信息\

const loginRequest=()=>{
    return new Promise((reslove)=>{
        window.setTimeout(() => {
            reslove({
                isLogin: true,
                nickname: 'test',
                avatar: 'http:baidu.com'
            });
        }, 3000);
    })
}

export const login = (payload) => {
    // 异步
    return async (dispatch)=>{

        // 异步进行中
        dispatch(update({
            loading: true
        }))

        const res = await loginRequest();
        dispatch(update({
            ...res,
            loading: false
        }));
    }
    return (dispatch)=>{
        window.setTimeout(()=>{
            // 登录完后操作同步update
            dispatch(update({
                isLogin:true,
                nickname: 'test',
                avatar: 'http:baidu.com'
            }))
        },3000);
    }
    // 同步
    // return {
    //     type: userConstants.USER_LOGIN,
    //     payload
    // }
}
export const logout = (payload) => {
    return {
        type: userConstants.USER_LOGOUT,
        payload
    }
}
export const update = (payload) => {
    return {
        type: userConstants.USER_UPDATE,
        payload
    }
}