import { ReadOnlyApiService } from "./api.service";
import { SAUCES } from "../common/constants/sauces";

export class SaucesApiService extends ReadOnlyApiService {
  constructor() {
    super("sauces");
  }

  _addSauceValue(sauce) {
    return {
      ...sauce,
      value: SAUCES.find(({ name }) => name === sauce.name).value,
    };
  }

  async getList(config = {}) {
    const sauces = await super.getList(config);
    return (Array.isArray(sauces) ? sauces : []).map(this._addSauceValue);
  }
}
