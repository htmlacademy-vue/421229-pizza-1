<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <RadioButton
      v-for="sauce in sauces"
      name="sauce"
      :variant="sauce"
      :key="sauce.value"
      :isChecked="sauce.name === active.name"
      @onChange="$emit('setActiveSauce', sauce)"
    />
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton.vue";
export default {
  name: "BuilderSauceSelector",
  components: { RadioButton },
  props: {
    sauces: {
      type: Array,
      required: true,
    },
    active: {
      type: Object,
      required: false,
    },
  },
};
</script>
