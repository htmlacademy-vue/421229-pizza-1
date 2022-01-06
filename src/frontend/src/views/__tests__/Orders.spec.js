import Orders from "@/views/Orders";
import HistoryOrder from "@/modules/orders/HistoryOrder";
import { shallowMount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import { orderMock } from "@/common/test-utils/order.mock";
import { SET_ENTITY } from "../../store/mutation-types";
import { miscMock } from "../../common/test-utils/misc.mock";

describe("Orders", () => {
  let wrapper;
  const store = generateMockStore();
  const setOrder = async () => {
    await store.commit(SET_ENTITY, {
      entity: "orders",
      module: "Orders",
      value: [orderMock],
    });
  };
  const setMisc = async () => {
    await store.commit(SET_ENTITY, {
      entity: "misc",
      value: miscMock,
    });
  };
  const createComponent = () => {
    wrapper = shallowMount(Orders, { store });
  };

  beforeEach(() => {
    createComponent();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders without HistoryOrders", () => {
    expect(wrapper.findAllComponents(HistoryOrder)).toHaveLength(0);
  });

  it("renders with 1 HistoryOrder", () => {
    setMisc();
    setOrder();
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAllComponents(HistoryOrder)).toHaveLength(1);
    });
  });
});
