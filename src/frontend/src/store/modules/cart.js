import { SET_ENTITY, SET_PIZZA, RESET_CART, UPDATE_COUNT } from "../mutation-types";

const actions = {
  setPizza({ commit, rootGetters }) {
    commit(SET_PIZZA, rootGetters["Builder/createdPizza"]);
  },
  resetCart({ commit }) {
    commit(RESET_CART);
  },
  changeCount({ commit }, { pizza, term }) {
    commit(
      UPDATE_COUNT,
      {
        entity: "pizzas",
        module: "Cart",
        value: pizza,
        term,
      },
      { root: true }
    );
  },
};

const getters = {
  totalSum: ({ pizzas }, getters, rootState) =>
    pizzas.length
      ? pizzas
          .concat(rootState.misc)
          .reduce((sum, current) => sum + current.price * current.quantity, 0)
      : 0,
  getOrderCart: ({ pizzas }, getters, rootState) => ({
    misc: rootState.misc,
    pizzas,
  }),
};

const getInitialState = () => ({
  pizzas: [],
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
