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
                :draggable="ingredient.count < 3"
              >
                <IngredientName :ingredient="ingredient" />
              </AppDrag>
              <IngredientCounter :ingredient="ingredient" />
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
import { mapMutations, mapState } from "vuex";
import { UPDATE_ENTITY } from "../../store/mutation-types";

export default {
  name: "BuilderIngredientsSelector",
  computed: {
    ...mapState("Builder", ["ingredients"]),
  },
  components: { AppDrag, IngredientCounter, IngredientName },
  methods: {
    ...mapMutations("Builder", {
      updateEntity: UPDATE_ENTITY,
    }),
  },
};
</script>
