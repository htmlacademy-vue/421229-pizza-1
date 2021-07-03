import { SAUCES } from "@/common/constants/sauces";

export const addSauceValue = (sauce) =>
  sauce.map((sauce) => ({
    ...sauce,
    value: SAUCES.find(({ name }) => name === sauce.name).value,
  }));
