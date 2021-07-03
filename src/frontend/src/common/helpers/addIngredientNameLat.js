import { INGREDIENTS } from "@/common/constants/ingredients";

export const addIngredientNameLat = (ingredients) =>
  ingredients.map((ingredient) => ({
    ...ingredient,
    nameLat: INGREDIENTS.find(({ name }) => name === ingredient.name).nameLat,
  }));
