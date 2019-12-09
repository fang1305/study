// 1: action包含type,包含payload
// 2: 函数调用发异步请求后返回action: type** payload

export default function(isSendAjax){
    return dispatch => {
        if(isSendAjax)
        setTimeout(function(){
                let num = 2;
               dispatch({type:'SUB',data:num}) 
        },0)
    }
}