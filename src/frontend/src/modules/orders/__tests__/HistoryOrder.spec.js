import HistoryOrder from "@/modules/orders/HistoryOrder";
import { shallowMount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import { orderMock } from "@/common/test-utils/order.mock";
import PizzaDescription from "@/components/PizzaDescription";
import HistoryMiscItem from "../HistoryMiscItem";

describe("HistoryOrder", () => {
  let wrapper;
  const deleteOrder = jest.fn();
  const repeatOrder = jest.fn();
  const store = generateMockStore({
    Orders: { deleteOrder, repeatOrder },
  });
  const routerPush = jest.fn();
  const createComponent = () => {
    wrapper = shallowMount(HistoryOrder, {
      store,
      propsData: { order: orderMock },
      mocks: { $router: { push: routerPush } },
    });
  };

  beforeEach(() => {
    createComponent();
  });
  afterEach(() => {
    jest.clearAllMocks();
    wrapper.destroy();
  });

  it("computed prop orderSum has value 1916", () => {
    expect(wrapper.vm.orderSum).toBe(1916);
  });

  it("invoke deleteOrder action on delete button click", () => {
    wrapper.find("[data-test='delete-button']").trigger("click");
    expect(deleteOrder).toHaveBeenCalledTimes(1);
  });

  it("invoke repeatOrder action and router push with '/cart' on repeat button click", () => {
    wrapper.find("[data-test='repeat-button']").trigger("click");
    expect(repeatOrder).toHaveBeenCalledTimes(1);
    expect(routerPush).toHaveBeenCalledWith("/cart");
  });

  it("renders with 1 PizzaDescription component", () => {
    expect(wrapper.findAllComponents(PizzaDescription)).toHaveLength(1);
  });

  it("renders with 3 HistoryMiscItem component", () => {
    expect(wrapper.findAllComponents(HistoryMiscItem)).toHaveLength(3);
  });

  it("renders with address", () => {
    expect(wrapper.find(".order__address").exists()).toBeTruthy();
  });
});
