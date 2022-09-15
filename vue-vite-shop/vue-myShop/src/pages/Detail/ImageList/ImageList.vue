<template>
  <swiper :navigation="swiper_options.navigation" :slidesPerView="swiper_options.slidesPerView"
    :slidesPerGroup="swiper_options.slidesPerGroup">
    <swiper-slide v-for="(img,index) in skuImgList" :key="img.id">
      <img :src="img.imgUrl" :class="{ active: data.currentImg == index}" @click="clickImg(index,index)">
    </swiper-slide>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </swiper>
</template>

<script>
import { reactive } from '@vue/reactivity'
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import emitter from '../../../bus'
SwiperCore.use([Navigation])

  export default {
    name: "ImageList",
    props: ['skuImgList'],
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      let swiper_options = reactive({
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        slidesPerView:5,
        slidesPerGroup:1
      })
      let data = reactive({
        currentImg:0
      })
      let clickImg = function (value,index) { 
        data.currentImg = value
        emitter.emit('getImgUrl', index)
      }
      return{
        swiper_options, data,
        clickImg
      }
    }
    
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>