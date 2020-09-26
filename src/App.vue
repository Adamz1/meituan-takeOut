<template>
  <div id="app">
    <myhead :poi_info="poi_info"></myhead>
    
    <mynav class="nav"></mynav>

    <router-view></router-view>
  </div> 
</template>

<script>
// from components
import myhead from "./components/header/Header";
import mynav from "./components/nav/navBar";
import goods from "./components/goods/Goods";

export default {
  name: "App",
  data() {
    return {
      poi_info: {
        // header 组件需要的信息 店铺信息
      }
    };
  },
  components: {
    myhead,
    mynav,
    goods
  },
  // 发起异步请求获取数据
  created() {
    var that = this;
    this.$axios.get("/api/goods").then(response => {
      var dataSource = response.data;
      if (dataSource.code == 0) {
        this.poi_info = dataSource.data.poi_info;
      }
    });
  }
};
</script>

<style>
/* .is-active{
    color:red;
  } */
  nav{
  }
</style>
