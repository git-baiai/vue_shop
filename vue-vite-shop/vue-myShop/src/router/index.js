import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../pages/home/Home.vue'
import Login from '../pages/login/index.vue'
import Register from '../pages/register/index.vue'
import Search from '../pages/search/index.vue'
import Detail from '../pages/Detail/index.vue'
import AddCartSuccess from '../pages/AddCartSuccess/index.vue'
import ShopCart from '../pages/ShopCart/index.vue'
import store from '../store/index'
import Trade from '../pages/Trade/index.vue'
import Pay from '../pages/Pay/index.vue'
import PaySuccess from '../pages/PaySuccess/index.vue'
import Center from '../pages/Center/index.vue'
import GroupOrder from '../pages/Center/groupOrder/index.vue'
import MyOrder from '../pages/Center/myOrder/index.vue'
const routes = [
    {
        path: '/',
        component: Home,
        name: 'home',
        meta: {
            show: true
        }
    },
    {
        //parmas参数可传可不传，如果不传，应该在参数后面加?
        path: '/search/:keyword?',
        component: Search,
        name: 'search',
        meta: {
            show: true
        }
    },
    {
        path: '/login',
        component: Login,
        name: 'login',
        meta: {
            show: false
        }
    },
    {
        path: '/register',
        component: Register,
        name: 'register',
        meta: {
            show: false
        }
    },
    {
        path: '/detail/:skuid?',
        component: Detail,
        name: 'detail',
        meta: {
            show: true
        }
    },
    {
        path: '/addcartsuccess',
        component: AddCartSuccess,
        name: 'addcartsuccess',
        meta: {
            show: true
        }
    },
    {
        path: '/shopcart',
        component: ShopCart,
        name: 'shopcart',
        meta: {
            show: false
        }
    },
    {
        path: '/trade',
        component: Trade,
        name: 'trade',
        meta: {
            show: false
        },
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next()
            } else {
                next(false)
            }
        }
    }, {
        path: '/pay',
        component: Pay,
        name: 'pay',
        meta: { show: false },
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }
        }
    }, {
        path: '/paysuccess',
        component: PaySuccess,
        name: 'paysuccess',
        meta: { show: false },
        beforeEnter: (to, from, next) => {
            if (from.path == '/pay') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/center',
        component: Center,
        name: 'center',
        meta: { show: true },
        children: [
            {
                path: 'myorder',
                component: MyOrder
            }, {
                path: 'grouporder',
                component: GroupOrder
            }, {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    // 路由跳转时的默认行为，置于页面顶端
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 }
    },
})
// 路由全局前置守卫
router.beforeEach(async (to, from, next) => {
    let token = store.state.users.token
    let name = store.state.users.userInfo.name
    if (token) {
        if (to.path == '/login' || to.path == '/register') {
            next('/')
        } else {
            if (name) {
                next()
            } else {
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        let toPath = to.path
        // console.log('router---', toPath)
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            // 存储未登录时跳转的路由
            next('/login?redirect=' + toPath)
        } else {
            next()
        }
    }
})

export default router