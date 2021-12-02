<template>
  <form action="test.html" method="post" class="layout-form">
    <HeaderLayout />
    <slot />
    <CartFooter />
  </form>
</template>
<script>
import CartFooter from "@/modules/cart/CartFooter";
import HeaderLayout from "@/layouts/HeaderLayout";

export default {
  components: { CartFooter, HeaderLayout },
};
</script>
