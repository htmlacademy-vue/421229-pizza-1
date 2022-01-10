import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import IngredientCounter from "../IngredientCounter";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("IngredientCounter", () => {
  let store;
  let wrapper;

  const createComponent = (propsData) => {
    wrapper = mount(IngredientCounter, { store, localVue, propsData });
  };
  beforeEach(() => {
    store = generateMockStore({ Builder: { editPizza: jest.fn() } });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    const propsData = { ingredient: { quantity: 0, id: 1 } };
    createComponent(propsData);
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("when ingredient quantity is 0", () => {
    const propsData = { ingredient: { quantity: 0, id: 1 } };

    it("contains disabled decrement button", () => {
      createComponent(propsData);
      expect(
        wrapper.find(".counter__button--minus").element.disabled
      ).toBeTruthy();
    });

    it("contains enabled increment button", () => {
      createComponent(propsData);
      expect(
        wrapper.find(".counter__button--plus").element.disabled
      ).toBeFalsy();
    });
  });

  describe("when ingredient quantity is 1", () => {
    const propsData = { ingredient: { quantity: 1, id: 1 } };

    it("contains enabled decrement button", () => {
      createComponent(propsData);
      expect(
        wrapper.find(".counter__button--minus").element.disabled
      ).toBeFalsy();
    });

    it("contains enabled increment button", () => {
      createComponent(propsData);
      expect(
        wrapper.find(".counter__button--plus").element.disabled
      ).toBeFalsy();
    });
  });

  describe("when ingredient quantity is 3", () => {
    const propsData = { ingredient: { quantity: 3, id: 1 } };

    it("contains enabled decrement button", () => {
      createComponent(propsData);
      expect(
        wrapper.find(".counter__button--minus").element.disabled
      ).toBeFalsy();
    });

    it("contains disabled increment button", () => {
      createComponent(propsData);
      expect(
        wrapper.find(".counter__button--plus").element.disabled
      ).toBeTruthy();
    });
  });

  describe("mutation updateIngredientCount change store correctly on plus button click", () => {
    it("when ingredient quantity is 0", () => {
      const ingredient = { quantity: 0, id: 1 };
      const propsData = { ingredient };

      createComponent(propsData);
      wrapper.find(".counter__button--plus").trigger("click");
      expect(store.state["Builder"].pizza.ingredients[0].quantity).toBe(
        ingredient.quantity + 1
      );
    });

    it("when ingredient quantity is 2", () => {
      const ingredient = { quantity: 2, id: 1 };
      const propsData = { ingredient };

      createComponent(propsData);
      wrapper.find(".counter__button--plus").trigger("click");
      expect(store.state["Builder"].pizza.ingredients[0].quantity).toBe(
        ingredient.quantity + 1
      );
    });

    it("when ingredient quantity is 3", () => {
      const ingredient = { quantity: 2, id: 1 };
      const propsData = { ingredient };

      createComponent(propsData);
      wrapper.find(".counter__button--plus").trigger("click");
      expect(store.state["Builder"].pizza.ingredients[0].quantity).toBe(3);

      wrapper.find(".counter__button--plus").trigger("click");
      expect(store.state["Builder"].pizza.ingredients[0].quantity).toBe(3);
    });
  });

  describe("mutation updateIngredientCount change store correctly on minus button click", () => {
    it("when ingredient quantity is 2", () => {
      const ingredient = { quantity: 2, id: 1 };
      const propsData = { ingredient };
      createComponent(propsData);
      wrapper.find(".counter__button--minus").trigger("click");
      expect(store.state["Builder"].pizza.ingredients[0].quantity).toBe(1);
    });

    it("when ingredient quantity is 0", () => {
      const ingredient = { quantity: 1, id: 1 };
      const propsData = { ingredient };
      createComponent(propsData);
      wrapper.find(".counter__button--minus").trigger("click");
      expect(store.state["Builder"].pizza.ingredients[0].quantity).toBe(0);

      wrapper.find(".counter__button--minus").trigger("click");
      expect(store.state["Builder"].pizza.ingredients[0].quantity).toBe(0);
    });
  });
});
