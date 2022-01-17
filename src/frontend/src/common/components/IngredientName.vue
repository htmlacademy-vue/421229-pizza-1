<template>
  <span
    class="filling"
    :class="className"
  >
    {{ ingredient.name }}
  </span>
</template>

<script>
export default {
  name: "IngredientName",
  props: {
    ingredient: {
      type: Object,
      required: true,
    },
  },

  computed: {
    className() {
      return `filling--${this.ingredient.nameLat}`;
    },
  },
};
</script>
<style lang="scss">
@import "~@/assets/scss/mixins/mixins";
@import "~@/assets/scss/blocks/filling";
</style>
