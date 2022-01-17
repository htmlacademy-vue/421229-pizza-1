<template>
  <transition
    name="slide"
    mode="out-in"
  >
    <AppLayout>
      <router-view />
    </AppLayout>
  </transition>
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
.slide-enter-active {
  transition: transform 300ms ease-in-out;
}
.slide-enter {
  transform: translateX(-100%);
}
.slide-enter-to {
  transform: translateX(0);
}
</style>
