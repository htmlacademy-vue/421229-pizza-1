<template>
  <div>
    <HistoryOrder
      v-for="order in historyOrders"
      :key="order.id"
      :order="order"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import HistoryOrder from "../modules/orders/HistoryOrder";

export default {
  name: "OrdersView",
  components: { HistoryOrder },
  computed: mapGetters("Orders", ["historyOrders"]),
  created() {
    this.$store.dispatch("Orders/getOrders");
  },
};
</script>
