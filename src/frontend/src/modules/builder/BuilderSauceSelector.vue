<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <AppRadioButton
      v-for="sauce in sauces"
      :key="sauce.value"
      name="sauce"
      :variant="sauce"
      :checked="sauce.id === activeSauce.id"
      @onChange="updateSauce(sauce.id)"
    />
  </div>
</template>

<script>
import AppRadioButton from "@/common/components/AppRadioButton.vue";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "BuilderSauceSelector",
  components: { AppRadioButton },
  computed: {
    ...mapState({ sauces: (state) => state.sauce.list }),
    ...mapGetters("Builder", ["activeSauce"]),
  },

  methods: { ...mapActions("Builder", ["updateSauce"]) },
};
</script>
