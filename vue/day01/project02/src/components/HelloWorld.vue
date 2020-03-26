<template>
  <div class="hello">
      <button @click="increase" ref="increase">增加</button>
      <button @click="decrease" ref="decrease">减少</button>
      <Header></Header>
      <Footer></Footer>
      <button @click="btn" ref="btns">{{msg}}</button><br>
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mapMutations, mapActions } from 'vuex';

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
      Header,Footer
  },
  computed: {
    //   ...mapState(['count'])
  },
  methods: {
      ...mapMutations(['increment','descrement']),
      ...mapActions(['myIncrease','myDecrease']),
      async increase(){
        //   this.increment();
          this.$store.commit('increment',3);
        // this.$store.state.count += 1;
        // await this.myIncrease();
      },
      decrease(){
          this.$store.commit('descrement');
      },
      btn(){
          this.msg = '000';
          this.$nextTick(()=>{
              console.log(this.$refs.btns.innerHTML);
          })
      }
  },
  created() {
        this.$axios({
            method: 'POST',
            withCredentials: false,
            url: '/api/api/login',
            data: {
                mobile: '15369859680',
                password: '111111'
            }
        })
        .then(function (res) {
            // 查询
        })
        .catch(function (err) {
            console.log(err);
        });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
