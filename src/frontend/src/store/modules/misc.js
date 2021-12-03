import { SET_ENTITY } from "../mutation-types";
import misc from "@/static/misc.json";
import { formatMisc } from "../../common/helpers/formatMisc";

const actions = {
  async init({ dispatch }) {
    dispatch("fetchMisc");
  },
  fetchMisc({ commit }) {
    commit(SET_ENTITY, {
      module: null,
      entity: "misc",
      value: formatMisc(misc),
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
    misc: [],
  },
  mutations,
  actions,
};
