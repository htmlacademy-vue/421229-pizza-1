import { mount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuex from "vuex";
import LayoutForm from "../LayoutForm";
import { generateMockStore } from "../../store/mocks";
import OrderPopup from "../../modules/orders/OrderPopup";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);

describe("HeaderLayout", () => {
  let wrapper;
  const actions = {
    Cart: { resetCart: jest.fn() },
    Orders: { sendOrder: jest.fn() },
  };
  const store = generateMockStore(actions);

  const createComponent = () => {
    wrapper = mount(LayoutForm, { localVue, store, stubs: ["router-link"] });
  };

  beforeEach(() => {
    createComponent();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("invokes sendOrder and resetCart on submit", async () => {
    await wrapper.find(".layout-form").trigger("submit");
    expect(actions.Orders.sendOrder).toHaveBeenCalledTimes(1);
    expect(actions.Cart.resetCart).toHaveBeenCalledTimes(1);
  });

  it("show order popup after order creation", async () => {
    expect(wrapper.findComponent(OrderPopup).exists()).toBeFalsy();

    await wrapper.find(".layout-form").trigger("submit");
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(OrderPopup).exists()).toBeTruthy();
  });

  it("hide order popup on closePopup", () => {
    wrapper.vm.closePopup();
    wrapper.vm.$nextTick();
    expect(wrapper.findComponent(OrderPopup).exists()).toBeFalsy();
  });
});
