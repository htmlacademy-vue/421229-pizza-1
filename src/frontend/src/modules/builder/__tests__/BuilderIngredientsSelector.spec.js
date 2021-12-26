import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import Vuex from "vuex";
import BuilderIngredient from "../BuilderIngredient";
import BuilderIngredientsSelector from "../BuilderIngredientsSelector";
import {
  getMushroomWithQty,
  getSalamiWithQty,
} from "../../../common/test-utils/ingredients.mock";

const localVue = createLocalVue();
localVue.use(Vuex);

const ingredient = getMushroomWithQty(1);

describe("BuilderIngredientsSelector", () => {
  let wrapper;
  const slots = { slotContent: "content" };
  const store = generateMockStore(undefined, {
    ingredients: () => [ingredient, getSalamiWithQty(2)],
  });

  beforeEach(() => {
    wrapper = mount(BuilderIngredientsSelector, {
      localVue,
      store,
      slots,
      propsData: { ingredient },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders with 2 BuilderIngredient components", () => {
    expect(wrapper.findAllComponents(BuilderIngredient)).toHaveLength(2);
  });

  it("renders with slot", () => {
    expect(wrapper.find(".sheet__content.ingredients").html()).toContain(
      slots.slotContent
    );
  });
});
