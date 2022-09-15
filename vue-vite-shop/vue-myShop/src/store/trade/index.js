import { reqUserAddress, reqOrderInfo } from '../../api'
const state = {
    addressList: [],
    orderInfo: {}
}
const actions = {
    async getUserAdderss({ commit }) {
        let result = await reqUserAddress()
        if (result.code == 200) {
            commit('GETUSERADDRESS', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo()
        if (result.code == 200) {
            commit('GETORDERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations = {
    GETUSERADDRESS(state, list) {
        state.addressList = list
    },
    GETORDERINFO(state, info) {
        state.orderInfo = info
    }
}
const getters = {}
export default {
    state, actions, mutations, getters
}