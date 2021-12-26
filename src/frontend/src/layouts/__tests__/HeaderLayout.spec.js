import { mount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuex from "vuex";
import HeaderLayout from "../HeaderLayout";
import { generateMockStore } from "../../store/mocks";
import UserProfile from "../../components/UserProfile";
import LoginLink from "../../components/LoginLink";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);

const authenticateUser = (store) => {
  store.commit("User/SET_ENTITY", {
    entity: "isAuthenticated",
    value: true,
  });
};

describe("HeaderLayout", () => {
  let wrapper;
  const store = generateMockStore();

  const createComponent = () => {
    wrapper = mount(HeaderLayout, { localVue, store, stubs: ["router-link"] });
  };

  beforeEach(() => {
    createComponent();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("render LoginLink when unauthorized", () => {
    expect(wrapper.findComponent(LoginLink).exists()).toBeTruthy();
  });

  it("render UserProfile when authorized", async () => {
    await authenticateUser(store);
    expect(wrapper.findComponent(UserProfile).exists()).toBeTruthy();
  });
});
