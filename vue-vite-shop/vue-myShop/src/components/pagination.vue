<template>
  <div class="pagination">
    <button v-show="pageNo!='1'" @click="clickPages(pageNo-1)">上一页</button>
    <button v-if="calNum[0]>1" @click="clickPages(1)" :class="{active:pageNo==1}">1</button>
    <button v-if="calNum[0]>2">···</button>
    <button v-for="(page,index) in calNum" :key="index" @click="clickPages(page)"
      :class="{active:pageNo==page}">{{page}}</button>
    <button v-if="calNum[continues-1]<totalpages-1">···</button>
    <button v-if="calNum[continues-1]<totalpages-1" @click="clickPages(totalpages)"
      :class="{active:pageNo==totalpages}">{{totalpages }}</button>
    <button v-show="pageNo != totalpages" @click="clickPages(pageNo+1)">下一页</button>
    <span style="margin-left: 30px">当前第 {{pageNo}} 页</span>
    <span style="margin-left: 30px">共 {{total}} 条</span>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
export default {
  name: "Pagination",
  props: ['pageNo', 'total', 'pageSize', 'continues'],
  emits: ['nowPage'],
  setup(props,context) {
    let clickPages = function (page) { 
      context.emit('nowPage',page)
     }
    let totalpages = computed(() => {
      return Math.ceil(props.total / props.pageSize)
    })
    let calNum = computed(()=>{
      let start = 0, end = 0
      let show = parseInt(props.continues / 2)
      let showArr = []
      if (props.continues>totalpages.value){
        start = 1
        end = totalpages.value
      }else{
        if (props.pageNo - show > 0){
          start = props.pageNo - show
          end = props.pageNo + show
          if (end > totalpages.value){
            start = totalpages.value - props.continues +1
            end = totalpages.value
          }
        }else{
          start = 1
          end = props.continues
        }
      }
      for(let i=start;i<=end;i++){
        showArr.push(i)
      }
      return showArr
    })

    return { totalpages, calNum, clickPages }
  }
}
</script>

<style lang="less" scoped>

.pagination {
  text-align: center;
  
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      // background-color: #409eff;
      background: orangered;
      color: #fff;
    }
  }
}
</style>
