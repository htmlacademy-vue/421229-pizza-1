import HistoryOrder from "@/modules/orders/HistoryOrder";
import { shallowMount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";

describe("HistoryOrder", () => {
  let wrapper;
  const store = generateMockStore();
  const routerPush = jest.fn();
  const createComponent = () => {
    wrapper = shallowMount(HistoryOrder, {
      store,
      mocks: { $router: { push: routerPush } },
    });
  };

  beforeEach(() => {
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

  it("invokes routerPush with /orders if user authorized", async () => {
    await store.commit(SET_ENTITY, {
      module: "User",
      entity: "user",
      value: { id: 1 },
    });
    wrapper.vm.closePopup();
    expect(routerPush).toHaveBeenCalledWith("/orders");
  });
});
