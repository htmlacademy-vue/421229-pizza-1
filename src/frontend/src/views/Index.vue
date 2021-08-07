<template>
  <div>
    <HeaderLayout :price="computedPrice" />
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>
          <BuilderDoughSelector
            :doughTypes="formattedDoughTypes"
            :active="doughTypes.active"
            @setActiveDough="setActiveDough"
          />
          <BuilderSizeSelector
            :sizes="formattedSizes"
            :active="sizes.active"
            @setActiveSize="setActiveSize"
          />
          <BuilderIngredientsSelector
            :ingredients="formattedIngredients"
            @updateIngredient="updateIngredient"
          >
            <BuilderSauceSelector
              :sauces="formattedSauces"
              :active="sauces.active"
              @setActiveSauce="setActiveSauce"
            />
          </BuilderIngredientsSelector>
          <BuilderPizzaView
            :price="computedPrice"
            :size="doughTypes.active.type"
            :sauce="sauces.active.value"
            :ingredients="activeIngredients"
            @setPizzaName="setPizzaName"
          />
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import { dough, sizes, ingredients, sauces } from "@/static/pizza.json";
import { addDoughTypes } from "@/common/helpers/addDoughTypes";
import { addSizeTypes } from "@/common/helpers/addSizeTypes";
import { addIngredientLatNames } from "@/common/helpers/addIngredientLatNames";
import { addSauceValues } from "@/common/helpers/addSauceValues";
import BuilderDoughSelector from "@/modules/builder/BuilderDoughSelector.vue";
import BuilderSizeSelector from "@/modules/builder/BuilderSizeSelector.vue";
import BuilderIngredientsSelector from "@/modules/builder/BuilderIngredientsSelector.vue";
import BuilderPizzaView from "@/modules/builder/BuilderPizzaView.vue";
import BuilderSauceSelector from "@/modules/builder/BuilderSauceSelector.vue";
import HeaderLayout from "@/layouts/HeaderLayout.vue";

export default {
  name: "IndexHome",
  data() {
    return {
      doughTypes: {
        list: dough,
        active: dough[0],
      },
      sizes: {
        list: sizes,
        active: sizes[0],
      },
      ingredients: ingredients,
      sauces: {
        list: sauces,
        active: sauces[0],
      },
      price: 0,
      name: "",
    };
  },
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    HeaderLayout,
    BuilderSauceSelector,
  },
  computed: {
    formattedDoughTypes() {
      return addDoughTypes(this.doughTypes.list);
    },
    formattedSizes() {
      return addSizeTypes(this.sizes.list);
    },
    formattedIngredients() {
      return addIngredientLatNames(this.ingredients);
    },
    activeIngredients() {
      return this.formattedIngredients.filter(({ count }) => count);
    },
    formattedSauces() {
      return addSauceValues(this.sauces.list);
    },
    computedPrice() {
      const ingredientsSum = this.activeIngredients.reduce((sum, current) => {
        return sum + current.count * current.price;
      }, 0);
      return (
        (this.doughTypes.active.price +
          this.sauces.active.price +
          ingredientsSum) *
        this.sizes.active.multiplier
      );
    },
  },
  methods: {
    setActiveDough(activeDough) {
      this.doughTypes.active = activeDough;
    },
    setActiveSauce(activeSauce) {
      this.sauces.active = activeSauce;
    },
    setActiveSize(activeSize) {
      this.sizes.active = activeSize;
    },
    setPizzaName(name) {
      this.name = name;
    },
    updateIngredient(ingredient) {
      const index = this.ingredients.findIndex(
        (current) => current.id === ingredient.id
      );
      this.$set(this.ingredients, index, ingredient);
    },
  },
  created() {
    this.doughTypes.active = this.formattedDoughTypes[0];
    this.sizes.active = this.formattedSizes[0];
    this.sauces.active = this.formattedSauces[0];
  },
};
</script>

<style lang="scss"></style>
