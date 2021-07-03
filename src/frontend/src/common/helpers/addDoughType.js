import { DOUGH_TYPES } from "@/common/constants/doughTypes";

export const addDoughType = (doughTypes = []) =>
  doughTypes.map((dough) => ({
    ...dough,
    type: DOUGH_TYPES.find(({ name }) => name === dough.name).type,
  }));
