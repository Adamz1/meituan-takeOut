<template>
  <div class="goods">
    <!-- 菜单分类 -->
    <div class="menu-wrapper" ref="menuScroll">
      <ul>
        <!-- 专场的图片 -->
        <li
          class="menu-item"
          :class="{ current: currentIndex === 0 }"
          @click="selectMenu(0)"
        >
          <p class="text">
            <img :src="container.tag_icon" class="icon" alt="" />
            {{ container.tag_name }}
          </p>
        </li>
        <!-- 除了专场之外的东西 -->
        <li
          class="menu-item"
          v-for="(item, index) in goods"
          :Key="item"
          :class="{ current: currentIndex === index + 1 }"
          @click="selectMenu(index + 1)"
        >
          <p class="text">
            <img :src="item.icon" v-if="item.icon" class="icon" alt="" />
            {{ item.name }}
          </p>
          <!--左边栏的 显示购买的数量 -->
          <i class="num" v-show="calculateCount(item.spus)">{{
            calculateCount(item.spus)
          }}</i>
        </li>
      </ul>
    </div>
    <!-- 商品列表 -->
    <div class="foods-wrapper" ref="foodScroll">
      <ul>
        <!-- 专场数据分类 -->
        <li class="container-list food-list-hook">
          <div
            v-for="item in container.operation_source_list"
            :key="item.scheme"
          >
            <img :src="item.pic_url" alt="" />
          </div>
        </li>
        <!-- 具体分类 -->
        <li
          v-for="item in goods"
          :key="item.name"
          class="foods-list food-list-hook"
        >
          <h3 class="title">{{ item.name }}</h3>
          <ul>
            <li v-for="food in item.spus" :key="food.name" class="food-item" @click = showDetail(food)>
              <div class="icon" :style="head_bg(food.picture)"></div>
              <!-- <img :src="food.picture" alt=""> -->
              <div class="content">
                <h3 class="name">{{ food.name }}</h3>
                <p v-if="food.description" class="desc">
                  {{ food.description }}
                </p>
                <div class="extra">
                  <span class="sale"> {{ food.month_saled_content }}</span>
                  <span class="prise">{{ food.praise_content }}</span>
                </div>
                <img class="product" :src="food.product_label_picture" />
                <p class="price">
                  <span class="text">${{ food.min_price }}</span>
                  <span class="unit">{{ food.unit }}</span>
                </p>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 购物车组件 -->
    <shopcart :poiInfo="poiInfo" :selectFoods="selectFoods"> </shopcart>
    <!-- 商品详情 -->
    <food :food = selectedFoods ref="foodView"></food>
  </div>
</template>

