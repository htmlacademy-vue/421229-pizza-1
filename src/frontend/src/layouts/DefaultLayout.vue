<template>
  <div data-test="default-layout">
    <HeaderLayout />
    <main class="content">
      <slot />
    </main>
  </div>
</template>

<script>
import HeaderLayout from "@/layouts/HeaderLayout.vue";

export default {
  name: "DefaultLayout",
  components: { HeaderLayout },
};
</script>
<style lang="scss">
@import "~@/assets/scss/layout/content";
</style>
