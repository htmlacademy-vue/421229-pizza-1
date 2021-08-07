<template>
  <span class="filling" :class="`filling--${ingredient.nameLat}`">
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
};
</script>
