import { ReadOnlyApiService } from "./api.service";
import { DOUGH_TYPES } from "../common/constants/doughTypes";

export class DoughApiService extends ReadOnlyApiService {
  constructor() {
    super("dough");
  }

  _addDoughType(dough) {
    const { type, prepositional } =
      DOUGH_TYPES.find(({ name }) => name === dough.name) || {};
    return {
      ...dough,
      type,
      prepositional,
    };
  }

  async getList(config = {}) {
    const doughTypes = await super.getList(config);
    return (Array.isArray(doughTypes) ? doughTypes : []).map(
      this._addDoughType
    );
  }
}
