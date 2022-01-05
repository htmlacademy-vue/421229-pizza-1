import CartEmpty from "@/modules/cart/CartEmpty";
import { shallowMount } from "@vue/test-utils";

describe("CartEmpty", () => {
  const wrapper = shallowMount(CartEmpty);

  it("renders with cart__empty div", () => {
    expect(wrapper.find("div.cart__empty").exists()).toBeTruthy();
  });
});
