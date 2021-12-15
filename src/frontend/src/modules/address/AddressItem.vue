<template>
  <div class="layout__address">
    <AddressForm
      v-if="isEdited"
      :isEdited="isEdited"
      :address="address"
      :addressCount="index"
      @changeValue="changeValue"
      @closeForm="$emit('closeForm')"
    />
    <div v-else class="sheet address-form">
      <div class="address-form__header">
        <b>Адрес {{ index + 1 }}. {{ address.name }}</b>
        <div class="address-form__edit">
          <button
            type="button"
            class="icon"
            @click="$emit('editAddress', address.id)"
          >
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>
      <p>{{ formattedAddress }}</p>
      <small>{{ address.comment }}</small>
    </div>
  </div>
</template>
<script>
import AddressForm from "./AddressForm";

export default {
  name: "AddressItem",
  components: { AddressForm },
  props: {
    address: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    changeValue: {
      type: Function,
      required: false,
    },
  },
  computed: {
    formattedAddress() {
      const { flat, street, building } = this.address;
      const flatPart = flat ? `, кв. ${flat}` : "";
      return `${street} ул., д. ${building}${flatPart}`;
    },
  },
};
</script>
