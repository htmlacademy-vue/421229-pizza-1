import user from "@/static/user.json";
import { SET_ENTITY } from "../mutation-types";

const addressesMock = [
  {
    name: "Дом",
    street: "Первая",
    house: "211",
    apartment: "10",
    id: "5",
  },
  {
    name: "Адрес 2",
    street: "Вторая",
    house: "56",
    apartment: "3",
    id: "6",
  },
];

const actions = {
  async init({ dispatch }) {
    dispatch("fetchAddresses");
  },
  fetchAddresses({ commit }, addresses = addressesMock) {
    commit(SET_ENTITY, {
      entity: "addresses",
      value: addresses,
    });
  },
};

const mutations = {
  [SET_ENTITY](state, { entity, value }) {
    state[entity] = value;
  },
};

export default {
  namespaced: true,
  state: {
    user,
    addresses: [],
  },
  actions,
  mutations,
};
