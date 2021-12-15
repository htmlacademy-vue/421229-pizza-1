import { ReadOnlyApiService } from "./api.service";
import { INGREDIENTS } from "../common/constants/ingredients";

export class IngredientsApiService extends ReadOnlyApiService {
  constructor() {
    super("ingredients");
  }

  _formatIngredient(ingredient) {
    const current = INGREDIENTS.find(({ name }) => name === ingredient.name);
    return {
      ...ingredient,
      nameLat: current && current.nameLat,
      quantity: 0,
    };
  }

  async getList(config = {}) {
    const ingredients = await super.getList(config);
    return (Array.isArray(ingredients) ? ingredients : []).map(
      this._formatIngredient
    );
  }
}
