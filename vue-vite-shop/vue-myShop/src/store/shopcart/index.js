import { reqGetShopCartList, reqDeleteCartById, reqUpdateCheckById } from "../../api"
//此处的数据形式要与接口返回的形式相同
const state = {
    shopCartList: []
}
const actions = {
    async getShopCartList({ commit }) {
        let result = await reqGetShopCartList()
        if (result.code == 200) {
            commit('GETSHOPCARTLIST', result.data)
        }
    },
    async deleteCartListById({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    async updateCartById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckById(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    deleteAllCheckedCart({ dispatch, getters }) {
        let allPromise = []
        getters.shopCartList.cartInfoList.forEach(element => {
            let result = element.isChecked == 1 ? dispatch('deleteCartListById', element.skuId) : ''
            allPromise.push(result)
        });
        return Promise.all(allPromise)
    },
    updateAllCheckedCart({ dispatch, getters }, isChecked) {
        let allPromise = []
        getters.shopCartList.cartInfoList.forEach(element => {
            let result = (element.isChecked == isChecked) ? '' : dispatch('updateCartById', { skuId: element.skuId, isChecked: isChecked })
            allPromise.push(result)
        })
        return Promise.all(allPromise)
    }
}
const mutations = {
    GETSHOPCARTLIST(state, shopCartList) {
        state.shopCartList = shopCartList
    }
}
const getters = {
    shopCartList(state) {
        return state.shopCartList[0] || {}
    }
}

export default {
    state, actions, mutations, getters
}