<template>
  <div>
    <!-- 组件的结构 -->
    <h2>学生姓名：{{ name }}</h2>
    <h2>学校年龄：{{ age }}</h2>
  </div>
</template>

<script type="javascript">
//组件交互相关的代码

// export const school = Vue.extend({ //此为分别暴露
export default {
  name: "StudentMsg",
  data() {
    return {
      name: "尚硅谷",
      age: 18,
    };
  },
};
// export {school}   //此为统一暴露
// export default  school  //此为默认暴露
</script>
