import { reqGoodInfo, reqAddOrUpdateShopCar } from "../../api"
import { getUUID } from "../../utils/uuid_token"
const state = {
    goodInfoList: {},
    uuid_token: getUUID()
}
const mutations = {
    GOODINFO(state, goodInfoList) {
        state.goodInfoList = goodInfoList
    }
}
const actions = {
    async goodInfo({ commit }, skuId) {
        let result = await reqGoodInfo(skuId)
        if (result.code == 200) {
            commit('GOODINFO', result.data)
        }
    },
    async addOrUpdateShopCar({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCar(skuId, skuNum)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {
    categoryView(state) {
        return state.goodInfoList.categoryView || {}
    },
    skuInfo(state) {
        return state.goodInfoList.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodInfoList.spuSaleAttrList || []
    }

}
export default { state, mutations, actions, getters }