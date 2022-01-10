import UserData from "@/modules/profile/UserData";
import { shallowMount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";
import { userMock } from "@/common/test-utils/user.mock";

describe("UserData", () => {
  let wrapper;
  const store = generateMockStore();
  const setUser = async () => {
    await store.commit(SET_ENTITY, {
      module: "User",
      entity: "user",
      value: userMock,
    });
  };
  const createComponent = () => {
    wrapper = shallowMount(UserData, { store });
  };

  beforeEach(() => {
    setUser();
    createComponent();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders with correct name", () => {
    expect(wrapper.find(".user__name span").text()).toBe(userMock.name);
  });

  it("renders with correct phone", () => {
    expect(wrapper.find(".user__phone span").text()).toBe(userMock.phone);
  });

  it("computed prop userAvatar returns correct values", () => {
    expect(wrapper.vm.userAvatar).toEqual({
      jpg: "/public/img/users/user@2x.jpg",
      webp: "/public/img/users/user@2x.webp",
    });
  });
});
