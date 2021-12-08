<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <RadioButton
      v-for="sauce in sauces"
      name="sauce"
      :variant="sauce"
      :key="sauce.value"
      :isChecked="sauce.id === activeSauce.id"
      @onChange="updateSauce(sauce.id)"
    />
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton.vue";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "BuilderSauceSelector",
  components: { RadioButton },
  computed: {
    ...mapState({ sauces: (state) => state.sauce.list }),
    ...mapGetters("Builder", ["activeSauce"]),
  },
  methods: { ...mapActions("Builder", ["updateSauce"]) },
};
</script>
