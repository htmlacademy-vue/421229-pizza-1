<template>
  <label
    :key="variant.value"
    class="radio ingredients__input"
  >
    <input
      type="radio"
      :name="name"
      :value="variant.value"
      :checked="checked"
      @change="$emit('onChange')"
    />
    <span>{{ variant.name }}</span>
  </label>
</template>

<script>
export default {
  name: "AppRadioButton",
  props: {
    variant: {
      type: Object,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    checked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss">
@import "~@/assets/scss/mixins/mixins";
@import "~@/assets/scss/blocks/radio";
</style>
