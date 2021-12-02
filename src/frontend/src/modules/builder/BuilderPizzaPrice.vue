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
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { RESET_ACTIVE } from "../../store/mutation-types";

export default {
  name: "BuilderPizzaPrice",
  computed: {
    ...mapGetters("Builder", ["activeIngredients", "totalPrice"]),
    ...mapState("Builder", ["name"]),
    disabled() {
      return !(this.name && this.activeIngredients.length);
    },
  },
  methods: {
    ...mapActions("Cart", ["setPizza"]),
    ...mapMutations("Builder", { reset: RESET_ACTIVE }),
    savePizza() {
      this.setPizza();
      this.reset();
    },
  },
};
</script>
