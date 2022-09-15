import { createStore } from "vuex";
import home from './home'
import search from './search'
import detail from "./detail";
import shopcart from "./shopcart";
import users from "./users";
import trade from "./trade";
export default createStore({
    state() {
        return {

        }
    },
    actions: {

    },
    mutations: {

    },
    modules: {
        home, search, detail, shopcart, users, trade
    }
})