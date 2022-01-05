import CartList from "@/modules/cart/CartList";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import Vuex from "vuex";
import PizzaDescription from "@/components/PizzaDescription";

const localVue = createLocalVue();
localVue.use(Vuex);

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

describe("CartList", () => {
  let wrapper;
  const store = generateMockStore();
  const createComponent = () => {
    wrapper = shallowMount(CartList, {
      store,
      mocks: { $router: { push: jest.fn() } },
    });
  };
  const setPizza = () => {
    store.commit("Cart/SET_PIZZA", pizza);
  };

  beforeEach(() => {
    createComponent();
  });
  afterEach(() => {
    jest.clearAllMocks();
    wrapper.destroy();
  });

  it("renders with 0 cart-list__item", () => {
    expect(wrapper.findAll(".cart-list__item")).toHaveLength(0);
  });

  it("renders with 1 cart-list__item when set 1 to store", async () => {
    await setPizza();
    expect(wrapper.findAll(".cart-list__item")).toHaveLength(1);
  });

  it("renders with 1 PizzaDescription", async () => {
    await setPizza();
    expect(wrapper.findAllComponents(PizzaDescription)).toHaveLength(1);
  });

  it("invokes changeCount on decrement button click", async () => {
    await setPizza();
    const changeCountSpy = jest.spyOn(wrapper.vm, "changeCount");
    wrapper.find(".counter__button--minus").trigger("click");
    expect(changeCountSpy).toHaveBeenCalledTimes(1);
  });

  it("invokes changeCount on increment button click", async () => {
    await setPizza();
    const changeCountSpy = jest.spyOn(wrapper.vm, "changeCount");
    wrapper.find(".counter__button--plus").trigger("click");
    expect(changeCountSpy).toHaveBeenCalledTimes(1);
  });

  it("invokes goEditPizza on edit button click", async () => {
    await setPizza();
    const goEditPizzaSpy = jest.spyOn(wrapper.vm, "goEditPizza");
    wrapper.find(".cart-list__edit").trigger("click");
    expect(goEditPizzaSpy).toHaveBeenCalledTimes(1);
  });
});
