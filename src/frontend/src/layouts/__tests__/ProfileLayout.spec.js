import { mount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import ProfileLayout from "../ProfileLayout";
import router from "../../router/routes";
import { generateMockStore } from "../../store/mocks";
import HeaderLayout from "../HeaderLayout";
import { flushPromises } from "../../common/test-utils/flush-promises";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("ProfileLayout", () => {
  let wrapper;
  const createComponent = (routerMock) => {
    wrapper = mount(ProfileLayout, {
      router: routerMock || router,
      localVue,
      store: generateMockStore(),
    });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders with HeaderLayout", () => {
    createComponent();
    expect(wrapper.findComponent(HeaderLayout).exists()).toBeTruthy();
  });

  it("render title from meta", async () => {
    const routes = [
      {
        path: "/",
        name: "Profile",
        component: () => import("@/views/Profile"),
        meta: {
          layout: "ProfileLayout",
          title: "Мои данные",
        },
      },
    ];
    createComponent(new VueRouter({ routes }));
    await flushPromises();
    expect(wrapper.find("h1").text()).toBe(routes[0].meta.title);
  });
});
