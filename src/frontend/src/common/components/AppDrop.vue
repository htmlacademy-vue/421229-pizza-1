<template>
  <div @drop.stop="onDrop" @dragover.prevent @dragenter.prevent>
    <slot />
  </div>
</template>
<script>
import EventBus from "@/common/helpers/eventBus";

export default {
  name: "AppDrop",
  methods: {
    onDrop({ dataTransfer }) {
      const payload = dataTransfer.getData("payload");
      if (payload) {
        const transferData = JSON.parse(dataTransfer.getData("payload"));
        EventBus.$emit("dndTransferData", transferData);
      }
    },
  },
};
</script>
