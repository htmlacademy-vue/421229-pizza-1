export const formatMisc = (misc) => {
  return (Array.isArray(misc) ? misc : []).map((miscItem) => ({
    ...miscItem,
    count: 0,
  }));
};
