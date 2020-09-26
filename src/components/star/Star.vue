<template>
  <div class="star">
    <!-- itemclasses: on, off, half -->
    <span
      v-for="itemClass in itemClasses"
      :key="itemClass"
      :class="itemClass"
      class="star-item"
    >
    </span>
  </div>
</template>

<script>
// 星星长度
const LENGTH = 5;
// 星星对应的类名
const CLS_ON = "on";
const CLS_OFF = "off";
const CLS_HALF = "half";

export default {
  props: {
    score: {
      type: Number,
      default: 0
    }
  },
  // 用计算属性得到 itemClasses
  computed: {
    itemClasses() {
      // 将传入的星级 向下取整
      let result = [];
      let score = Math.floor(this.score * 2) / 2;
      let hasDecimal = score % 1 !== 0;
      let integer = Math.floor(score);
      // 全星 push 到 result
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }
      // 先判断有没有半星 有的话也 push 到result 中
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      // 补齐
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
        return result
    }
  }
};
</script>

<style>
.star {
  font-size: 0;
}
.star .star-item {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 3px;
  background-repeat: no-repeat;
  background-size: 10px 10px;
}
.star .star-item:last-child {
  margin-right: 0;
}
/* 对应的星星的三种状态 */
.star .on {
  background-image: url("./star24_on@2x.png");
}
.star .off {
  background-image: url("./star24_off@2x.png");
}
.star .half {
  background-image: url("./star24_half@2x.png");
}
</style>
