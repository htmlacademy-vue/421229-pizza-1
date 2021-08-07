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
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              class="pizza__filling"
              :class="ingredientsModifier(ingredient)"
            ></div>
          </div>
        </AppDrop>
      </div>
    </div>

    <BuilderPizzaPrice :price="price" :disabled="disabledToCartAdd" />
  </div>
</template>

<script>
import BuilderPizzaPrice from "@/modules/builder/BuilderPizzaPrice.vue";
import AppDrop from "@/common/components/AppDrop.vue";

export default {
  name: "BuilderPizzaView",
  data() {
    return {
      timeout: null,
      debouncedValue: this.name,
    };
  },
  props: {
    price: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "large",
    },
    sauce: {
      type: String,
      default: "tomato",
    },
    ingredients: {
      type: Array,
      default: Array,
    },
  },
  components: { BuilderPizzaPrice, AppDrop },
  computed: {
    modifier() {
      return `pizza--foundation--${this.size === "large" ? "big" : "small"}-${
        this.sauce
      }`;
    },
    inputValue: {
      get() {
        return this.debouncedValue;
      },
      set(value) {
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
          this.debouncedValue = value;
          this.$emit("setPizzaName", value);
        }, 400);
      },
    },
    disabledToCartAdd() {
      return !(this.debouncedValue && this.ingredients.length);
    },
  },
  methods: {
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
};
</script>
