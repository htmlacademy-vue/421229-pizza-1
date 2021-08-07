<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингридиенты</h2>

      <div class="sheet__content ingredients">
        <slot />

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="ingredient in ingredients"
              class="ingredients__item"
              :key="ingredient.id"
            >
              <AppDrag
                :transferData="ingredient"
                :draggable="(ingredient.count || 0) < 3"
              >
                <IngredientName :ingredient="ingredient" />
              </AppDrag>
              <IngredientCounter
                :ingredient="ingredient"
                @updateIngredient="updateIngredient"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IngredientCounter from "@/common/components/IngredientCounter.vue";
import IngredientName from "@/common/components/IngredientName.vue";
import AppDrag from "@/common/components/AppDrag";

export default {
  name: "BuilderIngredientsSelector",
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
  },
  components: { AppDrag, IngredientCounter, IngredientName },
  methods: {
    updateIngredient(ingredient) {
      this.$emit("updateIngredient", ingredient);
    },
  },
};
</script>
