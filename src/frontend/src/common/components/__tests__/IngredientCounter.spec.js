import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import IngredientCounter from "../IngredientCounter";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("IngredientCounter", () => {
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(IngredientCounter, options);
  };
  beforeEach(() => {
    store = generateMockStore();
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    const propsData = { ingredient: { quantity: 0, id: 1 } };
    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("when ingredient quantity is 0", () => {
    const propsData = { ingredient: { quantity: 0, id: 1 } };

    it("contains disabled decrement button", () => {
      createComponent({ localVue, store, propsData });
      expect(
        wrapper.find(".counter__button--minus").element.disabled
      ).toBeTruthy();
    });

    it("contains enabled increment button", () => {
      createComponent({ localVue, store, propsData });
      expect(
        wrapper.find(".counter__button--plus").element.disabled
      ).toBeFalsy();
    });
  });

  describe("when ingredient quantity is 1", () => {
    const propsData = { ingredient: { quantity: 1, id: 1 } };

    it("contains enabled decrement button", () => {
      createComponent({ localVue, store, propsData });
      expect(
        wrapper.find(".counter__button--minus").element.disabled
      ).toBeFalsy();
    });

    it("contains enabled increment button", () => {
      createComponent({ localVue, store, propsData });
      expect(
        wrapper.find(".counter__button--plus").element.disabled
      ).toBeFalsy();
    });
  });

  describe("when ingredient quantity is 3", () => {
    const propsData = { ingredient: { quantity: 3, id: 1 } };

    it("contains enabled decrement button", () => {
      createComponent({ localVue, store, propsData });
      expect(
        wrapper.find(".counter__button--minus").element.disabled
      ).toBeFalsy();
    });

    it("contains disabled increment button", () => {
      createComponent({ localVue, store, propsData });
      expect(
        wrapper.find(".counter__button--plus").element.disabled
      ).toBeTruthy();
    });
  });

  describe("invokes updateIngredientCount on", () => {
    const propsData = { ingredient: { quantity: 1, id: 1 } };

    it("plus button click with term 1", () => {
      createComponent({ localVue, store, propsData });
      const updateIngredientCountSpy = jest.spyOn(
        wrapper.vm,
        "updateIngredientCount"
      );
      wrapper.find(".counter__button--plus").trigger("click");
      expect(updateIngredientCountSpy).toHaveBeenCalledTimes(1);
      expect(updateIngredientCountSpy).toHaveBeenCalledWith(1);
    });

    it("minus button click with term -1", () => {
      createComponent({ localVue, store, propsData });
      const updateIngredientCountSpy = jest.spyOn(
        wrapper.vm,
        "updateIngredientCount"
      );
      wrapper.find(".counter__button--minus").trigger("click");
      expect(updateIngredientCountSpy).toHaveBeenCalledTimes(1);
      expect(updateIngredientCountSpy).toHaveBeenCalledWith(-1);
    });
  });

  describe("method updateIngredientCount", () => {
    describe("when ingredient quantity is 0", () => {
      const ingredient = { quantity: 0, id: 1 };
      const propsData = { ingredient };

      it("should not invoke UPDATE_INGREDIENT on minus button click", () => {
        createComponent({ localVue, store, propsData });
        const updateIngredientMutationSpy = jest.spyOn(
          wrapper.vm,
          "updateIngredient"
        );
        wrapper.find(".counter__button--minus").trigger("click");
        expect(updateIngredientMutationSpy).toHaveBeenCalledTimes(0);
      });

      it("should invoke UPDATE_INGREDIENT on plus click", () => {
        createComponent({ localVue, store, propsData });
        const updateIngredientMutationSpy = jest.spyOn(
          wrapper.vm,
          "updateIngredient"
        );
        wrapper.find(".counter__button--plus").trigger("click");
        expect(updateIngredientMutationSpy).toHaveBeenCalledTimes(1);
      });

      it("should invoke UPDATE_INGREDIENT on plus click with quantity 1", () => {
        createComponent({ localVue, store, propsData });
        const updateIngredientMutationSpy = jest.spyOn(
          wrapper.vm,
          "updateIngredient"
        );
        wrapper.find(".counter__button--plus").trigger("click");
        expect(updateIngredientMutationSpy).toHaveBeenCalledWith({
          ...ingredient,
          quantity: 1,
        });
      });
    });

    describe("when ingredient quantity is 3", () => {
      const ingredient = { quantity: 3, id: 1 };
      const propsData = { ingredient };

      it("should not invoke UPDATE_INGREDIENT on plus button click", () => {
        createComponent({ localVue, store, propsData });
        const updateIngredientMutationSpy = jest.spyOn(
          wrapper.vm,
          "updateIngredient"
        );
        wrapper.find(".counter__button--plus").trigger("click");
        expect(updateIngredientMutationSpy).toHaveBeenCalledTimes(0);
      });

      it("should invoke UPDATE_INGREDIENT on minus click", () => {
        createComponent({ localVue, store, propsData });
        const updateIngredientMutationSpy = jest.spyOn(
          wrapper.vm,
          "updateIngredient"
        );
        wrapper.find(".counter__button--minus").trigger("click");
        expect(updateIngredientMutationSpy).toHaveBeenCalledTimes(1);
      });

      it("should invoke UPDATE_INGREDIENT on minus click with quantity 2", () => {
        createComponent({ localVue, store, propsData });
        const updateIngredientMutationSpy = jest.spyOn(
          wrapper.vm,
          "updateIngredient"
        );
        wrapper.find(".counter__button--minus").trigger("click");
        expect(updateIngredientMutationSpy).toHaveBeenCalledWith({
          ...ingredient,
          quantity: 2,
        });
      });
    });
  });
});
