import CartMisc from "@/modules/cart/CartMisc";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import Vuex from "vuex";
import { SET_ENTITY } from "@/store/mutation-types";
import { miscMock } from "@/common/test-utils/misc.mock";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CartMisc", () => {
  let wrapper;
  const store = generateMockStore();
  const createComponent = () => {
    wrapper = shallowMount(CartMisc, { store });
  };
  const setMisc = () => {
    store.commit(SET_ENTITY, {
      entity: "misc",
      value: miscMock,
    });
  };

  beforeEach(() => {
    createComponent();
  });
  afterEach(() => {
    jest.clearAllMocks();
    wrapper.destroy();
  });

  it("renders with 3 misc items", async () => {
    await setMisc();
    expect(wrapper.findAll(".additional-list__item")).toHaveLength(3);
  });

  it("invokes addMisc with term 1 on increment button click", async () => {
    await setMisc();
    const addMiscSpy = jest.spyOn(wrapper.vm, "addMisc");
    wrapper.find(".counter__button--plus").trigger("click");
    expect(addMiscSpy).toHaveBeenCalledWith({
      entity: "misc",
      value: miscMock[0],
      term: 1,
    });
  });

  it("invokes addMisc with term -1 on decrement button click", async () => {
    await setMisc();
    const addMiscSpy = jest.spyOn(wrapper.vm, "addMisc");
    wrapper.find(".counter__button--minus").trigger("click");
    expect(addMiscSpy).toHaveBeenCalledWith({
      entity: "misc",
      value: miscMock[0],
      term: -1,
    });
  });

  it("renders with correct sum", async () => {
    const sum = miscMock[1].quantity * miscMock[1].price;
    await setMisc();
    expect(wrapper.findAll(".additional-list__price").at(1).text()).toBe(
      `${sum} ₽`
    );
  });
});
