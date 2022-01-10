import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import Vuex from "vuex";
import BuilderSauceSelector from "../BuilderSauceSelector";
import { setActiveSauce } from "../../../common/test-utils/builder";
import { setSauces } from "../../../common/test-utils/root";
import { saucesMock } from "../../../common/test-utils/sauce.mock";
import RadioButton from "../../../common/components/RadioButton";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderSauceSelector", () => {
  let wrapper;
  const updateSauce = jest.fn();
  const store = generateMockStore({
    Builder: { updateSauce },
  });
  const createComponent = () => {
    wrapper = mount(BuilderSauceSelector, { localVue, store });
  };

  beforeEach(async () => {
    await setSauces(store);
    await setActiveSauce(store, saucesMock[0].id);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("render 2 RadioButtons", () => {
    createComponent();
    expect(wrapper.findAllComponents(RadioButton)).toHaveLength(2);
  });

  it("invoke updateSauce on change", async () => {
    createComponent();
    wrapper.findComponent(RadioButton).vm.$emit("onChange");
    expect(updateSauce).toHaveBeenCalledTimes(1);
  });
});
