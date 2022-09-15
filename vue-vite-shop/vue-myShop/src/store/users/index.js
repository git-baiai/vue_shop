import { reqGetCode, reqUserRegister, reqUserLogin, reqGetUserInfo, reqUserLogout } from '../../api'
const state = {
    code: '',
    token: localStorage.getItem("TOKEN"),
    userInfo: {}
}
const actions = {
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    async userRegister({ commit }, data) {
        let result = await reqUserRegister(data)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error(result.code))
        }
    },
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token)
            localStorage.setItem("TOKEN", result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    async getUserInfo({ commit }) {
        let result = await reqGetUserInfo()
        if (result.code == 200) {
            commit('GETUSERINFO', result.data)
            return '0k'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    async userLogout({ commit }) {
        let result = await reqUserLogout()
        if (result.code == 200) {
            commit('LOGOUT')
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    LOGOUT(state) {
        state.token = ''
        state.userInfo = {}
        localStorage.removeItem('TOKEN')
    }

}
const getters = {
}

export default {
    state, actions, mutations, getters
}