<template>
  <div data-test="profile-layout">
    <HeaderLayout />
    <main class="layout">
      <div class="layout__sidebar sidebar">
        <router-link
          to="/"
          class="logo layout__logo"
        >
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </router-link>

        <router-link
          to="/orders"
          class="layout__link"
          active-class="layout__link--active"
        >
          История заказов
        </router-link>
        <router-link
          to="/profile"
          class="layout__link"
          active-class="layout__link--active"
        >
          Мои данные
        </router-link>
      </div>
      <div class="layout__content">
        <div class="layout__title">
          <h1 class="title title--big">{{ title }}</h1>
        </div>
        <slot />
      </div>
    </main>
  </div>
</template>

<script>
import HeaderLayout from "@/layouts/HeaderLayout.vue";

export default {
  name: "ProfileLayout",
  components: { HeaderLayout },
  computed: {
    title() {
      return this.$route.meta.title || "";
    },
  },

  created() {
    this.$store.dispatch("Addresses/fetchAddresses");
  },
};
</script>
<style lang="scss">
@import "~@/assets/scss/layout/layout";
</style>
