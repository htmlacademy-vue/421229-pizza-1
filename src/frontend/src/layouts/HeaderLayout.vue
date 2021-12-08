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
      <router-link to="/cart" class="logo">{{ totalSum }} ₽</router-link>
    </div>
    <UserProfile v-if="isAuthenticated" />
    <LoginLink v-else />
  </header>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import UserProfile from "../components/UserProfile";
import LoginLink from "../components/LoginLink";

export default {
  name: "HeaderLayout",
  components: { LoginLink, UserProfile },
  computed: {
    ...mapState("User", ["isAuthenticated"]),
    ...mapGetters("Cart", ["totalSum"]),
  },
};
</script>
