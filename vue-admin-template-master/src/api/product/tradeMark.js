// 这个模块主要获取的是品牌管理的模块
import request from "@/utils/request"


// 获取品牌列表的接口
// url：/admin/product/baseTrademark/{page}/{limit}
//admin/user/{page}/{limit}
// /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page, limit) => {
    return request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: "get" })
}


//处理添加品牌的操作
// 新增品牌
// POST /admin/product/baseTrademark/save  携带两个参数:品牌名称,品牌logo
// 切记:对于新增的品牌,给服务器传递数据不需要传递ID,id是由服务器生成的

// 修改品牌
// PUT /admin/product/baseTrademark/update    携带三个参数:id,名称,logo
export const reqAddUpdateTradeMark = (tradeMark) => {
    // 传过来的数据携带由id即是修改
    if (tradeMark.id) {
        return request({ url: "/admin/product/baseTrademark/update", method: "put", data: tradeMark })
        // 传递过来的参数不携带id即是新增品牌
    } else {
        return request({ url: "/admin/product/baseTrademark/save", method: "put", data: tradeMark })
    }
}


// 删除品牌操作的接口
// DELETE /admin/product/baseTrademark/remove/{id}
export const reqDeleteTradeMark = (id) => {
    return request({ url: `/admin/product/baseTrademark/remove/${id}`, method: "delete" })
}