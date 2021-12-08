import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";
import {
  SET_DND_TRANSFER_DATA,
  SET_ENTITY,
  UPDATE_COUNT,
  UPDATE_ALL_MISC,
  UPDATE_ENTITY,
  DELETE_ENTITY,
} from "./mutation-types";
import VuexPlugins from "../plugins/vuexPlugins";
import { getIdToItemMap } from "../common/utils/getIdToItemMap";

Vue.use(Vuex);

const actions = {
  async init({ dispatch }) {
    dispatch("fetchMisc");
    dispatch("fetchDough");
    dispatch("fetchSizes");
    dispatch("fetchIngredients");
    dispatch("fetchSauces");
  },
  async fetchDough({ commit, dispatch }) {
    const list = await this.$api.dough.getList();
    const map = getIdToItemMap(list);

    commit(SET_ENTITY, {
      entity: "dough",
      value: { list, map },
    });
    dispatch("Builder/updateDough", list[0].id);
  },
  async fetchSizes({ commit, dispatch }) {
    const list = await this.$api.sizes.getList();
    const map = getIdToItemMap(list);

    commit(SET_ENTITY, {
      entity: "sizes",
      value: { list, map },
    });
    dispatch("Builder/updateSize", list[0].id);
  },
  async fetchIngredients({ commit }) {
    const ingredients = await this.$api.ingredients.getList();

    commit(SET_ENTITY, {
      entity: "ingredients",
      value: getIdToItemMap(ingredients),
    });
  },
  async fetchSauces({ commit, dispatch }) {
    const list = await this.$api.sauces.getList();
    const map = getIdToItemMap(list);

    commit(SET_ENTITY, {
      entity: "sauce",
      value: { list, map },
    });
    dispatch("Builder/updateSauce", list[0].id);
  },
  async fetchMisc({ commit }) {
    const value = await this.$api.misc.getList();

    commit(SET_ENTITY, {
      entity: "misc",
      value,
    });
  },
};

const mutations = {
  [SET_DND_TRANSFER_DATA](state, transferData) {
    state.dndTransferData = transferData || {};
  },
  [SET_ENTITY](state, { module, entity, value }) {
    const { list, map } = value || {};
    if (list && map) {
      (module ? state[module] : state)[entity].list = list;
      (module ? state[module] : state)[entity].map = map;
    } else {
      (module ? state[module] : state)[entity] = value;
    }
  },
  [DELETE_ENTITY](state, { entity, module, entityId }) {
    (module ? state[module] : state)[entity] = (module ? state[module] : state)[
      entity
    ].filter(({ id }) => id !== entityId);
  },
  [UPDATE_ENTITY](state, { entity, module, value }) {
    const path = module ? state[module] : state;
    (module ? state[module] : state)[entity] = path[entity].map((item) =>
      item.id === value.id ? value : item
    );
  },
  [UPDATE_COUNT](state, { entity, module = "", value, term }) {
    const quantity = value.quantity + term;
    const stateValues = module ? state[module][entity] : state[entity];

    if (quantity <= 0) {
      (module ? state[module] : state)[entity] = stateValues.filter(
        (stateValue) => stateValue.id !== value.id
      );
    } else {
      (module ? state[module] : state)[entity] = stateValues.map(
        (stateValue) => {
          return stateValue.id === value.id
            ? { ...value, quantity: value.quantity + term }
            : stateValue;
        }
      );
    }
  },
  [UPDATE_ALL_MISC](state, { values }) {
    state.misc = state.misc.map((miscItem) => {
      const toUpdate = values.find((value) => value.miscId === miscItem.id);
      return toUpdate ? { ...miscItem, quantity: toUpdate.quantity } : miscItem;
    });
  },
};

const getters = {
  ingredients: ({ ingredients }) => Object.values(ingredients),
};

export default new Vuex.Store({
  state: {
    dndTransferData: {},
    sauce: {
      list: [],
      map: {},
    },
    ingredients: {},
    sizes: {
      list: [],
      map: {},
    },
    dough: {
      list: [],
      map: {},
    },
    misc: [],
  },
  plugins: [VuexPlugins],
  getters,
  mutations,
  actions,
  modules,
});
