<template>
  <div class="nav">
    <router-link to="/goods" class="navItem"
      >商品
      <i class="line"></i>
    </router-link>
    <router-link to="/ratings" class="navItem"
      >评价 ({{ratings_num}})
      <i class="line"></i>
    </router-link>
    <router-link to="/seller" class="navItem"
      >商家
      <i class="line"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    ratings_num: {
        type:Number,
        default:0 
    }
  }
};
</script>

<style>
.nav {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #e4e4e4;
  margin-top: 0;
}
.navItem {
  flex: 1;
  text-align: center;
  font-size: 13px;
  text-decoration: none;
  color: #666666;
  position: relative;
}
.is-active {
  color: #ffbb22;
}
.nav .is-active .line {
  width: 21px;
  height: 2px;
  display: inline-block;
  background-color: #ffbb22;
  position: absolute;
  left: 50%;
  bottom: 0;
  margin-left: -10px;
}
</style>
