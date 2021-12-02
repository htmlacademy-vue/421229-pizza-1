import {
  UPDATE_ENTITY,
  SET_ENTITY,
  SET_PIZZA,
  RESET_CART,
} from "../mutation-types";
import { formatMisc } from "../../common/helpers/formatMisc";
import misc from "@/static/misc.json";

const actions = {
  async init({ dispatch }) {
    dispatch("fetchMisc");
  },
  fetchMisc({ commit }) {
    commit(SET_ENTITY, {
      entity: "misc",
      value: formatMisc(misc),
    });
  },
  setPizza({ commit, rootGetters }) {
    commit(SET_PIZZA, rootGetters["Builder/createdPizza"]);
  },
  resetCart({ commit }) {
    commit(RESET_CART);
  },
};

const getters = {
  totalSum: ({ misc, pizzas }) => {
    return pizzas.length
      ? pizzas
          .concat(misc)
          .reduce((sum, current) => sum + current.price * current.count, 0)
      : 0;
  },
};

const getInitialState = () => ({
  pizzas: [],
  misc: [],
  sum: 0,
});

const mutations = {
  [SET_ENTITY](state, { entity, value }) {
    state[entity] = value;
  },
  [SET_PIZZA](state, pizza) {
    const index = state.pizzas.findIndex(
      (statePizza) => statePizza.id === pizza.id
    );
    if (~index) {
      state.pizzas = [
        ...state.pizzas.slice(0, index),
        pizza,
        ...state.pizzas.slice(index + 1),
      ];
    } else {
      state.pizzas.push(pizza);
    }
  },
  [UPDATE_ENTITY](state, { entity, value, term }) {
    const count = value.count + term;

    if (count <= 0) {
      state[entity] = state[entity].filter(
        (stateValue) => stateValue.id !== value.id
      );
    } else {
      state[entity] = state[entity].map((stateValue) => {
        return stateValue.id === value.id
          ? { ...value, count: value.count + term }
          : stateValue;
      });
    }
  },
  [RESET_CART](state) {
    Object.assign(state, getInitialState());
  },
};

export default {
  namespaced: true,
  state: getInitialState(),
  mutations,
  getters,
  actions,
};
