<template>
  <form @submit.prevent="createOrder" method="post" class="layout-form">
    <HeaderLayout />
    <slot />
    <CartFooter />
    <transition name="fade">
      <OrderPopup v-if="showOrderPopup" @closePopup="closePopup" />
    </transition>
  </form>
</template>
<script>
import CartFooter from "@/modules/cart/CartFooter";
import HeaderLayout from "@/layouts/HeaderLayout";
import { mapActions } from "vuex";
import OrderPopup from "../modules/orders/OrderPopup";

export default {
  name: "LayoutForm",
  data() {
    return {
      showOrderPopup: false,
    };
  },
  components: { CartFooter, HeaderLayout, OrderPopup },
  methods: {
    ...mapActions("Orders", ["sendOrder"]),
    ...mapActions("Cart", ["resetCart"]),
    async createOrder() {
      await this.sendOrder();
      this.resetCart();
      this.showOrderPopup = true;
    },
    closePopup() {
      this.showOrderPopup = false;
    },
  },
};
</script>
<style lang="scss">
.fade-enter-active {
  animation: fade-in 500ms;
}
.fade-leave-active {
  animation: fade-in 500ms reverse;
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
