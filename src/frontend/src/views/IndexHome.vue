<template>
  <form
    action="#"
    method="post"
  >
    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>
      <BuilderDoughSelector />
      <BuilderSizeSelector />
      <BuilderIngredientsSelector>
        <BuilderSauceSelector />
      </BuilderIngredientsSelector>
      <BuilderPizzaView />
    </div>
  </form>
</template>

<script>
import BuilderDoughSelector from "@/modules/builder/BuilderDoughSelector.vue";
import BuilderSizeSelector from "@/modules/builder/BuilderSizeSelector.vue";
import BuilderIngredientsSelector from "@/modules/builder/BuilderIngredientsSelector.vue";
import BuilderPizzaView from "@/modules/builder/BuilderPizzaView.vue";
import BuilderSauceSelector from "@/modules/builder/BuilderSauceSelector.vue";

export default {
  name: "IndexHome",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderSauceSelector,
  },
};
</script>

<style lang="scss"></style>
