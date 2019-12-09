
                    // state数据,action
export function reducer (state,action) {
  // 根据action的指令，来完成不同操作
   switch(action.type) {
       case 'ADD_NUM':
        console.log('ADD_NUM被执行了');
        // redux  ，
        // 不建议你改原来的对象，而是根据原来的数据返回一个新的对象
        // 返回给store一个新的数据
        // return { num:state.num + 1  };
        // 合并对象，返回一个新的对象
        return Object.assign({},state,{ num:state.num + 1  });

        // 类似vuex中的getters
        default:
          return { num:1};
   }

}