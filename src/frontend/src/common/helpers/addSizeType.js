import { SIZE_TYPES } from "@/common/constants/sizeTypes";

export const addSizeType = (sizes) =>
  sizes.map((size) => ({
    ...size,
    type: SIZE_TYPES[size.multiplier],
  }));
