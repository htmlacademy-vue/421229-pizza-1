import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import PizzaDescription from "../PizzaDescription";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("PizzaDescription", () => {
  const pizza = {
    id: 1,
    name: "pizza",
    quantity: 2,
    sauce: { name: "Creamy" },
    dough: { prepositional: "thin" },
    size: { name: "big" },
    ingredients: [
      { id: 4, name: "Ingredient", quantity: 1 },
      { id: 2, name: "Ingredient2", quantity: 3 },
    ],
  };
  let store;
  let wrapper;
  const propsData = { pizza };

  const createComponent = (options) => {
    wrapper = mount(PizzaDescription, {
      ...options,
      propsData: options.propsData || { pizza },
    });
  };
  beforeEach(() => {
    store = generateMockStore();
  });
  afterEach(() => {
    wrapper && wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders with additional class if passed", () => {
    const propsData = { pizza, additionalClass: "additionalClass" };
    createComponent({ localVue, store, propsData });
    expect(wrapper.find(".product.additionalClass").exists()).toBeTruthy();
  });

  it("renders with correct computed filling", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.find("[data-test='filling']").text()).toBe(
      "Начинка: ingredient, ingredient2"
    );
  });

  it("renders with correct computed sauceName", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.find("[data-test='sauce']").text()).toBe("Соус: creamy");
  });

  it("renders with correct computed sizeDough", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.find("[data-test='sizeDough']").text()).toBe(
      "big, на thin тесте"
    );
  });
});
