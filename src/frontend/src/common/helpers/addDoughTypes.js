import { DOUGH_TYPES } from "@/common/constants/doughTypes";

export const addDoughTypes = (doughTypes) => {
  return (Array.isArray(doughTypes) ? doughTypes : []).map((dough) => {
    const current = DOUGH_TYPES.find(({ name }) => name === dough.name);
    return {
      ...dough,
      type: current && current.type,
    };
  });
};
