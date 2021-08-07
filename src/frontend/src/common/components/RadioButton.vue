<template>
  <label class="radio ingredients__input" :key="variant.value">
    <input
      type="radio"
      :name="name"
      :value="variant.value"
      :checked="isChecked"
      @change="$emit('onChange')"
    />
    <span>{{ variant.name }}</span>
  </label>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    variant: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
