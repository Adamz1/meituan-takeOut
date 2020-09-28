<template>
  <div class="seller">
    <div class="seller-wrapper">
      <split></split>
      <div class="seller-view">
        <div class="address-wrapper">
          <div class="address-left">
            {{seller.address}}
          </div>
          <div class="address-right">
            <div class="content"></div>
          </div>
        </div>
        <div class="pics-wrapper" v-if="seller.poi_env" ref="picsView">
          <ul class="pics-list" ref="picsList">
            <li class="pics-item" v-for="imgurl in seller.poi_env.thumbnails_url_list" :key="imgurl">
              <img :src="imgurl" alt="" ref="picsItem">
            </li>
          </ul>
        </div>
        <div class="safety-wrapper"></div>
      </div>
      <split></split>
      <div class="tip-wrapper"></div>
      <split></split>
      <div class="other-wrapper"></div>
    </div>
  </div>
</template>

<script>
import split from "../split/Split";
import BScroll from 'better-scroll';
export default {
  data() {
    return {
      seller: {}
    };
  },
  created() {
    this.$axios.get("/api/seller").then(response => {
      this.seller = response.data.data;
      this.$nextTick(()=>{
          if(this.seller.poi_env.thumbnails_url_list){
            let imgW = this.$refs.picsItem[0].clientWidth;
            let marginR =11;
            let width =(imgW + marginR) *this. seller.poi_env.thumbnails_url_list.length
            this.$refs.picsList.style.width = width +'px'
            this.scroll = new BScroll(this.$refs.picsView,{
              scrollX: true
            })
          }
      })
    });
  },
  components: {
    split
  }
};
</script>

<style>
@import url("./Seller.css");
</style>
