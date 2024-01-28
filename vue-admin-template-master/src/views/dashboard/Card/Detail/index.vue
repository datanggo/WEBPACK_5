<template lang="">
  <div>
    <div class="card-header">
      <span>{{ title }}</span>
      <svg
        t="1706443504569"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1447"
        width="16"
        height="16"
      >
        <path
          d="M864 512C864 317.595768 706.40423 160 512 160 317.595768 160 160 317.595768 160 512 160 706.40423 317.595768 864 512 864 706.40423 864 864 706.40423 864 512ZM64 512C64 264.576432 264.576432 64 512 64 759.423565 64 960 264.576432 960 512 960 759.423565 759.423565 960 512 960 264.576432 960 64 759.423565 64 512Z"
          fill="#666666"
          p-id="1448"
        ></path>
        <path
          d="M448 319.987679C448 284.64826 476.407348 256 512 256 547.346224 256 576 284.397866 576 319.987679L576 512.012321C576 547.35174 547.592652 576 512 576 476.653776 576 448 547.602134 448 512.012321L448 319.987679ZM448 704C448 668.653779 476.407348 640 512 640 547.346224 640 576 668.407347 576 704 576 739.346221 547.592652 768 512 768 476.653776 768 448 739.592653 448 704Z"
          fill="#666666"
          p-id="1449"
          data-spm-anchor-id="a313x.search_index.0.i0.753e3a81c8oWfX"
          class="selected"
        ></path>
      </svg>
    </div>
    <div class="card-content">{{ count }}</div>
    <div class="card-charts">
      <slot name="charts"></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "Detail",
  props: ["title", "count"],
};
</script>
<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  color: #d9d9d9;
}
.card-content {
  font-size: 30px;
  padding: 10px 0;
}
.card-charts {
  height: 50px;
}
.card-footer {
  border-top: 1px solid #eeee;
  padding-top: 10px;
}
</style>
