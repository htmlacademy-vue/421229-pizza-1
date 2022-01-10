import { mount, createLocalVue } from "@vue/test-utils";
import AddressBlock, { getDefaultAddress } from "../AddressBlock";
import { generateMockStore } from "@/store/mocks";
import Vuex from "vuex";
import { SET_ENTITY } from "../../../store/mutation-types";
import AddressItem from "../AddressItem";
import AddressForm from "../AddressForm";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AddressBlock", () => {
  let wrapper;
  const addresses = [
    {
      name: "Address 1",
      street: "Address 1 Street",
      building: "Address 1 building",
      flat: "Address 1 flat",
      comment: "",
      id: 1,
    },
    {
      name: "Address 2",
      street: "Address 2 Street",
      building: "Address 2 building",
      flat: "",
      comment: "comment",
      id: 2,
    },
  ];
  const store = generateMockStore({
    Addresses: {
      fetchAddresses: jest.fn(),
    },
  });

  const setAddresses = () => {
    store.commit(
      SET_ENTITY,
      {
        entity: "addresses",
        module: "Addresses",
        value: addresses,
      },
      { root: true }
    );
  };

  const createComponent = () => {
    wrapper = mount(AddressBlock, {
      localVue,
      store,
    });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("render 2 AddressItem components", async () => {
    await setAddresses();
    createComponent();
    expect(wrapper.findAllComponents(AddressItem).length).toBe(2);
  });

  it("render AddressForm component", () => {
    createComponent();
    wrapper.find("[data-test='add-new-address']").trigger("click");
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findComponent(AddressForm).exists()).toBeTruthy();
    });
  });

  it("method editAddress set correct address", async () => {
    createComponent();
    await setAddresses();
    wrapper.vm.editAddress(2);
    expect(wrapper.vm.address).toEqual(addresses[1]);
  });

  it("method changeValue correctly change address field", async () => {
    createComponent();
    wrapper.vm.changeValue({ flat: 34 });
    expect(wrapper.vm.address.flat).toBe(34);
  });

  it("method addNewAddress set showForm and default address", async () => {
    createComponent();
    wrapper.find("[data-test='add-new-address']").trigger("click");
    await wrapper.vm.$nextTick(() => {
      expect(wrapper.findComponent(AddressForm).props().address).toEqual(
        getDefaultAddress()
      );
    });
  });

  it("method closeForm reset showForm and set default address", async () => {
    createComponent();
    wrapper.vm.closeForm();
    await wrapper.vm.$nextTick(() => {
      expect(wrapper.findAllComponents(AddressForm)).toHaveLength(0);
      expect(wrapper.vm.address).toEqual(getDefaultAddress());
    });
  });
});
