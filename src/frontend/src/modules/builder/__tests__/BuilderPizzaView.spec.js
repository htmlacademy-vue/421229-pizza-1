import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import Vuex from "vuex";
import BuilderPizzaView from "../BuilderPizzaView";
import {
  setActiveDough,
  setActiveIngredient,
  setActiveSauce,
  setPizzaName,
} from "../../../common/test-utils/builder";
import { setPizza } from "../../../common/test-utils/cart";
import {
  getMushroomWithQty,
  getSalamiWithQty,
} from "../../../common/test-utils/ingredients.mock";
import {
  setDough,
  setIngredients,
  setSauces,
} from "../../../common/test-utils/root";
import { doughTypes } from "../../../common/test-utils/dough.mock";
import { saucesMock } from "../../../common/test-utils/sauce.mock";

const localVue = createLocalVue();
localVue.use(Vuex);

const mushroom = getMushroomWithQty(2);
const salami = getSalamiWithQty(1);
const mocks = {
  $route: {
    params: {
      id: null,
    },
  },
};

describe("BuilderPizzaView", () => {
  let wrapper;
  const editPizza = jest.fn();
  const store = generateMockStore({
    Builder: { editPizza },
  });
  const createComponent = () => {
    wrapper = mount(BuilderPizzaView, { localVue, store, mocks });
  };

  beforeEach(async () => {
    await setDough(store);
    await setPizza(store);
    await setSauces(store);
    await setIngredients(store, [mushroom, salami]);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders with pizza_name input value = pizza.name", async () => {
    createComponent();
    const pizzaName = "pizza name";
    await setPizzaName(store, pizzaName);
    expect(wrapper.find("[name='pizza_name']").element.value).toBe(pizzaName);
  });

  it("not invoke editPizza when created if params id not set", () => {
    createComponent();
    expect(editPizza).toHaveBeenCalledTimes(0);
  });

  it("invoke editPizza when created if params id set", () => {
    mocks.$route.params.id = 2;
    createComponent();
    expect(editPizza).toHaveBeenCalledTimes(1);
  });

  it("renders with pizza__filling count = active ingredients set count", async () => {
    createComponent();
    await setActiveIngredient(store, mushroom);
    expect(wrapper.findAll(".pizza__filling")).toHaveLength(1);
    await setActiveIngredient(store, salami);
    expect(wrapper.findAll(".pizza__filling")).toHaveLength(2);
  });

  it("renders pizza with correct modifier", async () => {
    createComponent();
    await setActiveSauce(store, saucesMock[1].id);
    await setActiveDough(store, doughTypes[1].id);
    expect(wrapper.find(".pizza").element.className).toBe(
      "pizza pizza--foundation--big-creamy"
    );
    await setActiveSauce(store, saucesMock[0].id);
    await setActiveDough(store, doughTypes[0].id);
    expect(wrapper.find(".pizza").element.className).toBe(
      "pizza pizza--foundation--small-tomato"
    );
  });
});
