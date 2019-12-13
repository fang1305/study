import * as userConstants from '../constants/user';
// action表示当前dispatch（操作）的类型和载荷（数据）（payload）
// 比方说我要修改系统主题色，那这个action可能就这么定义了
// {type: 'CHANGE_THEME', color: 'red'}，其中type是约定俗成的参数，且必填
// action: 其实就是对象的描述信息
export const login = (payload) => {
    return {
        type: userConstants.USER_LOGIN,
        payload
    }
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