import { mount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import DefaultLayout from "../DefaultLayout";
import router from "../../router/routes";
import { generateMockStore } from "../../store/mocks";
import HeaderLayout from "../HeaderLayout";
import { flushPromises } from "../../common/test-utils/flush-promises";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("DefaultLayout", () => {
  let wrapper;
  const slots = { slotContent: "content" };
  const createComponent = (slots, routerMock) => {
    wrapper = mount(DefaultLayout, {
      router: routerMock || router,
      localVue,
      slots,
      store: generateMockStore(),
    });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("render with HeaderLayout", async () => {
    createComponent();
    expect(wrapper.findComponent(HeaderLayout).exists()).toBeTruthy();
  });

  it("render with slot", async () => {
    createComponent(slots);
    await flushPromises();
    expect(wrapper.find(".content").html()).toContain(slots.slotContent);
  });
});
