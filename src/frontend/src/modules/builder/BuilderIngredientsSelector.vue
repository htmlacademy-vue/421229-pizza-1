<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингридиенты</h2>

      <div class="sheet__content ingredients">
        <slot />

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <BuilderIngredient
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              :ingredient="ingredient"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BuilderIngredient from "@/modules/builder/BuilderIngredient.vue";
import { mapGetters } from "vuex";

export default {
  name: "BuilderIngredientsSelector",
  components: { BuilderIngredient },
  computed: mapGetters(["ingredients"]),
};
</script>
<style lang="scss">
@import "~@/assets/scss/mixins/mixins";
@import "~@/assets/scss/blocks/ingredients";
</style>
