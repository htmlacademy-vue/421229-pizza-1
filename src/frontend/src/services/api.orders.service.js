import { CrudApiService } from "./api.service";

export class OrdersApiService extends CrudApiService {
  constructor() {
    super("orders");
  }

  _formatPizzas(pizzas) {
    return pizzas.map(
      ({ name, sauceId, doughId, sizeId, quantity, ingredients }) => ({
        name,
        sauceId,
        doughId,
        sizeId,
        quantity,
        ingredients: ingredients.map(({ id, quantity }) => ({
          ingredientId: id,
          quantity,
        })),
      })
    );
  }

  _formatMisc(misc) {
    return misc.map(({ id, quantity }) => ({
      miscId: id,
      quantity,
    }));
  }

  async sendOrder({ userId, phone, address, pizzas, misc }) {
    return await super.post({
      userId,
      phone,
      address: address || null,
      pizzas: this._formatPizzas(pizzas),
      misc: this._formatMisc(misc),
    });
  }
}
