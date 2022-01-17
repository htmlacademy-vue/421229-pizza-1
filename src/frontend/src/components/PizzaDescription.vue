<template>
  <div :class="wrapClass">
    <img
      src="@/assets/img/product.svg"
      class="product__img"
      width="56"
      height="56"
      :alt="pizza.name"
    />
    <div class="product__text">
      <h2>{{ pizza.name }}</h2>
      <ul>
        <li data-test="sizeDough">{{ sizeDough }}</li>
        <li data-test="sauce">Соус: {{ sauceName }}</li>
        <li data-test="filling">Начинка: {{ filling }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "PizzaDescription",
  props: {
    pizza: {
      type: Object,
      required: true,
    },

    additionalClass: {
      type: String,
      default: "",
    },
  },

  computed: {
    wrapClass() {
      return `product ${this.additionalClass}`;
    },

    filling() {
      return this.pizza.ingredients.reduce((result, ingredient, index) => {
        return index === 0
          ? ingredient.name?.toLowerCase()
          : `${result}, ${ingredient.name?.toLowerCase()}`;
      }, "");
    },

    sauceName() {
      return this.pizza.sauce?.name?.toLowerCase();
    },

    sizeDough() {
      const { size, dough } = this.pizza;
      return `${size?.name}, на ${dough?.prepositional} тесте`;
    },
  },
};
</script>
<style lang="scss">
@import "~@/assets/scss/mixins/mixins";
@import "~@/assets/scss/blocks/product";
</style>
