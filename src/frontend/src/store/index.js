import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";
import { SET_DND_TRANSFER_DATA } from "./mutation-types";

Vue.use(Vuex);

const mutations = {
  [SET_DND_TRANSFER_DATA](state, transferData) {
    state.dndTransferData = transferData || {};
  },
};

export default new Vuex.Store({
  state: {
    dndTransferData: {},
  },
  getters: {},
  mutations,
  actions: {},
  modules,
});
