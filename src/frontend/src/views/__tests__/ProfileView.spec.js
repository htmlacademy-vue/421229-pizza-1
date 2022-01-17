import ProfileView from "@/views/ProfileView";
import { shallowMount } from "@vue/test-utils";
import AddressBlock from "@/modules/address/AddressBlock";
import UserData from "@/modules/profile/UserData";

describe("ProfileView", () => {
  let wrapper;
  const createComponent = () => {
    wrapper = shallowMount(ProfileView);
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
