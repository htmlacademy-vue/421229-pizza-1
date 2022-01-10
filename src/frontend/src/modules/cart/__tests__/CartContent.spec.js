import CartList from "@/modules/cart/CartList";
import CartMisc from "@/modules/cart/CartMisc";
import CartForm from "@/modules/cart/CartForm";
import CartContent from "@/modules/cart/CartContent";
import { shallowMount } from "@vue/test-utils";

describe("CartContent", () => {
  const wrapper = shallowMount(CartContent);

  it("renders with CartList", () => {
    expect(wrapper.findComponent(CartList).exists()).toBeTruthy();
  });

  it("renders with CartMisc", () => {
    expect(wrapper.findComponent(CartMisc).exists()).toBeTruthy();
  });

  it("renders with CartForm", () => {
    expect(wrapper.findComponent(CartForm).exists()).toBeTruthy();
  });
});
