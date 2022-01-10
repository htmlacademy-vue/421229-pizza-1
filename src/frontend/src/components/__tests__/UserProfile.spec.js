import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import logout from "../../common/mixins/logout";
import UserProfile from "../UserProfile";
import { generateMockStore } from "../../store/mocks";

jest.mock("../../common/mixins/logout");

describe("UserProfile", () => {
  const wrapper = shallowMount(UserProfile, {
    propsData: {},
    stubs: { RouterLink: RouterLinkStub },
    mixins: [logout],
    store: generateMockStore(),
  });

  it("invoke logout on header__logout click", () => {
    wrapper.find(".header__logout").trigger("click");
    expect(logout.methods.$logout).toHaveBeenCalledTimes(1);
  });
});
