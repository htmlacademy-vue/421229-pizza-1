<template>
  <div>
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
  components: {
    HeaderLayout,
  },
};
</script>
