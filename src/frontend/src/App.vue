<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";

export default {
  name: "App",
  components: {
    AppLayout,
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
