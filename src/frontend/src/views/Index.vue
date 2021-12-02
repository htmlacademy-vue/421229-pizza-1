<template>
  <form action="#" method="post">
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
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import BuilderDoughSelector from "@/modules/builder/BuilderDoughSelector.vue";
import BuilderSizeSelector from "@/modules/builder/BuilderSizeSelector.vue";
import BuilderIngredientsSelector from "@/modules/builder/BuilderIngredientsSelector.vue";
import BuilderPizzaView from "@/modules/builder/BuilderPizzaView.vue";
import BuilderSauceSelector from "@/modules/builder/BuilderSauceSelector.vue";
import { UPDATE_ENTITY } from "../store/mutation-types";

export default {
  name: "IndexHome",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderSauceSelector,
  },
  computed: mapState(["Builder"]),
  methods: {
    ...mapMutations("Builder", {
      updateEntity: UPDATE_ENTITY,
    }),
  },
  created() {
    this.$store.dispatch("Builder/init");
  },
};
</script>

<style lang="scss"></style>
