<template>
  <ul class="cart-list sheet">
    <li class="cart-list__item" v-for="pizza in pizzas" :key="pizza.id">
      <div class="product cart-list__product">
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
            <li>
              {{ pizza.size.name }}, на {{ pizza.dough.prepositional }} тесте
            </li>
            <li>Соус: {{ pizza.sauce.name.toLowerCase() }}</li>
            <li>
              Начинка:
              {{
                pizza.ingredients.reduce((result, ingredient, index) => {
                  return index === 0
                    ? ingredient.name.toLowerCase()
                    : `${result}, ${ingredient.name.toLowerCase()}`;
                }, "")
              }}
            </li>
          </ul>
        </div>
      </div>

      <div class="counter cart-list__counter">
        <button
          type="button"
          class="counter__button counter__button--minus"
          @click="changeCount({ entity: 'pizzas', value: pizza, term: -1 })"
        >
          <span class="visually-hidden">Меньше</span>
        </button>
        <input
          type="text"
          name="counter"
          class="counter__input"
          :value="pizza.count"
        />
        <button
          type="button"
          class="counter__button counter__button--plus counter__button--orange"
          @click="changeCount({ entity: 'pizzas', value: pizza, term: 1 })"
        >
          <span class="visually-hidden">Больше</span>
        </button>
      </div>

      <div class="cart-list__price">
        <b>{{ pizza.count * pizza.price }} ₽</b>
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
import { mapMutations, mapState } from "vuex";
import { UPDATE_ENTITY } from "../../store/mutation-types";

export default {
  name: "CartList",
  computed: mapState("Cart", ["pizzas"]),
  methods: {
    ...mapMutations("Cart", { changeCount: UPDATE_ENTITY }),
    goEditPizza(pizza) {
      this.$router.push({ path: `/edit/${pizza.id}` });
    },
  },
};
</script>
