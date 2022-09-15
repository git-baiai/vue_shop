<script>
  import store from './store'
  import HeaderVue from './components/Header.vue'
  import FooterVue from './components/Footer.vue'
  import { onMounted } from '@vue/runtime-core'
  export default {
    components: { HeaderVue, FooterVue },
    setup() {
      onMounted(()=>{
        store.dispatch('categoryList')
        
      })
    
  }
  }
</script>

<template>
  <div>
    <HeaderVue />
    <router-view />
    <!-- 通过路由元信息控制footer组件的显示与隐藏 -->
    <FooterVue v-if="$route.meta.show"></FooterVue>
  </div>
</template>

