import Cart from "@/views/Cart";
import { shallowMount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import { setPizza } from "@/common/test-utils/cart";
import CartContent from "@/modules/cart/CartContent";
import CartEmpty from "@/modules/cart/CartEmpty";

describe("Cart", () => {
  let wrapper;
  const store = generateMockStore();
  const createComponent = () => {
    wrapper = shallowMount(Cart, { store });
  };

  beforeEach(() => {
    createComponent();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders only with CartEmpty without pizzas", () => {
    expect(wrapper.findComponent(CartEmpty).exists()).toBeTruthy();
    expect(wrapper.findComponent(CartContent).exists()).toBeFalsy();
  });

  it("renders only with CartContent if has pizzas in store", async () => {
    await setPizza(store);
    expect(wrapper.findComponent(CartContent).exists()).toBeTruthy();
    expect(wrapper.findComponent(CartEmpty).exists()).toBeFalsy();
  });
});
