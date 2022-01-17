<template>
  <div>
    <div class="layout__address">
      <form
        class="address-form address-form--opened sheet"
        @submit.prevent="saveAddress"
      >
        <div class="address-form__header">
          <b>Адрес №{{ addressNumber }}</b>
        </div>

        <div class="address-form__wrapper">
          <div class="address-form__input">
            <label class="input">
              <span>Название адреса*</span>
              <input
                type="text"
                name="addr-name"
                placeholder="Введите название адреса"
                :value="address.name"
                required
                @input="$emit('change-value', { name: $event.target.value })"
              />
            </label>
          </div>
          <div class="address-form__input address-form__input--size--normal">
            <label class="input">
              <span>Улица*</span>
              <input
                type="text"
                name="addr-street"
                placeholder="Введите название улицы"
                :value="address.street"
                required
                @input="$emit('change-value', { street: $event.target.value })"
              />
            </label>
          </div>
          <div class="address-form__input address-form__input--size--small">
            <label class="input">
              <span>Дом*</span>
              <input
                type="text"
                name="addr-house"
                placeholder="Введите номер дома"
                :value="address.building"
                required
                @input="
                  $emit('change-value', { building: $event.target.value })
                "
              />
            </label>
          </div>
          <div class="address-form__input address-form__input--size--small">
            <label class="input">
              <span>Квартира</span>
              <input
                type="text"
                name="addr-apartment"
                placeholder="Введите № квартиры"
                :value="address.flat"
                @input="$emit('change-value', { flat: $event.target.value })"
              />
            </label>
          </div>
          <div class="address-form__input">
            <label class="input">
              <span>Комментарий</span>
              <input
                type="text"
                name="addr-comment"
                placeholder="Введите комментарий"
                :value="address.comment"
                @input="$emit('change-value', { comment: $event.target.value })"
              />
            </label>
          </div>
        </div>

        <div class="address-form__buttons">
          <button
            v-if="isEdited"
            data-test="delete-button"
            type="button"
            class="button button--transparent"
            @click="removeAddress"
          >
            Удалить
          </button>
          <button
            type="submit"
            class="button"
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "AddressForm",
  props: {
    addressCount: {
      type: Number,
      default: 0,
    },

    address: {
      type: Object,
      required: true,
    },

    isEdited: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    addressNumber() {
      return this.addressCount + 1;
    },
  },

  methods: {
    ...mapActions("Addresses", [
      "postAddress",
      "updateAddress",
      "deleteAddress",
    ]),

    saveAddress($event) {
      const target = $event.target;
      if (!target.checkValidity()) {
        return target.reportValidity();
      }
      const address = {
        name: this.address.name,
        comment: this.address.comment,
        flat: this.address.flat,
        building: this.address.building,
        street: this.address.street,
        id: this.address.id,
      };
      this.$emit("close-form");
      this.isEdited ? this.updateAddress(address) : this.postAddress(address);
    },

    removeAddress() {
      this.$emit("close-form");
      this.deleteAddress(this.address.id);
    },
  },
};
</script>
<style lang="scss">
@import "~@/assets/scss/mixins/mixins";
@import "~@/assets/scss/blocks/address-form";
@import "~@/assets/scss/blocks/input";
@import "~@/assets/scss/blocks/button";
@import "~@/assets/scss/blocks/icon";
@import "~@/assets/scss/layout/sheet";
</style>
