import vue from "vue";
import vueRouter from 'vue-router';
vue.use(vueRouter);

import goods from "../components/goods/Goods.vue";
import ratings from "../components/ratings/Ratings.vue";
import seller from "../components/seller/Seller.vue";

const routes = [
  {
    path: "/",
    redirect: "/goods"
  },
  {
    path: "/goods",
    component: goods
  },
  {
    path: "/ratings",
    component: ratings
  },
  {
    path: "/seller",
    component: seller
  }
];

const router = new vueRouter({
    routes,
    mode:'history',
    linkExactActiveClass: 'is-active',


})
 export default router
