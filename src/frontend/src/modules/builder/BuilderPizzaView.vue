<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        v-model="inputValue"
      />
    </label>

    <div class="content__constructor">
      <div class="pizza" :class="modifier">
        <AppDrop>
          <div class="pizza__wrapper">
            <div
              v-for="ingredient in activeIngredients"
              :key="ingredient.id"
              class="pizza__filling"
              :class="ingredientsModifier(ingredient)"
            ></div>
          </div>
        </AppDrop>
      </div>
    </div>

    <BuilderPizzaPrice />
  </div>
</template>

<script>
import BuilderPizzaPrice from "@/modules/builder/BuilderPizzaPrice.vue";
import AppDrop from "@/common/components/AppDrop.vue";
import { mapGetters, mapMutations, mapState } from "vuex";
import { EDIT_PIZZA, UPDATE_ENTITY } from "../../store/mutation-types";

export default {
  name: "BuilderPizzaView",
  data() {
    return {
      timeout: null,
      debouncedValue: this.name,
    };
  },
  computed: {
    ...mapState({
      sauce: (state) => state["Builder"].sauces.active.value,
      dough: (state) => state["Builder"].doughTypes.active.type,
      name: (state) => state["Builder"].name,
      price: (state) => state["Builder"].price,
    }),
    ...mapState("Cart", ["pizzas"]),
    modifier() {
      return `pizza--foundation--${this.dough === "large" ? "big" : "small"}-${
        this.sauce
      }`;
    },
    ...mapGetters("Builder", ["activeIngredients"]),
    inputValue: {
      get() {
        return this.name;
      },
      set(value) {
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
          this.debouncedValue = value;
          this.updateEntity({ entity: "name", value });
        }, 400);
      },
    },
  },
  components: { BuilderPizzaPrice, AppDrop },
  methods: {
    ...mapMutations("Builder", {
      updateEntity: UPDATE_ENTITY,
      editPizza: EDIT_PIZZA,
    }),
    ingredientsModifier(ingredient) {
      switch (ingredient.count) {
        case 1:
          return `pizza__filling--${ingredient.nameLat}`;
        case 2:
          return `pizza__filling--${ingredient.nameLat} pizza__filling--second`;
        case 3:
          return `pizza__filling--${ingredient.nameLat} pizza__filling--third`;
        default:
          return "";
      }
    },
  },
  created() {
    const id = this.$route.params.id;
    const pizza = this.pizzas.find((pizza) => pizza.id === id);
    pizza && this.editPizza(pizza);
  },
};
</script>
