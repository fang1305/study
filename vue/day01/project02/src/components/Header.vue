<template>
<div class="main">
    header
    <swiper :options="swiperOption">
        <swiper-slide>swider1</swiper-slide>
        <swiper-slide>swider2</swiper-slide>
        <swiper-slide>swider3</swiper-slide>
        <swiper-slide>swider4</swiper-slide>
        <swiper-slide>swider5</swiper-slide>
        <swiper-slide>swider6</swiper-slide>
        <swiper-slide>swider7</swiper-slide>
        <swiper-slide>swider8</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>    
</div>
</template>
<script>
export default {
    data(){
        return {
            swiperOption:{
                pagination: {
                    el: '.swiper-pagination'
                }
            }
        }
    }
}
</script>
<style lang='scss' scoped>
    $color: red;
    .main{
        background: $color;
    }
</style>