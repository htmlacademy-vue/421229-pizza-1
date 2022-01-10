import { SET_ENTITY } from "../../store/mutation-types";
import { getIdToItemMap } from "../utils/getIdToItemMap";
import { doughTypes } from "./dough.mock";
import { saucesMock } from "./sauce.mock";
import { sizesMock } from "./sizes.mock";

export const setIngredients = (store, ingredients) => {
  store.commit(SET_ENTITY, {
    entity: "ingredients",
    value: getIdToItemMap(ingredients),
  });
};

export const setDough = (store) => {
  store.commit(SET_ENTITY, {
    entity: "dough",
    value: { list: doughTypes, map: getIdToItemMap(doughTypes) },
  });
};

export const setSauces = (store) => {
  store.commit(SET_ENTITY, {
    entity: "sauce",
    value: { list: saucesMock, map: getIdToItemMap(saucesMock) },
  });
};

export const setSizes = (store) => {
  store.commit(SET_ENTITY, {
    entity: "sizes",
    value: { list: sizesMock, map: getIdToItemMap(sizesMock) },
  });
};
