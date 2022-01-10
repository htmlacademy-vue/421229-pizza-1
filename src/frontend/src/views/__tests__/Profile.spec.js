import Profile from "@/views/Profile";
import { shallowMount } from "@vue/test-utils";
import AddressBlock from "@/modules/address/AddressBlock";
import UserData from "@/modules/profile/UserData";

describe("Profile", () => {
  let wrapper;
  const createComponent = () => {
    wrapper = shallowMount(Profile);
  };

  beforeEach(() => {
    createComponent();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders with UserData", () => {
    expect(wrapper.findComponent(UserData).exists()).toBeTruthy();
  });

  it("renders with AddressBlock", () => {
    expect(wrapper.findComponent(AddressBlock).exists()).toBeTruthy();
  });
});
