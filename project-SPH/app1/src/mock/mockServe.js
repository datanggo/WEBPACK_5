// 引入mockjs插件
import Mock from 'mockjs'

// 把JSON格式数据引入 ,JSON数据格式不对外暴露但是可以引入
// webpack默认对外暴露的有：图片、JSON数据格式
import banner from '@/mock/banner.json'
import floor from '@/mock/floor.json'

// mock数据
// Mock对象身上的mock方法，第一个参数：请求的地址，第二个参数：请求地址相应的数据
Mock.mock("/mock/banner", { code: 200, data: banner });//模拟首页大的轮播图的数据
Mock.mock("/mock/floor", { code: 200, data: floor });//模拟首页的楼层的数据

