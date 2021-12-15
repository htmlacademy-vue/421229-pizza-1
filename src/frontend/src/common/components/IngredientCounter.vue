<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--disabled counter__button--minus"
      :disabled="ingredient.quantity === 0"
      @click="updateIngredientCount(-1)"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="ingredient.quantity"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="ingredient.quantity === 3"
      @click="updateIngredientCount(1)"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import {
  SET_DND_TRANSFER_DATA,
  UPDATE_INGREDIENT,
} from "../../store/mutation-types";

export default {
  name: "IngredientCounter",
  props: {
    ingredient: {
      type: Object,
      required: true,
    },
  },
  computed: mapState(["dndTransferData"]),
  methods: {
    ...mapMutations("Builder", { updateIngredient: UPDATE_INGREDIENT }),
    ...mapMutations({ setDndTransferData: SET_DND_TRANSFER_DATA }),
    updateIngredientCount(term) {
      if (
        term > 0 ? this.ingredient.quantity > 2 : this.ingredient.quantity < 1
      ) {
        return;
      }
      this.updateIngredient({
        ...this.ingredient,
        quantity: this.ingredient.quantity + term,
      });
    },
  },
  watch: {
    dndTransferData() {
      if (this.dndTransferData.id === this.ingredient.id) {
        this.updateIngredientCount(1);
        this.setDndTransferData();
      }
    },
  },
};
</script>
