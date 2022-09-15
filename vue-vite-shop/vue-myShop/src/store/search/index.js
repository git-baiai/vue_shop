import { reqGetSearchInfo } from '../../api'
const state = {
    searchList: {}
}
const actions = {
    async getSearchInfo({ commit }, parmas = {}) {
        let result = await reqGetSearchInfo(parmas)
        if (result.code == 200) {
            commit('GETSEARCHINFO', result.data)
        }
    }
}
const mutations = {
    GETSEARCHINFO(state, searchList) {
        state.searchList = searchList
    }
}
const getters = {
    goodsList(state) {
        //加入没有网络，则返回空数组，不然会是undefine，遍历会出错
        return state.searchList.goodsList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    }
}

export default {
    state, actions, mutations, getters
}