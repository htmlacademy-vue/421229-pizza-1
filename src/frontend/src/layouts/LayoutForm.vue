<template>
  <form @submit.prevent="createOrder" method="post" class="layout-form">
    <HeaderLayout />
    <slot />
    <CartFooter />
  </form>
</template>
<script>
import CartFooter from "@/modules/cart/CartFooter";
import HeaderLayout from "@/layouts/HeaderLayout";
import { mapActions } from "vuex";

export default {
  components: { CartFooter, HeaderLayout },
  methods: {
    ...mapActions("Orders", ["sendOrder"]),
    async createOrder() {
      await this.sendOrder();
      this.$router.push("/order_popup");
    },
  },
};
</script>
