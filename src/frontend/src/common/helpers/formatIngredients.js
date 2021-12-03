import { INGREDIENTS } from "@/common/constants/ingredients";

export const formatIngredients = (ingredients) => {
  return (Array.isArray(ingredients) ? ingredients : []).map((ingredient) => {
    const current = INGREDIENTS.find(({ name }) => name === ingredient.name);
    return {
      ...ingredient,
      nameLat: current && current.nameLat,
      count: 0,
    };
  });
};
