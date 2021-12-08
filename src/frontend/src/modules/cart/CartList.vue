<template>
  <ul class="cart-list sheet">
    <li class="cart-list__item" v-for="pizza in pizzas" :key="pizza.id">
      <PizzaDescription
        additionalClass="cart-list__product"
        :pizza="getFullPizza(pizza)"
      />

      <div class="counter cart-list__counter">
        <button
          type="button"
          class="counter__button counter__button--minus"
          @click="
            changeCount({
              entity: 'pizzas',
              module: 'Cart',
              value: pizza,
              term: -1,
            })
          "
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
          @click="
            changeCount({
              entity: 'pizzas',
              module: 'Cart',
              value: pizza,
              term: 1,
            })
          "
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
import { mapGetters, mapMutations, mapState } from "vuex";
import { UPDATE_COUNT } from "../../store/mutation-types";
import PizzaDescription from "../../components/PizzaDescription";

export default {
  name: "CartList",
  computed: {
    ...mapState("Cart", ["pizzas"]),
    ...mapGetters("Builder", ["getFullPizza"]),
  },
  components: { PizzaDescription },
  methods: {
    ...mapMutations({ changeCount: UPDATE_COUNT }),
    goEditPizza(pizza) {
      this.$router.push({ path: `/edit/${pizza.id}` });
    },
  },
};
</script>
