import { shallowMount } from "@vue/test-utils";
import IngredientName from "../IngredientName";

describe("IngredientName", () => {
  const props = { ingredient: { nameLat: "modifier", name: "ingredient" } };
  let wrapper;

  const createWrapper = (options) => {
    wrapper = shallowMount(IngredientName, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders with ingredient name === ingredient.name", () => {
    createWrapper({ propsData: props });
    expect(wrapper.find(".filling").element.textContent.trim()).toBe(
      props.ingredient.name
    );
  });

  it("renders with ingredient modifier === filling--modifier", () => {
    createWrapper({ propsData: props });
    expect(wrapper.find(".filling.filling--modifier").exists()).toBeTruthy();
  });
});
