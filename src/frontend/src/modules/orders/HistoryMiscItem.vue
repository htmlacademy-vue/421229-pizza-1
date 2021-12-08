<template>
  <li>
    <img :src="misc.image" width="20" height="30" :alt="misc.name" />
    <p>
      <span>{{ misc.name }}</span>
      <b>{{ sum }} ₽</b>
    </p>
  </li>
</template>
<script>
export default {
  name: "HistoryMiscItem",
  props: {
    misc: {
      type: Object,
      required: true,
    },
  },
  computed: {
    sum() {
      return this.misc.quantity * this.misc.price;
    },
  },
};
</script>
