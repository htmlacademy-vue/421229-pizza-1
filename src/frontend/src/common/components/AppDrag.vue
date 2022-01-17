<template>
  <div
    :draggable="draggable"
    @dragstart.self="onDragStart"
  >
    <slot />
  </div>
</template>
<script>
export default {
  name: "AppDrag",
  props: {
    transferData: {
      type: Object,
      required: true,
    },

    draggable: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    onDragStart({ dataTransfer }) {
      dataTransfer.setData("payload", JSON.stringify(this.transferData));
    },
  },
};
</script>
