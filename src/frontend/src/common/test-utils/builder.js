export const setActiveIngredient = (store, ingredient) => {
  store.commit("Builder/UPDATE_INGREDIENT", ingredient);
};

export const setActiveDough = (store, doughId) => {
  store.commit("Builder/UPDATE_ENTITY", { entity: "doughId", value: doughId });
};

export const setActiveSauce = (store, sauceId) => {
  store.commit("Builder/UPDATE_ENTITY", { entity: "sauceId", value: sauceId });
};

export const setActiveSize = (store, sizeId) => {
  store.commit("Builder/UPDATE_ENTITY", { entity: "sizeId", value: sizeId });
};

export const setPizzaName = (store, name) => {
  store.commit("Builder/UPDATE_ENTITY", {
    entity: "name",
    value: name,
  });
};
