import { reqCategoryList, reqGetBannerList, reqFloorList } from "../../api"
//此处的数据形式要与接口返回的形式相同
const state = {
    categoryList: [],
    bannerList: [],
    floorList: []
}
const actions = {
    async categoryList({ commit }) {
        let result = await reqCategoryList()
        if (result.code == 200) {
            commit('CATEGROYLIST', result.data)
        }
    },
    async bannerList({ commit }) {
        let result = await reqGetBannerList()
        if (result.code == 200) {
            commit('BANNERLIST', result.data)
        }
    },
    async reqFloorList({ commit }) {
        let result = await reqFloorList()
        if (result.code == 200) {
            commit('FLOORLIST', result.data)
        }
    }
}
const mutations = {
    CATEGROYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    BANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    FLOORLIST(state, floorlist) {
        state.floorList = floorlist
    }
}
const getters = {}

export default {
    state, actions, mutations, getters
}