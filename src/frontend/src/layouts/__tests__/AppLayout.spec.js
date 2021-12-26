import { mount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import AppLayout from "../AppLayout";
import router from "../../router/routes";
import { generateMockStore } from "@/store/mocks";
import { flushPromises } from "../../common/test-utils/flush-promises";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("AppLayout", () => {
  let wrapper;
  const slots = { slotContent: "content" };
  const createComponent = (slots, routerMock) => {
    wrapper = mount(AppLayout, {
      router: routerMock || router,
      localVue,
      slots,
      store: generateMockStore(),
    });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("render the slot content", async () => {
    createComponent(slots);
    await flushPromises();
    expect(wrapper.html()).toContain(slots.slotContent);
    expect(wrapper.find("[data-test='default-layout']").exists()).toBeTruthy();
  });

  it("render default layout", async () => {
    createComponent();
    await flushPromises();
    expect(wrapper.find("[data-test='default-layout']").exists()).toBeTruthy();
  });

  it("render layout from meta", async () => {
    createComponent(
      slots,
      new VueRouter({
        routes: [
          {
            path: "/",
            name: "Profile",
            component: () => import("@/views/Profile"),
            meta: {
              layout: "ProfileLayout",
              title: "Мои данные",
            },
          },
        ],
      })
    );
    await flushPromises();
    expect(wrapper.find("[data-test='profile-layout']").exists()).toBeTruthy();
  });
});
