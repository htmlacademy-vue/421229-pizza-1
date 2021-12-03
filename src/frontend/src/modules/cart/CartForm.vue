<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select
          v-model="orderReceiptType"
          name="orderReceiptType"
          class="select"
        >
          <option value="1">Заберу сам</option>
          <option value="2">Новый адрес</option>
          <option
            v-for="address in addresses"
            :value="address.id"
            :key="address.id"
          >
            {{ address.name }}
          </option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          type="text"
          name="tel"
          placeholder="+7 999-999-99-99"
          :value="userPhone"
        />
      </label>

      <div v-show="orderReceiptType !== '1'" class="cart-form__address">
        <span class="cart-form__label">
          {{ selectedAddress.name || "Новый адрес" }}
        </span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input type="text" name="street" :value="selectedAddress.street" />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input type="text" name="house" :value="selectedAddress.house" />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input
              type="text"
              name="apartment"
              :value="selectedAddress.apartment"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "HeaderLayout",
  data() {
    return {
      orderReceiptType: "1",
    };
  },
  computed: {
    ...mapState("User", ["user", "addresses"]),
    userPhone() {
      return this.user?.phone || "";
    },
    selectedAddress() {
      return (
        this.addresses.find(({ id }) => id === this.orderReceiptType) || {}
      );
    },
  },
  created() {
    this.$store.dispatch("User/init");
  },
};
</script>
