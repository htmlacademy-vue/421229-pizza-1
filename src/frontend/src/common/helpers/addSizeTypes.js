import { SIZE_TYPES } from "@/common/constants/sizeTypes";

export const addSizeTypes = (sizes) => {
  return (Array.isArray(sizes) ? sizes : []).map((size) => {
    return {
      ...size,
      type: SIZE_TYPES[size.multiplier],
    };
  });
};
