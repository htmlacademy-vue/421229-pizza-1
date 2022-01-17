import IndexHome from "@/views/IndexHome";
import { shallowMount } from "@vue/test-utils";
import BuilderDoughSelector from "@/modules/builder/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/BuilderPizzaView";
import BuilderSauceSelector from "@/modules/builder/BuilderSauceSelector";

describe("IndexHome", () => {
  let wrapper;
  const createComponent = () => {
    wrapper = shallowMount(IndexHome);
  };

  beforeEach(() => {
    createComponent();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders with BuilderDoughSelector", () => {
    expect(wrapper.findComponent(BuilderDoughSelector).exists()).toBeTruthy();
  });

  it("renders with BuilderSizeSelector", () => {
    expect(wrapper.findComponent(BuilderSizeSelector).exists()).toBeTruthy();
  });

  it("renders with BuilderIngredientsSelector", () => {
    expect(wrapper.findComponent(BuilderIngredientsSelector).exists()).toBeTruthy();
  });

  it("renders with BuilderPizzaView", () => {
    expect(wrapper.findComponent(BuilderPizzaView).exists()).toBeTruthy();
  });

  it("renders with BuilderSauceSelector", () => {
    expect(wrapper.findComponent(BuilderSauceSelector).exists()).toBeTruthy();
  });
});
