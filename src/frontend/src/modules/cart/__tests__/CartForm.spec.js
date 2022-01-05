import CartForm from "@/modules/cart/CartForm";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import Vuex from "vuex";
import { SET_ENTITY } from "@/store/mutation-types";

const localVue = createLocalVue();
localVue.use(Vuex);

const addresses = [
  {
    name: "Address 1",
    street: "Street",
    building: "Building",
    flat: "123",
    id: "2",
    comment: "bla bla",
  },
];

describe("CartForm", () => {
  let wrapper;
  const fetchAddresses = jest.fn(() => Promise.resolve(addresses));
  const setReceiptType = jest.fn();
  const store = generateMockStore({
    Addresses: { fetchAddresses, setReceiptType },
  });
  const createComponent = () => {
    wrapper = shallowMount(CartForm, { store });
  };
  const setAddresses = () => {
    store.commit(SET_ENTITY, {
      entity: "addresses",
      module: "Addresses",
      value: addresses,
    });
  };
  const setOrderReceiptType = () => {
    store.commit(SET_ENTITY, {
      entity: "orderReceiptType",
      module: "Addresses",
      value: addresses[0].id,
    });
  };

  beforeEach(() => {
    createComponent();
  });
  afterEach(() => {
    jest.clearAllMocks();
    wrapper.destroy();
  });

  it("renders with 2 options if no addresses", () => {
    expect(wrapper.findAll("option")).toHaveLength(2);
  });

  it("renders with 3 options if 1 address fetched", async () => {
    await setAddresses();
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll("option")).toHaveLength(3);
    });
  });

  it("invokes setReceiptType on select change", () => {
    wrapper.find("select").trigger("change");
    expect(setReceiptType).toHaveBeenCalledTimes(1);
  });

  it("select correct option", async () => {
    await setAddresses();
    await setOrderReceiptType();
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find("option:checked").element.value).toBe(
        addresses[0].id
      );
    });
  });

  it("invokes setEntity on phone field change", () => {
    const setEntitySpy = jest.spyOn(wrapper.vm, "setEntity");
    wrapper.find("input[name='tel'").trigger("change");
    expect(setEntitySpy).toHaveBeenCalledTimes(1);
  });

  it("invokes updateField on street field change", () => {
    const updateFieldSpy = jest.spyOn(wrapper.vm, "updateField");
    wrapper.find("input[name='street'").trigger("change");
    expect(updateFieldSpy).toHaveBeenCalledTimes(1);
  });

  it("invokes updateField on house field change", () => {
    const updateFieldSpy = jest.spyOn(wrapper.vm, "updateField");
    wrapper.find("input[name='house'").trigger("change");
    expect(updateFieldSpy).toHaveBeenCalledTimes(1);
  });

  it("invokes updateField on apartment field change", () => {
    const updateFieldSpy = jest.spyOn(wrapper.vm, "updateField");
    wrapper.find("input[name='apartment'").trigger("change");
    expect(updateFieldSpy).toHaveBeenCalledTimes(1);
  });

  it("invokes fetchAddresses when created", () => {
    expect(fetchAddresses).toHaveBeenCalledTimes(1);
  });
});
