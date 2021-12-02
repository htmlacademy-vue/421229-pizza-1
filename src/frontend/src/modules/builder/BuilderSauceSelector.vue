<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <RadioButton
      v-for="sauce in sauces"
      name="sauce"
      :variant="sauce"
      :key="sauce.value"
      :isChecked="sauce.name === active.name"
      @onChange="updateEntity({ entity: 'sauces', value: sauce })"
    />
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton.vue";
import { mapMutations, mapState } from "vuex";
import { UPDATE_ENTITY } from "../../store/mutation-types";

export default {
  name: "BuilderSauceSelector",
  components: { RadioButton },
  computed: {
    ...mapState({
      sauces: (state) => state["Builder"].sauces.list,
      active: (state) => state["Builder"].sauces.active,
    }),
  },
  methods: {
    ...mapMutations("Builder", {
      updateEntity: UPDATE_ENTITY,
    }),
  },
};
</script>
