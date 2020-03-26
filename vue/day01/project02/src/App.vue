<template>
  <div id="app">
      {{count}}
      {{myCount}}
    <router-view />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: 'App',
  created:function (params) {
      this.postFun();
  },
  computed: {
      ...mapState(['count']),
      ...mapGetters(['myCount'])
  },
  methods: {
      postFun(){
          // 通过post方法的第三个参数emulateJSON: true,设置提交的内容类型为普通表单数据格式
        //   this.$http.post('http://api.iinnet.com/login/doLogin',{
        //       mobile: '15369859680',
        //       password: '171717'
        //   },{
        //       headers: {
        //             "cache-control": "no-cache",
        //             "postman-token": "8f7e53a3-2c1a-250f-1136-76896a79c3a2"
        //       },
        //       emulateJSON: true
        //   }).then(res=>{

        //   })
      }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
