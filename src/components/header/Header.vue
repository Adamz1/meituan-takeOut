<template>
  <div class="header">
    <!-- navbar 顶部通栏 -->
    <div class="top-wrapper">
      <div class="back-wrapper">
        <span class="icon-arrow_lift"></span>
      </div>
      <div class="search-wrapper">
        <span class="search-icon"></span>

        <input
          type="text"
          class="search-bar"
          placeholder="请输入要搜索的商品"
        />
      </div>
      <div class="more-wrapper">
        <a href="#" class="spelling-bt">拼单</a>
        <div class="more-bt">
          <i class="s-radius"></i>
          <i class="s-radius"></i>
          <i class="s-radius"></i>
        </div>
      </div>
    </div>
    <!-- 主要内容 -->
    <div class="content-wrapper">
      <div class="icon" :style="icon_bg">
        <!-- <img :src=poi_info.pic_url alt=""> -->
      </div>
      <div class="name">
        <h3>{{ poi_info.name }}</h3>
      </div>
      <div class="collect">
        <img src="./star.png" alt="" />
        <span>收藏</span>
      </div>
    </div>
    <!-- 公告内容 -->
    <div class="bulletin-wrapper">
      <img
        v-if="poi_info.discounts2"
        :src="poi_info.discounts2[0].icon_url"
        alt=""
        class="icon"
      />
      <span v-if="poi_info.discounts2" class="text">{{
        poi_info.discounts2[0].info
      }}</span>
      <div v-if="poi_info.discounts2" class="detail" @click="show">
        {{ poi_info.discounts2.length }}个活动
        <span
          v-if="poi_info.discounts2"
          class="icon-keyboard_arrow_right"
        ></span>
      </div>
    </div>
    <!-- 添加背景 -->
    <div class="bg-wrapper" :style="content_bg"></div>
    <!-- <img :src="poi_info.head_pic_url" alt=""> -->

    <!-- 公告详情-->
    <!--  -->
      <transition name="fade">
    <div class="bulletin-detail" v-if="isShow">
      <div class="detail-wrapper">
        <div class="main-wrapper" :style="detail_bg">
          <div class="icon" :style="icon_bg"></div>
          <h3 class="name">{{ poi_info.name }}</h3>
          <!-- 评价 -->
          <div class="score">
              <star :score = poi_info.wm_poi_score></star>
              <span>{{poi_info.wm_poi_score}}</span>
          </div>
          <p class="tip">
            {{ poi_info.min_price_tip }} <i></i>
            {{ poi_info.shipping_fee_tip }} <i></i>
            {{ poi_info.delivery_time_tip }} <i></i>
          </p>
          <p class="time">配送时间 : {{ poi_info.shipping_time }}</p>
          <div class="discount">
            <p v-if="poi_info.discounts2">
              <img :src="poi_info.discounts2[0].icon_url" alt="" />
              <span>{{ poi_info.discounts2[0].info }}</span>
            </p>
          </div>
        </div>
        <div class="close-wrapper">
          <span class="icon-close" @click ='close'> </span>
        </div>
      </div>
    </div>
      </transition>

  </div>
</template>

<script>
// 导入 star 组件 
import star from '../star/Star'
export default {
    data(){
        return{
            // 默认的公告详情是不显示的
            isShow:false
        }
    },
  props: {
    poi_info: {
      type: Object,
      default: {}
    }
  },
  components:{
      star
  },
  computed: {
    content_bg() {
      return "background-image: url(" + this.poi_info.head_pic_url + ")";
    },
    icon_bg() {
      return "background-image: url(" + this.poi_info.pic_url + ")";
    },
    detail_bg() {
      return "background-image: url(" + this.poi_info.poi_back_pic_url + ")";
    }
  },
  methods: {
      show(){
          this.isShow = true
      },
      close(){
          this.isShow = false
      }
        }
};
</script>

<style>
/* 导入字体图标 */
@import url("../../common/css/style.css");
/* @import url("Head.css"); */
@import url("./Head.css");
</style>
