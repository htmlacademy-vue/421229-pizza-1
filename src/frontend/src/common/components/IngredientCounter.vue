<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--disabled counter__button--minus"
      :disabled="count === 0"
      @click="changeCount(-1)"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="count" />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="count === 3"
      @click="changeCount(1)"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
import EventBus from "@/common/helpers/eventBus";

export default {
  name: "IngredientCounter",
  data() {
    return {
      count: this.ingredient.count || 0,
      dndTransferData: Object,
    };
  },
  props: {
    ingredient: {
      type: Object,
      required: true,
    },
  },
  methods: {
    changeCount(term) {
      if (term > 0 ? this.count > 2 : this.count < 1) {
        return;
      }
      this.count = this.count + term;
      this.$emit("updateIngredient", { ...this.ingredient, count: this.count });
    },
  },
  mounted() {
    EventBus.$on("dndTransferData", (transferData) => {
      transferData.id === this.ingredient.id && this.changeCount(1);
    });
  },
};
</script>
