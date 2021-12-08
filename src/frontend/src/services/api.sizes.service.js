import { ReadOnlyApiService } from "./api.service";
import { SIZE_TYPES } from "../common/constants/sizeTypes";

export class SizesApiService extends ReadOnlyApiService {
  constructor() {
    super("sizes");
  }

  _addSizeTypes(size) {
    return {
      ...size,
      type: SIZE_TYPES[size.multiplier],
    };
  }

  async getList(config = {}) {
    const sizes = await super.getList(config);
    return (Array.isArray(sizes) ? sizes : []).map(this._addSizeTypes);
  }
}
