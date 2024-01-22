// 这里是spu接口的地方
import request from '@/utils/request'

// 获取SPU列表数据的接口
// GET /admin/product/{page}/{limit}   category3Id
export const reqSpuList = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id } })