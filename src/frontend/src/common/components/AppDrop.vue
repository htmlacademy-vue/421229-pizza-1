<template>
  <div
    @drop.stop="onDrop"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import { SET_DND_TRANSFER_DATA } from "../../store/mutation-types";

export default {
  name: "AppDrop",
  methods: {
    ...mapMutations({
      setDndTransferData: SET_DND_TRANSFER_DATA,
    }),

    onDrop({ dataTransfer }) {
      const payload = dataTransfer.getData("payload");
      if (payload) {
        const transferData = JSON.parse(dataTransfer.getData("payload"));
        this.setDndTransferData(transferData);
      }
    },
  },
};
</script>
