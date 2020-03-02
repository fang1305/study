<template>
  <div class="hello">
      <Header></Header>
      <Footer></Footer>
      <button  @click="btn" ref="btns">{{msg}}</button>
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
  methods: {
      btn(){
          this.msg = '000';
          this.$nextTick(()=>{
              console.log(this.$refs.btns.innerHTML);
          })
      }
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
