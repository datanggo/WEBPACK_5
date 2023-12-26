// 当前的这个模块:API进行统一管理
import requests from './request'

// 引入封装的mock请求文件 
import mockRequests from '@/api/mockAjax'

// 三级联动的接口
// /api/product/get/BaseCategoryList   get请求   无参数

// 对外暴露请求函数
export const reqCategoryList = () => {
    // 发请求:axios发请求返回的结果是Promise对象
    return requests({ url: '/product/getBaseCategoryList', method: 'get' })
}

// 获取banner(Home首页轮播图的图片接口)
export const reqGetBannerLiset = () => {
    return mockRequests.get('/banner')
}