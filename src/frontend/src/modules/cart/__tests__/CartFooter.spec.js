import CartFooter from "@/modules/cart/CartFooter";
import { shallowMount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";

const pizza = {
  doughId: 2,
  name: "",
  ingredients: [
    {
      id: 4,
      name: "Салями",
      image: "/public/img/filling/salami.svg",
      price: 42,
      nameLat: "salami",
      quantity: 2,
    },
  ],
  sizeId: 2,
  sauceId: 2,
  price: 100,
  id: "3",
  quantity: 1,
};

describe("CartFooter", () => {
  let wrapper;
  const store = generateMockStore({
    Cart: { setPizza: jest.fn() },
  });
  const createComponent = (store) => {
    wrapper = shallowMount(CartFooter, {
      store,
      stubs: ["router-link"],
    });
  };

  it("renders with disabled submit button", () => {
    createComponent(store);
    expect(
      wrapper.find(".footer__submit button:disabled").exists()
    ).toBeTruthy();
  });

  it("renders with enabled submit button", async () => {
    await store.commit("Cart/SET_PIZZA", pizza);
    createComponent(store);
    expect(
      wrapper.find(".footer__submit button:disabled").exists()
    ).toBeFalsy();
  });
});
