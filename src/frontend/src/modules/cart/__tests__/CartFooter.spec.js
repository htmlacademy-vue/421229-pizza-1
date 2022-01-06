import CartFooter from "@/modules/cart/CartFooter";
import { shallowMount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import { setPizza } from "@/common/test-utils/cart";

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
    await setPizza(store);
    createComponent(store);
    expect(
      wrapper.find(".footer__submit button:disabled").exists()
    ).toBeFalsy();
  });
});
