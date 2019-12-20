
const loginRequest = () => {
  return new Promise((reslove) => {
    window.setTimeout(() => {
      reslove({
        isLogin: true,
        nickname: 'test',
        avatar: 'http:baidu.com'
      });
    }, 3000);
  })
}

export default {

  namespace: 'app',
// 初始数据
  state: {
      loading:true
  },
// 订阅/监视(锚点改变)
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
        // history可以监听路由
        // history可以监听路由
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
        // 实际过程
        yield put({ type:'fetch/start' });
        // yield put { ... }以下等价于dispatch(update({loading: true}))
        yield put({
            // put 发一个同步的action
            type:'update',
            payload:{
                loading: true
            }
        })
        // 通过call, 调用的异步的方法
        // 再把结果给出来
        // 等价于 const res = await loginRequest();
        const res = yield call(loginRequest,{
            // 传参
        });
        yield put({ type: 'update',payload:{
            ...res,
            loading: false
        } });
        // yield put({ type: 'save' });
        // 实际过程
        yield put({ type:'fetch/end' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    update(state,action){
      return {
        ...state,
        ...action.payload
      };
    }
  },

};
