<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        :value="pizza.name"
        @input="setValue"
      />
    </label>

    <div class="content__constructor">
      <div class="pizza" :class="modifier">
        <AppDrop>
          <div class="pizza__wrapper">
            <transition-group name="drop" tag="div">
              <div
                v-for="ingredient in activeIngredients"
                :key="ingredient.id"
                class="pizza__filling"
                :class="ingredientsModifier(ingredient)"
              ></div>
            </transition-group>
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
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { UPDATE_ENTITY } from "../../store/mutation-types";

export default {
  name: "BuilderPizzaView",
  data() {
    return {
      timeout: null,
      debouncedValue: "",
    };
  },
  computed: {
    ...mapState("Cart", ["pizzas"]),
    ...mapState(["ingredients"]),
    ...mapGetters("Builder", [
      "activeIngredients",
      "getFullPizza",
      "pizza",
      "activeSauce",
      "activeDough",
    ]),
    modifier() {
      return `pizza--foundation--${
        this.activeDough?.type === "large" ? "big" : "small"
      }-${this.activeSauce?.value}`;
    },
  },
  components: { BuilderPizzaPrice, AppDrop },
  methods: {
    ...mapMutations("Builder", { updateEntity: UPDATE_ENTITY }),
    ...mapActions("Builder", ["editPizza"]),
    ingredientsModifier(activeIngredient) {
      const ingredient = this.ingredients[activeIngredient.id];
      switch (activeIngredient.quantity) {
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
    setValue($event) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.debouncedValue = $event.target.value;
        this.updateEntity({ entity: "name", value: this.debouncedValue });
      }, 400);
    },
  },
  created() {
    const id = this.$route.params.id;
    const pizza = this.pizzas.find((pizza) => +pizza.id === +id);
    pizza && this.editPizza(pizza);
  },
};
</script>
<style lang="scss">
.drop-enter-active {
  transition: transform 400ms;
}
.drop-enter {
  transform: scale(1.3);
}
.drop-enter-to {
  transform: scale(1);
}
</style>
