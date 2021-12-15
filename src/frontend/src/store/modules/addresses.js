import {
  SET_ENTITY,
  UPDATE_ADDRESS_FIELD,
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
} from "../mutation-types";

const addressFormInitialState = () => ({
  name: "Новый адрес",
  street: "",
  building: "",
  flat: "",
  id: null,
});

const actions = {
  async fetchAddresses({ commit, rootState }) {
    if (!rootState.User.user) {
      return;
    }
    const addresses = await this.$api.addresses.getList();

    commit(
      SET_ENTITY,
      {
        entity: "addresses",
        module: "Addresses",
        value: addresses,
      },
      { root: true }
    );
  },
  async postAddress({ commit, rootState }, address) {
    const createdAddress = await this.$api.addresses.post({
      ...address,
      userId: rootState.User.user.id,
    });

    commit(ADD_ENTITY, {
      entity: "addresses",
      value: createdAddress,
    });
  },
  setReceiptType({ commit, state, dispatch }, type) {
    commit(
      SET_ENTITY,
      {
        entity: "orderReceiptType",
        module: "Addresses",
        value: type || "pickup",
      },
      { root: true }
    );
    if (!type || type === "newAddress" || type === "pickup") {
      dispatch("resetAddressForm");
      return;
    }
    const existingAddress = state.addresses.find(({ id }) => +id === +type);
    if (existingAddress) {
      commit(
        SET_ENTITY,
        {
          entity: "addressForm",
          module: "Addresses",
          value: existingAddress,
        },
        { root: true }
      );
    }
  },
  resetAddressForm({ commit }) {
    commit(
      SET_ENTITY,
      {
        entity: "addressForm",
        module: "Addresses",
        value: addressFormInitialState(),
      },
      { root: true }
    );
  },
  async updateAddress({ commit, rootState }, address) {
    await this.$api.addresses.put({
      ...address,
      userId: rootState.User.user.id,
    });

    commit(
      UPDATE_ENTITY,
      {
        entity: "addresses",
        module: "Addresses",
        value: address,
      },
      { root: true }
    );
  },
  async deleteAddress({ commit }, addressId) {
    await this.$api.addresses.delete(addressId);

    commit(
      DELETE_ENTITY,
      {
        entity: "addresses",
        module: "Addresses",
        entityId: addressId,
      },
      { root: true }
    );
  },
};

const mutations = {
  [SET_ENTITY](state, { entity, value }) {
    state[entity] = value;
  },
  [ADD_ENTITY](state, { entity, value }) {
    state[entity] = [...state[entity], value];
  },
  [UPDATE_ADDRESS_FIELD](state, { field, value }) {
    state.addressForm = {
      ...state.addressForm,
      [field]: value,
    };
  },
};

export default {
  namespaced: true,
  state: {
    addresses: [],
    addressForm: addressFormInitialState(),
    orderReceiptType: "pickup",
  },
  actions,
  mutations,
};
