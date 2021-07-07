import { SAUCES } from "@/common/constants/sauces";

export const addSauceValues = (sauce) => {
  return sauce.map((sauce) => {
    return {
      ...sauce,
      value: SAUCES.find(({ name }) => name === sauce.name).value,
    };
  });
};