<script>
// 导入 better-scroll
import Bscroll, { InfinityScroll } from "better-scroll";
// 导入购物车
import shopcart from "../shopCart/Shopcart";
import cartcontrol from "../cartControl/cartControl";
import food from '../food/Food'
export default {
  data() {
    return {
      container: {},
      poiInfo: {},
      goods: [],
      listHeight: [],
      scrollY: 0,
      menuScroll: {},
      foodScroll: {},
      selectedFoods:{}
    };
  },
  components: {
    shopcart,
    cartcontrol,
    food
  },
  methods: {
    head_bg(imgName) {
      return "background-image: url(" + imgName + ")";
    },
    initScroll() {
      this.menuScroll = new Bscroll(this.$refs.menuScroll, {
        scrollY: true,
        click: true,
        probeType: 3
      });
      this.foodScroll = new Bscroll(this.$refs.foodScroll, {
        scrollY: true,
        click: true,
        probeType: 3
      });
      // 给 scroll 添加监听滚动事件
      this.foodScroll.on("scroll", pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    //  计算高度
    calculateHeight() {
      let foodlist = this.$refs.foodScroll.getElementsByClassName(
        "food-list-hook"
      );
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodlist.length; i++) {
        let item = foodlist[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu(index) {
      // console.log(index);
      let foodlist = this.$refs.foodScroll.getElementsByClassName(
        "food-list-hook"
      );
      let el = foodlist[index];
      this.foodScroll.scrollToElement(el, 250);
    },
    calculateCount(spus) {
      let count = 0;
      spus.forEach(food => {
        if (food.count > 0) {
          count += food.count;
        }
      });
      return count;
    },
    // 显示 food 的detail
    showDetail(food){
      // 传递发送的值
      this.selectedFoods =  food
      // 显示详情页 父组件中可以使用子组件的方法
      this.$refs.foodView.showView()

    }
  },
  created() {
    var that = this;
    this.$axios.get("/api/goods").then(response => {
      var dataSource = response.data;
      //   console.log(dataSource);
      if (dataSource.code == 0) {
        this.container = dataSource.data.container_operation_source;
        this.goods = dataSource.data.food_spu_tags;
        this.poiInfo = dataSource.data.poi_info;
        console.log(this.poiInfo);
        that.$nextTick(() => {
          // dom已经更新
          that.initScroll();
          // 计算分类区间的高度
          that.calculateHeight();
        });
      }
    });
    // dom nextTick () 异步操作结束之后的刷新
  },
  computed: {
    currentIndex() {
      //  根据右侧滚动的 y 确定对应的索引下标
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY <= height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach(good => {
        good.spus.forEach(food => {
          if (food.count > 0) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  }
};
</script>

<style>
.goods{
    display: flex;
    /* 通过该方式来确定高度  (将 header 和 navbar 的高度加起来 为定位的 top 值*/
    position: absolute;
    top: 190px;
    bottom: 51px;
    overflow: hidden;
    width: 100%;
}
/* flex 属性
    default: flex :0 1 auto
    flex-grow  存在放大空间则放大
    flex-shrink 定义缩小比例 如果空间不足 自动缩小
    flex-basis 
*/
.goods .menu-wrapper{
    flex: 0 0 85px;
    background: #f4f4f4;
}

.goods .menu-wrapper .menu-item{
    padding: 16px 23px 15px 10px;
    border-bottom: 1px solid #e4e4e4;
    position: relative;
}
.goods .menu-wrapper .current{
    background-color: white ;
    font-weight: bold;
    color: red;
    margin-top: -1px;
}

.goods .menu-wrapper .menu-item .text {
    font-size: 13px;
    color: #333333;
    line-height: 17px;
    /* 显示两行 剩下的显示省略号  使用 webkit 的 css扩展属性 适用于 webkit 浏览器和 移动端*/
    /* 显示 一个块元素显示的文本行数 */
    -webkit-line-clamp: 2;
    /* 必须将对象作为弹性伸缩盒子模型显示 */
    display: -webkit-box;
    /* 必须 设置或检索盒子的子元素排列方式 */
    -webkit-box-orient:vertical ;
    overflow: hidden;

}
.goods .menu-wrapper .menu-item .text .icon {
    width: 15px;
    height: 15px;
    vertical-align: middle;

}

.goods .menu-wrapper .menu-item .num{
    position: absolute;
    height: 13px;
    width: 13px;
    border-radius: 50%;
    background-color: red;
    right: 5px;
    top: 5px;
    font-size: 7px;
    line-height:13px;
    text-align: center;
    color: white;


}

.goods .foods-wrapper{
    flex: 1;
}

/* 专场的样式 */
.goods .foods-wrapper .container-list{  
    padding: 11px 11px 0 11px;
}
.goods .foods-wrapper .container-list img{
    width: 100%;
    margin-bottom: 11px;
    border-radius: 5px;
}
.goods .foods-wrapper .foods-list{
    padding:11px;
}
.goods .foods-wrapper .foods-list .title{
    font-size: 13px;    
    height: 13px;
    background: url('../../resource/img/btn_yellow_highlighted@2x.png') no-repeat left center; 
    background-size: 2px 10px;
    padding-right: 7px;
    margin-bottom: 12px;
}

.goods .foods-wrapper .foods-list .food-item{
    display: flex;
    margin-bottom: 25px;

}
.goods .foods-wrapper .foods-list .food-item.cartcontrol-wrapper{
    position: absolute;
    right: 0;
    bottom: 0;
}
.goods .foods-wrapper .foods-list .food-item .icon{
    flex: 0 0 63px;    
    background-position: middle;
    background-size: 120% 110%; 
    background-repeat: no-repeat;
    margin-right: 11px;
    height: 75px;
}
.goods .foods-wrapper .foods-list .food-item .content{
    flex: 1;
}  

.goods .foods-wrapper .foods-list .food-item .content .name{
    color: #333333;
    font-size: 16px;
    line-height: 21px;
    margin-bottom: 10px;
    padding-right: 27px;
}
.goods .foods-wrapper .foods-list .food-item .content .desc {
    font-size:  10px;
    line-height:19px;
    color: #bfbfbf;
    margin-bottom: 8px;
    /* 超出部分 显示省略号 */ 
    -webkit-line-clamp: 2;
    /* 必须将对象作为弹性伸缩盒子模型显示 */
    display: -webkit-box;
    /* 必须 设置或检索盒子的子元素排列方式 */
    -webkit-box-orient:vertical ;
    overflow: hidden;

}
.goods .foods-wrapper .foods-list .food-item .content .extra{
    font-size: 10px;
    color: #bfbfbf;
    margin-bottom: 7px;
}

.goods .foods-wrapper .foods-list .food-item .content .sale {
    margin-right: 14px;
}
.goods .foods-wrapper .foods-list .food-item .content .product{
    height: 15px;
    margin-bottom: 6px;
}
.goods .foods-wrapper .foods-list .food-item .content .price{   
    font-size: 0;
}
.goods .foods-wrapper .foods-list .food-item .content .price .text{
    font-size: 14px;    
    color: #fb4e44;
}
.goods .foods-wrapper .foods-list .food-item .content .price .unit{
    font-size: 12px;
    color: #bfbfbf;
}



</style>
