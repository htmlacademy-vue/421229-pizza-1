export const getIdToItemMap = (items, idPropName = "id") => {
  if (!items?.length) {
    return {};
  }

  return items.reduce((resultMap, item) => {
    resultMap[item[idPropName]] = item;
    return resultMap;
  }, {});
};
