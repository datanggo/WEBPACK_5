// 平台属性管理模块的请求文件
import request from "@/utils/request";

// 获取一级分类的数据
// GET /admin/product/get/category1/{id}
// GET /admin/product/getCategory1

export const reqCategory1List = () =>
  request({ url: "/admin/product/getCategory1", method: "get" });

// 获取二级分类数据的接口
// GET /admin/product/getCategory2/{category1Id}

export const reqCategory2List = (category1Id) =>
  request({ url: `/admin/product/getCategory2/${category1Id}`, method: "get" });

// 获取三级分类数据的接口
// GET /admin/product/getCategory3/{category2Id}
export const reqCategory3List = (category2Id) =>
  request({ url: `/admin/product/getCategory3/${category2Id}`, method: "get" });

// 获取平台属性的接口
// GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrList = (category1Id, category2Id, category3Id) => {
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "get",
  });
};

// 添加属性与属性值的接口
// POST /admin/product/saveAttrInfo
export const reqAddOrUpdataAttr = (data) =>
  request({ url: "/admin/product/saveAttrInfo", method: "post", data });
/* 
需要携带的参数
  {
  "attrName": "string",   //属性名
  "attrValueList": [      //属性名对应的属性值，因为属性值可以是多个，因此需要的是数组
    {
      "attrId": 0,          //属性的id
      "valueName": "string" //相应的属性值
    }
  ],
  "categoryId": 0,          //category3Id
  "categoryLevel": 3,       //level即第三级的
}
  */
