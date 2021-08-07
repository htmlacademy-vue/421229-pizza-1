<template>
  <header class="header">
    <div class="header__logo">
      <a href="index.html" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </a>
    </div>
    <div class="header__cart">
      <a href="cart.html">{{ price }} ₽</a>
    </div>
    <div class="header__user">
      <a :href="userRedirectHref" class="header__login"><span>Войти</span></a>
    </div>
  </header>
</template>
<script>
export default {
  name: "HeaderLayout",
  data() {
    return {
      user: null,
    };
  },
  props: {
    price: {
      type: Number,
      required: true,
    },
  },
  computed: {
    userRedirectHref() {
      return this.user ? "user-data.html" : "sign-in.html";
    },
  },
};
</script>
