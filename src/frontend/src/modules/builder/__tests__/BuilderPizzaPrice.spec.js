import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import Vuex from "vuex";
import BuilderPizzaPrice from "../BuilderPizzaPrice";
import {
  setActiveIngredient,
  setPizzaName,
} from "../../../common/test-utils/builder";
import { getMushroomWithQty } from "../../../common/test-utils/ingredients.mock";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderPizzaPrice", () => {
  let wrapper;
  const setPizza = jest.fn();
  const resetPizza = jest.fn();
  const store = generateMockStore({
    Cart: { setPizza },
    Builder: { resetPizza },
  });

  beforeEach(() => {
    wrapper = mount(BuilderPizzaPrice, { localVue, store });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders with disabled button by default", () => {
    expect(wrapper.find("button").element.disabled).toBeTruthy();
  });

  it("renders with enabled button if pizza name and active ingredients set", async () => {
    await setActiveIngredient(store, getMushroomWithQty(2));
    await setPizzaName(store, "pizza name");
    expect(wrapper.find("button").element.disabled).toBeFalsy();
  });

  it("invoke setPizza and resetPizza on button click", () => {
    wrapper.find("button").trigger("click");
    expect(setPizza).toHaveBeenCalledTimes(1);
    expect(resetPizza).toHaveBeenCalledTimes(1);
  });
});
