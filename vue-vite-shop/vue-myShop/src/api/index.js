//对api进行同意管理
import requests from './request'
import mockRequests from './mockRequest'
//三级联动接口
export const reqCategoryList = () => {
    return requests({ method: 'get', url: '/api/product/getBaseCategoryList' })
}
export const reqGetBannerList = () => {
    return mockRequests({ method: 'get', url: '/mock/banner' })
}
export const reqFloorList = () => {
    return mockRequests({ method: 'get', url: '/mock/floor' })
}
export const reqGetSearchInfo = (parmas) => {
    return requests({
        method: 'post',
        url: '/api/list',
        data: parmas
    })
}
export const reqGoodInfo = (skuId) => {
    return requests({
        method: 'get',
        url: `/api/item/${skuId}`
    })
}
export const reqAddOrUpdateShopCar = (skuId, skuNum) => {
    return requests({
        method: 'post',
        url: `/api/cart/addToCart/${skuId}/${skuNum}`
    })
}
export const reqGetShopCartList = () => {
    return requests({ method: 'get', url: '/api/cart/cartList' })
}
export const reqDeleteCartById = (skuId) => {
    return requests({ method: 'delete', url: `/api/cart/deleteCart/${skuId}` })
}
export const reqUpdateCheckById = (skuID, isChecked) => {
    return requests({ method: 'get', url: `/api/cart/checkCart/${skuID}/${isChecked}` })
}
export const reqGetCode = (phone) => {
    return requests({ method: 'get', url: `/api/user/passport/sendCode/${phone}` })
}
export const reqUserRegister = (data) => {
    return requests({ method: 'post', url: '/api/user/passport/register', data: data })
}
export const reqUserLogin = (data) => {
    return requests({ method: 'post', url: '/api/user/passport/login', data: data })
}
export const reqGetUserInfo = () => {
    return requests({ method: 'get', url: '/api/user/passport/auth/getUserInfo' })
}
export const reqUserLogout = () => {
    return requests({ method: 'get', url: '/api/user/passport/logout' })
}
export const reqUserAddress = () => {
    return requests({ method: 'get', url: '/api/user/userAddress/auth/findUserAddressList' })
}
export const reqOrderInfo = () => {
    return requests({ method: 'get', url: '/api/order/auth/trade' })
}
export const reqSubmitInfo = (tradeNo, data) => {
    return requests({ method: 'post', url: `/api/order/auth/submitOrder?tradeNo=${tradeNo}`, data })
}
export const reqPayInfo = (orderId) => {
    return requests({ method: 'get', url: `/api/payment/weixin/createNative/${orderId}` })
}
export const reqPayStatus = (orderId) => {
    return requests({ method: 'get', url: `/api/payment/weixin/queryPayStatus/${orderId}` })
}
export const reqMyOrderList = (page, limit) => {
    return requests({ method: 'get', url: `/api/order/auth/${page}/${limit}` })
}