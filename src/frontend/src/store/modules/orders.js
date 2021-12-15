import { SET_ENTITY, UPDATE_ENTITY } from "../mutation-types";

const actions = {
  async getOrders({ commit }) {
    const value = await this.$api.orders.getList();

    commit(
      SET_ENTITY,
      {
        entity: "orders",
        module: "Orders",
        value,
      },
      {
        root: true,
      }
    );
  },
  async sendOrder({ getters }) {
    await this.$api.orders.sendOrder(getters.getOrderData);
  },
  async deleteOrder({ commit }, orderId) {
    await this.$api.orders.delete(orderId);
    commit(
      "DELETE_ENTITY",
      { entity: "orders", module: "Orders", entityId: orderId },
      { root: true }
    );
  },
  repeatOrder({ commit, dispatch, state, rootState }, order) {
    const stateOrder = state.orders.find(({ id }) => id === order.id);
    commit(
      "SET_ENTITY",
      {
        module: "Cart",
        entity: "pizzas",
        value: order.orderPizzas.map(({ id, quantity, price }) => {
          const statePizza = stateOrder.orderPizzas.find(
            (pizza) => pizza.id === id
          );
          return {
            ...statePizza,
            ingredients: statePizza.ingredients.map(
              ({ ingredientId, quantity }) => ({
                ...rootState.ingredients[ingredientId],
                quantity,
              })
            ),
            quantity,
            price,
          };
        }),
      },
      { root: true }
    );
    commit("UPDATE_ALL_MISC", { values: order.orderMisc }, { root: true });
    dispatch("Addresses/setReceiptType", order.orderAddress?.id, {
      root: true,
    });
  },
};

const getters = {
  getOrderData(state, getters, rootState, rootGetters) {
    return {
      ...rootGetters["Cart/getOrderCart"],
      ...rootGetters["User/getUserCartData"],
    };
  },
  formatPizza: (state, getters, rootState, rootGetters) => (pizza) => {
    const { id, name, quantity, sauceId, doughId, sizeId, ingredients } = pizza;
    const ingredientsMap = rootState["ingredients"];

    return {
      id,
      name,
      quantity,
      sauce: rootState["sauce"].map[sauceId],
      dough: rootState["dough"].map[doughId],
      size: rootState["sizes"].map[sizeId],
      ingredients: ingredients.reduce((result, { quantity, ingredientId }) => {
        result.push({ ...ingredientsMap[ingredientId], quantity });
        return result;
      }, []),
      price: rootGetters["Builder/getPizzaPrice"](pizza),
    };
  },
  formatMisc:
    (state, getters, rootState) =>
    (miscItem = {}) => {
      const misc = rootState.misc.find(({ id }) => id === miscItem.miscId);
      return {
        miscId: miscItem.miscId,
        name: misc.name,
        quantity: miscItem.quantity,
        price: misc.price,
        image: misc.image,
      };
    },
  historyOrders: ({ orders }, getters) =>
    orders.map((order) => ({
      ...order,
      orderPizzas: (order.orderPizzas || []).map(getters.formatPizza),
      orderMisc: (order.orderMisc || [])
        .filter(({ quantity }) => quantity)
        .map(getters.formatMisc),
    })),
};

const mutations = {
  [UPDATE_ENTITY](state, { entity, value }) {
    state[entity] = [...state[entity], value];
  },
};

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  mutations,
  getters,
  actions,
};
