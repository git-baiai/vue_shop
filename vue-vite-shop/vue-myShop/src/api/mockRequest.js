import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'

//创建axios实例，并对其配置
const requests = axios.create({
    //基础路径，不用每次都配置
    // baseURL: '/api',
    //请求超时时间为5s,超时则撤回请求
    timeout: 5000
})
//请求拦截器：在请求之前拦截并做些事情
requests.interceptors.request.use((config) => {
    nprogress.start()
    return config
})
//响应拦截器：服务器数据回来后做些事情
requests.interceptors.response.use((res) => {
    nprogress.done()
    return res.data
}, (err) => {
    //失败的回调返回一个promise失败的对象
    return Promise.reject(err)
})

export default requests