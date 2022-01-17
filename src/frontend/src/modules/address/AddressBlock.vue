<template>
  <div>
    <AddressItem
      v-for="(addressItem, index) in addresses"
      :key="addressItem.id"
      :address="addressItem"
      :index="index"
      :is-edited="address.id === addressItem.id"
      :change-value="changeValue"
      @edit-address="editAddress"
      @close-form="closeForm"
    />
    <AddressForm
      v-if="showForm"
      :address="address"
      :address-count="addressCount"
      @change-value="changeValue"
      @close-form="closeForm"
    />
    <div class="layout__button">
      <button
        type="button"
        data-test="add-new-address"
        class="button button--border"
        @click="addNewAddress"
      >
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>
<script>
import AddressItem from "./AddressItem";
import AddressForm from "./AddressForm";
import { mapState } from "vuex";

export const getDefaultAddress = () => ({
  name: "",
  street: "",
  building: "",
  flat: "",
  comment: "",
  id: null,
});

export default {
  components: { AddressForm, AddressItem },
  data() {
    return {
      address: getDefaultAddress(),
      showForm: false,
    };
  },

  computed: {
    ...mapState("Addresses", ["addresses"]),
    addressCount() {
      return this.addresses.length;
    },
  },

  methods: {
    addNewAddress() {
      this.showForm = true;
      this.address = getDefaultAddress();
    },

    editAddress(id) {
      this.showForm = false;
      this.address = this.addresses.find((address) => address.id === id);
    },

    changeValue(subject) {
      const key = Object.keys(subject)[0];
      this.address[key] = subject[key];
    },

    closeForm() {
      this.showForm = false;
      this.address = getDefaultAddress();
    },
  },
};
</script>
<style lang="scss">
@import "~@/assets/scss/blocks/button";
</style>
