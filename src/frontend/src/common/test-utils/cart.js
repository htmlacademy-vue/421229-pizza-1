export const setPizza = (store) => {
  store.commit("Cart/SET_PIZZA", {
    name: "Грибная",
    price: 3243,
    ingredients: [
      {
        id: 1,
        name: "Грибы",
        image: "/public/img/filling/mushrooms.svg",
        price: 33,
        nameLat: "mushrooms",
        quantity: 1,
      },
    ],
    doughId: 2,
    sizeId: 3,
    sauceId: 2,
    quantity: 3,
    id: 2,
  });
};
