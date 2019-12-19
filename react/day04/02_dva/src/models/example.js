
export default {

  namespace: 'example',
// 初始数据
  state: {},
// 
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
        // history可以监听路由
        // history可以监听路由
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
