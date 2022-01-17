<template>
  <div class="content__result">
    <p>Итого: {{ totalPrice }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="disabled"
      @click="savePizza()"
    >
      Готовьте!
    </button>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "BuilderPizzaPrice",
  computed: {
    ...mapGetters("Builder", ["activeIngredients", "totalPrice"]),
    ...mapState("Builder", ["pizza"]),
    disabled() {
      return !(this.pizza.name && this.activeIngredients.length);
    },
  },

  methods: {
    ...mapActions("Cart", ["setPizza"]),
    ...mapActions("Builder", ["resetPizza"]),
    savePizza() {
      this.setPizza();
      this.resetPizza();
    },
  },
};
</script>
<style lang="scss">
@import "~@/assets/scss/blocks/button";
</style>
