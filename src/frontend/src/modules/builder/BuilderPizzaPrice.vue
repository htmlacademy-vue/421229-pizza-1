<template>
  <div class="content__result">
    <p>Итого: {{ price }} ₽</p>
    <button type="button" class="button" :disabled="disabled">Готовьте!</button>
  </div>
</template>
<script>
export default {
  name: "BuilderPizzaPrice",
  props: {
    price: {
      type: Number,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
