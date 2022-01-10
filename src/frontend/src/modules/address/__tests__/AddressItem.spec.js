import { shallowMount } from "@vue/test-utils";
import AddressItem from "../AddressItem";
import AddressForm from "../AddressForm";

describe("AddressItem", () => {
  let wrapper;
  const address = {
    name: "Address 1",
    street: "Address 1 Street",
    building: "Address 1 building",
    flat: "Address 1 flat",
    comment: "",
    id: 1,
  };

  const createComponent = (propsData) => {
    wrapper = shallowMount(AddressItem, { propsData });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("render correct address title", () => {
    createComponent({ address, index: 2 });
    expect(wrapper.find(".address-form__header b").text()).toBe(
      `Адрес 3. ${address.name}`
    );
  });

  it("render formatted address with flat", () => {
    createComponent({ address, index: 2 });
    expect(wrapper.find("[data-test='formatted-address']").text()).toBe(
      `${address.street} ул., д. ${address.building}, кв. ${address.flat}`
    );
  });

  it("render formatted address without flat", () => {
    createComponent({
      address: {
        name: "Address 1",
        street: "Address 1 Street",
        building: "Address 1 building",
        comment: "",
        id: 1,
      },
      index: 2,
    });
    expect(wrapper.find("[data-test='formatted-address']").text()).toBe(
      `${address.street} ул., д. ${address.building}`
    );
  });

  it("render AddressForm if isEdited=true", () => {
    createComponent({ address, index: 2, isEdited: true, changeValue: jest.fn() });
    expect(wrapper.findComponent(AddressForm).exists()).toBeTruthy();
  });
});
