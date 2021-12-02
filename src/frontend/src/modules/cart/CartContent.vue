<template>
  <div>
    <CartList />
    <CartMisc />
    <CartForm />
  </div>
</template>
<script>
import CartList from "@/modules/cart/CartList";
import CartMisc from "@/modules/cart/CartMisc";
import CartForm from "@/modules/cart/CartForm";

export default {
  name: "CartContent",
  components: { CartForm, CartMisc, CartList },
};
</script>
