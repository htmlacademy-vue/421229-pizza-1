<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";
import { setAuth } from "./common/helpers/setAuth";

export default {
  name: "App",
  components: { AppLayout },
  created() {
    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }
    this.$store.dispatch("init");
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
