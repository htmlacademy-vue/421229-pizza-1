import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import Vuex from "vuex";
import AddressForm from "../AddressForm";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AddressForm", () => {
  let wrapper;
  const address = {
    name: "Address 1",
    street: "Address 1 Street",
    building: "Address 1 building",
    flat: "Address 1 flat",
    comment: "",
    id: 1,
  };
  const actions = {
    postAddress: jest.fn(),
    updateAddress: jest.fn(),
    deleteAddress: jest.fn(),
  };
  const store = generateMockStore({ Addresses: actions });

  const createComponent = (propsData) => {
    wrapper = mount(AddressForm, {
      localVue,
      store,
      propsData,
    });
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("render input", () => {
    createComponent({ address, addressCount: 2 });

    it("name with address.name", () => {
      expect(wrapper.find("[name='addr-name']").element.value).toBe(
        address.name
      );
    });

    it("street with address.street", () => {
      expect(wrapper.find("[name='addr-street']").element.value).toBe(
        address.street
      );
    });

    it("house with address.building", () => {
      expect(wrapper.find("[name='addr-house']").element.value).toBe(
        address.building
      );
    });

    it("apartment with address.flat", () => {
      expect(wrapper.find("[name='addr-apartment']").element.value).toBe(
        address.flat
      );
    });

    it("comment with address.comment", () => {
      expect(wrapper.find("[name='addr-comment']").element.value).toBe(
        address.comment
      );
    });
  });

  describe("delete button", () => {
    it("not renders by default", () => {
      createComponent({ address, addressCount: 2 });
      expect(wrapper.find("[data-test='delete-button']").exists()).toBeFalsy();
    });

    it("renders if isEdited=true", () => {
      createComponent({ address, addressCount: 2, isEdited: true });
      expect(wrapper.find("[data-test='delete-button']").exists()).toBeTruthy();
    });
  });

  describe("method saveAddress", () => {
    it("don't invoke postAddress or updateAddress if checkValidity return false", () => {
      createComponent({ address, addressCount: 2 });
      const event = {
        target: { checkValidity: jest.fn(), reportValidity: jest.fn() },
      };
      wrapper.vm.saveAddress(event);
      expect(actions.postAddress).toHaveBeenCalledTimes(0);
      expect(actions.updateAddress).toHaveBeenCalledTimes(0);
    });

    it("invoke postAddress by default", () => {
      createComponent({ address, addressCount: 2 });
      wrapper.vm.saveAddress({
        target: {
          checkValidity: jest.fn().mockReturnValue(true),
          reportValidity: jest.fn(),
        },
      });
      expect(actions.postAddress).toHaveBeenCalledTimes(1);
    });

    it("invoke updateAddress if isEdited=true", () => {
      createComponent({ address, addressCount: 2, isEdited: true });
      wrapper.vm.saveAddress({
        target: {
          checkValidity: jest.fn().mockReturnValue(true),
          reportValidity: jest.fn(),
        },
      });
      expect(actions.updateAddress).toHaveBeenCalledTimes(1);
    });
  });

  it("invoke saveAddress on submit", () => {
    createComponent({ address, addressCount: 2 });
    const saveAddressSpy = jest.spyOn(wrapper.vm, "saveAddress");
    wrapper.find(".address-form").trigger("submit");
    expect(saveAddressSpy).toHaveBeenCalledTimes(1);
  });

  it("method removeAddress invoke deleteAddress", () => {
    createComponent({ address, addressCount: 2 });
    wrapper.vm.removeAddress();
    expect(actions.deleteAddress).toHaveBeenCalledTimes(1);
  });

  it("method removeAddress invoke deleteAddress", () => {
    createComponent({ address, addressCount: 2 });
    wrapper.vm.removeAddress();
    expect(actions.deleteAddress).toHaveBeenCalledTimes(1);
  });
});
