import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import Vuex from "vuex";
import BuilderIngredient from "../BuilderIngredient";
import AppDrag from "../../../common/components/AppDrag";
import IngredientName from "../../../common/components/IngredientName";
import IngredientCounter from "../../../common/components/IngredientCounter";

const localVue = createLocalVue();
localVue.use(Vuex);

const ingredient = {
  id: 1,
  name: "Грибы",
  image: "/public/img/filling/mushrooms.svg",
  price: 33,
  nameLat: "mushrooms",
  quantity: 1,
};

describe("BuilderIngredient", () => {
  let wrapper;
  const store = generateMockStore({ Builder: { updateDough: jest.fn() } });

  beforeEach(() => {
    wrapper = mount(BuilderIngredient, {
      localVue,
      store,
      propsData: { ingredient },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders with AppDrag component", () => {
    expect(wrapper.findComponent(AppDrag).exists()).toBeTruthy();
  });

  it("renders with IngredientName component", () => {
    expect(wrapper.findComponent(IngredientName).exists()).toBeTruthy();
  });

  it("renders with IngredientCounter component", () => {
    expect(wrapper.findComponent(IngredientCounter).exists()).toBeTruthy();
  });

  it("renders with AppDrag draggable true", () => {
    expect(wrapper.findComponent(AppDrag).props().draggable).toBeTruthy();
  });

  it("renders with AppDrag draggable false if ingredient quantity is 3", () => {
    wrapper.setProps({ ingredient: { ...ingredient, quantity: 3 } });
    expect(wrapper.findComponent(AppDrag).props().draggable).toBeTruthy();
  });
});
