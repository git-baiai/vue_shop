import { createApp } from 'vue/dist/vue.esm-bundler';
import App from './App.vue'

import router from './router/index'
import typeNav from './components/typeNav.vue'
// import mitt from 'mitt'
//引入三级列表的api接口
// import { reqCategoryList } from './api/index.js'
import store from './store';
import './mock/mockServe'
import pagination from './components/pagination.vue'
import "swiper/swiper.min.css";
import 'swiper/swiper-bundle.css'
import './assets/iconfont/iconfont.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './utils/validate'

const app = createApp(App)

// reqCategoryList()

app.use(router).use(store).component(typeNav.name, typeNav).mount('#app')
app.component(pagination.name, pagination)
app.use(typeNav).use(pagination)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })

// app.config.globalProperties.$mybus = new mitt()