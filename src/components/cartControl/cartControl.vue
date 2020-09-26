<template>
  <div class="cartControl">
    <transition name="move">
      <div
        class="cart-decrease"
        @click.stop="decreaseCart"
        v-show="food.count > 0"
      >
        <span
          class="inner icon-remove_circle_outline"
          v-show="food.count > 0"
        ></span>
      </div>
    </transition>

    <div class="cart-count">
      {{ food.count }}
    </div>
    <div class="cart-increase icon-add_circle" @click.stop="addCart">
      <i class="bg"></i>
    </div>
  </div>
</template>

<script>
import vue from "vue";
export default {
  props: {
    food: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    decreaseCart() {
      this.food.count--;
    },
    addCart() {
      // vue.set(target, key value)
      if (!this.food.count) {
        vue.set(this.food, "count", 0);
      }
      this.food.count++;
    }
  }
};
</script>

<style>
.cartControl {
  font-size: 0;
}
.cartControl .cart-decrease {
  display: inline-block;
  width: 26px;
  height: 26px;
  font-size: 26px;
  color: #b4b4b4;
}

.cartControl .cart-count {
  display: inline-block;
  width: 25px;
  line-height: 26px;
  font-size: 12px;
  vertical-align: top;
  padding-left: 15px;
}
.cartControl .cart-increase {
  display: inline-block;
  width: 26px;
  height: 26px;
  font-size: 26px;
  color: #ffd161;
  position: relative;
}
.cartControl .cart-increase.bg {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: black;
  position: absolute;
  left: 3px;
  top: 3px;
  z-index: -1;
}
.move-enter-active,
.move-leave-active {
  transition: all 0.5s;
}
.move-enter,
.move-leave-to {
  transform: translateX(20px) rotate(180deg);
}
</style>
