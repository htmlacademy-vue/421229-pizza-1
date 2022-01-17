<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ {{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ orderSum }} ₽</span>
      </div>

      <div class="order__button">
        <button
          data-test="delete-button"
          type="button"
          class="button button--border"
          @click="deleteOrder(order.id)"
        >
          Удалить
        </button>
      </div>
      <div class="order__button">
        <button
          type="button"
          data-test="repeat-button"
          class="button"
          @click="goToRepeatOrder"
        >
          Повторить
        </button>
      </div>
    </div>

    <ul class="order__list">
      <li
        v-for="pizza in order.orderPizzas"
        :key="pizza.id"
        class="order__item"
      >
        <PizzaDescription :pizza="pizza" />

        <p class="order__price">
          <span v-if="pizza.quantity > 1">{{ pizza.quantity }}х</span>
          {{ pizza.price }} ₽
        </p>
      </li>
    </ul>

    <ul class="order__additional">
      <HistoryMiscItem
        v-for="misc in order.orderMisc"
        :key="misc.miscId"
        :misc="misc"
      />
    </ul>

    <p
      v-show="address"
      class="order__address"
    >
      {{ address }}
    </p>
  </section>
</template>
<script>
import PizzaDescription from "../../components/PizzaDescription";
import HistoryMiscItem from "./HistoryMiscItem";
import { mapActions } from "vuex";

export default {
  name: "HistoryOrder",
  components: { PizzaDescription, HistoryMiscItem },
  props: {
    order: {
      type: Object,
      required: true,
    },
  },

  computed: {
    orderSum() {
      return this.order.orderPizzas
        .concat(this.order.orderMisc)
        .reduce(
          (orderSum, { quantity, price }) => orderSum + quantity * price,
          0
        );
    },

    address() {
      const { name, street, building, flat } = this.order.orderAddress || {};
      const isNew = name === "Новый адрес";
      let formattedAddress = isNew ? "" : name;
      if (isNew) {
        const flatPart = flat ? `, кв. ${flat}` : "";
        const streetPart = street ? `улица ${street}` : "";
        const buildingPart = building ? `, дом ${building}` : "";
        formattedAddress = `${streetPart}${buildingPart}${flatPart}`;
      }
      return formattedAddress ? `Адрес доставки: ${formattedAddress}` : "";
    },
  },

  methods: {
    ...mapActions("Orders", ["deleteOrder", "repeatOrder"]),
    goToRepeatOrder() {
      this.repeatOrder(this.order);
      this.$router.push("/cart");
    },
  },
};
</script>
<style lang="scss">
@import "~@/assets/scss/mixins/mixins";
@import "~@/assets/scss/blocks/order";
</style>
