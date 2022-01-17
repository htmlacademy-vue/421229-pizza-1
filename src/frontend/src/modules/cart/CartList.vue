<template>
  <ul class="cart-list sheet">
    <li
      v-for="pizza in pizzas"
      :key="pizza.id"
      class="cart-list__item"
    >
      <PizzaDescription
        additional-class="cart-list__product"
        :pizza="getFullPizza(pizza)"
      />

      <div class="counter cart-list__counter">
        <button
          type="button"
          class="counter__button counter__button--minus"
          @click="decrease(pizza)"
        >
          <span class="visually-hidden">Меньше</span>
        </button>
        <input
          type="text"
          name="counter"
          class="counter__input"
          :value="pizza.quantity"
        />
        <button
          type="button"
          class="counter__button counter__button--plus counter__button--orange"
          @click="increase(pizza)"
        >
          <span class="visually-hidden">Больше</span>
        </button>
      </div>

      <div class="cart-list__price">
        <b>{{ pizza.quantity * pizza.price }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button
          type="button"
          class="cart-list__edit"
          @click="goEditPizza(pizza)"
        >
          Изменить
        </button>
      </div>
    </li>
  </ul>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import PizzaDescription from "../../components/PizzaDescription";

export default {
  name: "CartList",
  components: { PizzaDescription },
  computed: {
    ...mapState("Cart", ["pizzas"]),
    ...mapGetters("Builder", ["getFullPizza"]),
  },

  methods: {
    ...mapActions("Cart", ["changeCount"]),
    goEditPizza(pizza) {
      this.$router.push({ path: `/edit/${pizza.id}` });
    },

    increase(pizza) {
      this.changeCount({ pizza, term: 1 });
    },

    decrease(pizza) {
      this.changeCount({ pizza, term: -1 });
    }
  },
};
</script>
<style lang="scss">
@import "~@/assets/scss/mixins/mixins";
@import "~@/assets/scss/blocks/cart-list";
@import "~@/assets/scss/blocks/counter";
</style>
