import { dough, sizes, ingredients, sauces } from "@/static/pizza.json";
import { addDoughTypes } from "@/common/helpers/addDoughTypes";
import { addSizeTypes } from "@/common/helpers/addSizeTypes";
import { formatIngredients } from "@/common/helpers/formatIngredients";
import { addSauceValues } from "@/common/helpers/addSauceValues";
import {
  SET_ENTITY,
  UPDATE_ENTITY,
  UPDATE_INGREDIENT,
  EDIT_PIZZA,
  RESET_ACTIVE,
} from "@/store/mutation-types";
import { uniqueId } from "lodash";

const actions = {
  async init({ dispatch }) {
    dispatch("fetchDoughTypes");
    dispatch("fetchSizes");
    dispatch("fetchIngredients");
    dispatch("fetchSauces");
  },
  fetchDoughTypes({ commit }) {
    const doughTypes = addDoughTypes(dough);

    commit(SET_ENTITY, {
      module: null,
      entity: "doughTypes",
      value: {
        list: doughTypes,
        active: doughTypes[0],
      },
    });
  },
  fetchSizes({ commit }) {
    const list = addSizeTypes(sizes);

    commit(SET_ENTITY, {
      module: null,
      entity: "sizes",
      value: {
        list,
        active: list[0],
      },
    });
  },
  fetchIngredients({ commit }) {
    commit(SET_ENTITY, {
      module: null,
      entity: "ingredients",
      value: formatIngredients(ingredients),
    });
  },
  fetchSauces({ commit }) {
    const list = addSauceValues(sauces);

    commit(SET_ENTITY, {
      module: null,
      entity: "sauces",
      value: {
        list,
        active: list[0],
      },
    });
  },
  editPizza({ commit }, pizza) {
    commit(EDIT_PIZZA, {
      module: null,
      pizza,
    });
  },
};

const mutations = {
  [SET_ENTITY](state, { entity, value }) {
    const { list, active } = value;
    if (list) {
      state[entity].list = list;
      state[entity].active = active;
    } else {
      state[entity] = value;
    }
  },
  [UPDATE_ENTITY](state, { entity, value }) {
    if (state[entity].list) {
      state[entity].active = value;
    } else {
      state[entity] = value;
    }
  },
  [UPDATE_INGREDIENT](state, ingredient) {
    state.ingredients = state.ingredients.map((item) =>
      item.id !== ingredient.id ? item : ingredient
    );
  },
  [EDIT_PIZZA](
    state,
    { dough, name, ingredients, size, sauce, price, id, count }
  ) {
    state.doughTypes.active = dough;
    state.name = name;
    state.ingredients = state.ingredients.map((stateIngredient) => {
      const activeIngredient = ingredients.find(
        ({ id }) => id === stateIngredient.id
      );

      return activeIngredient
        ? { ...stateIngredient, count: activeIngredient.count }
        : stateIngredient;
    });
    state.sizes.active = size;
    state.sauces.active = sauce;
    state.price = price;
    state.id = id;
    state.count = count;
  },
  [RESET_ACTIVE](state) {
    state.doughTypes.active = state.doughTypes.list[0];
    state.name = "";
    state.ingredients = state.ingredients.map((stateIngredient) => ({
      ...stateIngredient,
      count: 0,
    }));
    state.sizes.active = state.sizes.list[0];
    state.sauces.active = state.sauces.list[0];
    state.price = 0;
    state.id = "";
    state.count = 1;
  },
};

const getters = {
  activeIngredients: (state) => state.ingredients.filter(({ count }) => count),
  createdPizza: (state, getters) => ({
    name: state.name,
    price: getters.totalPrice,
    ingredients: state.ingredients.filter(({ count }) => count),
    dough: state.doughTypes.active,
    size: state.sizes.active,
    sauce: state.sauces.active,
    count: state.count,
    id: state.id || uniqueId(),
  }),
  totalPrice: ({
    ingredients = {},
    doughTypes = {},
    sauces = {},
    sizes = {},
  }) => {
    const ingredientsSum = ingredients
      .filter(({ count }) => count)
      .reduce((sum, current) => {
        return sum + current.count * current.price;
      }, 0);

    return (
      (doughTypes.active.price + sauces.active.price + ingredientsSum) *
      sizes.active.multiplier
    );
  },
};

export default {
  namespaced: true,
  state: {
    doughTypes: {
      list: [],
      active: {},
    },
    sizes: {
      list: [],
      active: {},
    },
    ingredients: [],
    sauces: {
      list: [],
      active: {},
    },
    price: 0,
    count: 1,
    name: "",
    id: "",
  },
  actions,
  mutations,
  getters,
};
