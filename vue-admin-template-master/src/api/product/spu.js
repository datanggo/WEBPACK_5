// 这里是spu接口的地方
import request from "@/utils/request";

// 获取SPU列表数据的接口
// GET /admin/product/{page}/{limit}   category3Id
export const reqSpuList = (page, limit, category3Id) =>
  request({
    url: `/admin/product/${page}/${limit}`,
    method: "get",
    params: { category3Id },
  });

// 获取spu信息的接口
// /admin/product/getSpuById/{spuId}   get
export const reqSpu = (spuId) =>
  request({ url: `/admin/product/getSpuById/${spuId}`, method: "get" });

//   获取到品牌的信息进行展示
// /admin/product/baseTrademark/getTrademarkList
export const reqTradeMarkList = () =>
  request({
    url: "/admin/product/baseTrademark/getTrademarkList",
    method: "get",
  });

//   获取spu图片的接口
//  /admin/product/spuImageList/{spuId}   get
export const reqSpuImageList = (spuId) =>
  request({ url: `/admin/product/spuImageList/${spuId} `, method: "get" });

//   获取平台中的全部的销售属性--整个平台的销售属性一共就这三个
//  /admin/product/baseSaleAttrList   get
export const reqBaseSaleAttrList = () =>
  request({ url: "/admin/product/baseSaleAttrList", method: "get" });

// 修改spu或者是添加spu:对于修改或者添加携带的参数大致是一样的,唯一的区别是是否携带id
// POST /admin/product/updateSpuInfo
export const reqAddOrUpdataSpu = (spuInfo) => {
  // 如果携带的参数带有id-----修改spu
  if (spuInfo.id) {
    return request({ url: `/admin/product/updateSpuInfo`, method: "post", data: spuInfo })
  } else {
    // 如果携带的没有参数带有id-----添加spu
    return request({ url: "/admin/product/saveSpuInfo", method: "post", data: spuInfo })
  }

}


