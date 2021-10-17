<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart" class="logo">{{ price }} ₽</router-link>
    </div>
    <component :is="authComponent" />
  </header>
</template>
<script>
export default {
  name: "HeaderLayout",
  data() {
    return {
      user: 1,
    };
  },
  props: {
    price: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    authComponent() {
      return () =>
        import(`@/components/${this.user ? "UserProfile" : "LoginLink"}.vue`);
    },
  },
};
</script>
