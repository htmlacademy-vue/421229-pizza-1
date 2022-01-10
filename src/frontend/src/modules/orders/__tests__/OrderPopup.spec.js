import OrderPopup from "@/modules/orders/OrderPopup";
import { shallowMount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "../../../store/mutation-types";

describe("OrderPopup", () => {
  let wrapper;
  const store = generateMockStore();
  const routerPush = jest.fn();
  const createComponent = () => {
    wrapper = shallowMount(OrderPopup, {
      store,
      mocks: { $router: { push: routerPush } },
    });
  };

  beforeEach(() => {
    jest.useFakeTimers();
    createComponent();
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("invokes closePopup on close click", () => {
    const closePopupSpy = jest.spyOn(wrapper.vm, "closePopup");
    wrapper.find("a.close").trigger("click");
    expect(closePopupSpy).toHaveBeenCalled();
  });

  it("invokes closePopup on confirm click", () => {
    const closePopupSpy = jest.spyOn(wrapper.vm, "closePopup");
    wrapper.find(".popup__button .button").trigger("click");
    expect(closePopupSpy).toHaveBeenCalled();
  });

  it("invokes routerPush with /orders if user authorized", async () => {
    await store.commit(SET_ENTITY, {
      module: "User",
      entity: "user",
      value: { id: 1 },
    });
    wrapper.vm.closePopup();
    jest.advanceTimersByTime(400);
    expect(routerPush).toHaveBeenCalledWith("/orders");
  });

  it("invokes routerPush with / if no user unauthorized", () => {
    wrapper.vm.closePopup();
    jest.advanceTimersByTime(400);
    expect(routerPush).toHaveBeenCalledWith("/orders");
  });
});
