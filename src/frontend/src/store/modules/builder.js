import {
  SET_ENTITY,
  UPDATE_ENTITY,
  UPDATE_INGREDIENT,
  EDIT_PIZZA,
} from "@/store/mutation-types";
import { uniqueId } from "lodash";

const actions = {
  editPizza({ commit }, pizza) {
    commit(EDIT_PIZZA, { pizza });
  },
  updateDough({ commit }, doughId) {
    commit(UPDATE_ENTITY, { entity: "doughId", value: doughId });
  },
  updateSize({ commit }, sizeId) {
    commit(UPDATE_ENTITY, { entity: "sizeId", value: sizeId });
  },
  updateSauce({ commit }, sauceId) {
    commit(UPDATE_ENTITY, { entity: "sauceId", value: sauceId });
  },
  resetPizza({ commit, rootState }) {
    commit(
      SET_ENTITY,
      {
        entity: "pizza",
        module: "Builder",
        value: {
          doughId: rootState["dough"].list[0].id,
          name: "",
          ingredients: [],
          sizeId: rootState["sizes"].list[0].id,
          sauceId: rootState["sauce"].list[0].id,
          price: 0,
          id: "",
          quantity: 1,
        },
      },
      {
        root: true,
      }
    );
  },
};

const mutations = {
  [UPDATE_ENTITY](state, { entity, value }) {
    state.pizza[entity] = value;
  },
  [UPDATE_INGREDIENT](state, ingredient) {
    const index = state.pizza.ingredients.findIndex(
      (stateIngredient) => stateIngredient.id === ingredient.id
    );
    if (~index) {
      state.pizza.ingredients = [
        ...state.pizza.ingredients.slice(0, index),
        ingredient,
        ...state.pizza.ingredients.slice(index + 1),
      ];
    } else {
      state.pizza.ingredients.push(ingredient);
    }
  },
  [EDIT_PIZZA](state, { pizza }) {
    state.pizza = Object.assign({}, state.pizza, pizza);
  },
};

const getters = {
  activeSize: ({ pizza }, getters, rootState) =>
    rootState["sizes"].map[pizza.sizeId] || {},
  activeDough: ({ pizza }, getters, rootState) =>
    rootState["dough"].map[pizza.doughId] || {},
  activeSauce: ({ pizza }, getters, rootState) =>
    rootState["sauce"].map[pizza.sauceId] || {},
  pizza: ({ pizza }) => pizza,
  activeIngredients: ({ pizza }) => pizza.ingredients,
  createdPizza: (state, getters) => ({
    name: state.pizza.name,
    price: getters.totalPrice,
    ingredients: getters.activeIngredients,
    doughId: state.pizza.doughId,
    sizeId: state.pizza.sizeId,
    sauceId: state.pizza.sauceId,
    quantity: state.pizza.quantity,
    id: state.pizza.id || uniqueId(),
  }),
  ingredientsSum: (state, getters, rootState) => (pizza) => {
    return pizza.ingredients.reduce((sum, current) => {
      const ingredient = rootState.ingredients[current.ingredientId];
      return sum + current.quantity * ingredient?.price;
    }, 0);
  },
  totalPrice: ({ pizza }, getters, rootState) => {
    const ingredientsSum = getters.activeIngredients.reduce((sum, current) => {
      return sum + current.quantity * current.price;
    }, 0);
    return (
      (rootState["dough"].map[pizza.doughId]?.price +
        rootState["sauce"].map[pizza.sauceId]?.price +
        ingredientsSum) *
        rootState["sizes"].map[pizza.sizeId]?.multiplier || 0
    );
  },
  getPizzaPrice: (state, getters, rootState) => (pizza) =>
    (rootState["dough"].map[pizza.doughId]?.price +
      rootState["sauce"].map[pizza.sauceId]?.price +
      getters.ingredientsSum(pizza)) *
      rootState["sizes"].map[pizza.sizeId]?.multiplier || 0,
  getFullPizza:
    (state, getters, rootState) =>
    ({ id, name, quantity, sauceId, doughId, sizeId, ingredients }) => ({
      id,
      name,
      quantity,
      sauce: rootState["sauce"].map[sauceId],
      dough: rootState["dough"].map[doughId],
      size: rootState["sizes"].map[sizeId],
      ingredients: ingredients.reduce((result, { quantity, id }) => {
        result.push({ ...rootState["ingredients"][id], quantity });
        return result;
      }, []),
    }),
};

export default {
  namespaced: true,
  state: {
    pizza: {
      name: "",
      price: 0,
      ingredients: [],
      doughId: null,
      sizeId: null,
      sauceId: null,
      quantity: 1,
      id: uniqueId(),
    },
  },
  actions,
  mutations,
  getters,
};
