<template>
  <div>
    <AddressItem
      v-for="(addressItem, index) in addresses"
      :key="addressItem.id"
      :address="addressItem"
      :index="index"
      :isEdited="address.id === addressItem.id"
      :changeValue="changeValue"
      @editAddress="editAddress"
      @closeForm="closeForm"
    />
    <AddressForm
      v-if="showForm"
      :address="address"
      :addressCount="addressCount"
      @changeValue="changeValue"
      @closeForm="closeForm"
    />
    <div class="layout__button">
      <button
        type="button"
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

const getDefaultAddress = () => ({
  name: "",
  street: "",
  building: "",
  flat: "",
  comment: "",
  id: null,
});

export default {
  data() {
    return {
      address: getDefaultAddress(),
      showForm: false,
    };
  },
  components: { AddressForm, AddressItem },
  computed: {
    ...mapState("Addresses", ["addresses"]),
    addressCount() {
      return this.addresses.length;
    },
  },
  methods: {
    addNewAddress() {
      this.showForm = true;
      this.address = {
        name: "",
        street: "",
        building: "",
        flat: "",
        comment: "",
        id: null,
      };
    },
    editAddress(id) {
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
