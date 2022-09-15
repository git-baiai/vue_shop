<template>
  <div class="spec-preview">
    <img :src="skuImgList[data.currentImgIndex] ? skuImgList[data.currentImgIndex].imgUrl : undefine" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img id="big" :src="skuImgList[data.currentImgIndex] ? skuImgList[data.currentImgIndex].imgUrl : undefine" />
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
import { onMounted, reactive,} from '@vue/runtime-core'
import emitter from '../../../bus'
  export default {
    name: "Zoom",
    props: ['skuImgList'],
    setup() {
      let data = reactive({
        currentImgIndex:0
      })
      onMounted(()=>{
        emitter.on('getImgUrl',(index)=>{
          data.currentImgIndex = index
        })
      })
      let handler = function (event) { 
        let mask = document.getElementsByClassName('mask')[0]
        let big = document.getElementById('big')
        let left = event.offsetX - mask.clientWidth/2
        let top = event.offsetY - mask.clientHeight/2
        if(left<=0) left = 0
        if (left > mask.clientWidth) left = mask.clientWidth
        if(top<=0) top=0
        if (top > mask.clientHeight) top = mask.clientHeight
        mask.style.left = left+'px'
        mask.style.top = top+'px'
        big.style.left = -2 * left + 'px'
        big.style.top = -2 * top + 'px'
       }
      return{
        data,handler
      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>