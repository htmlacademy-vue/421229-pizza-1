import HistoryMiscItem from "@/modules/orders/HistoryMiscItem";
import { shallowMount } from "@vue/test-utils";
import { miscMock } from "@/common/test-utils/misc.mock";

describe("HistoryMiscItem", () => {
  let wrapper;
  const createComponent = () => {
    wrapper = shallowMount(HistoryMiscItem, {
      propsData: { misc: miscMock[2] },
    });
  };

  beforeEach(() => {
    createComponent();
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("renders with correct sum", () => {
    expect(wrapper.vm.sum).toBe(miscMock[2].quantity * miscMock[2].price);
  });
});
