import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import Vuex from "vuex";
import BuilderSizeSelector from "../BuilderSizeSelector";
import { setSizes } from "../../../common/test-utils/root";
import { setActiveSize } from "../../../common/test-utils/builder";
import { sizesMock } from "../../../common/test-utils/sizes.mock";

const localVue = createLocalVue();
localVue.use(Vuex);

const activeSize = sizesMock[0].id;

describe("BuilderSizeSelector", () => {
  let wrapper;
  const updateSize = jest.fn();
  const store = generateMockStore({
    Builder: { updateSize },
  });
  const createComponent = () => {
    wrapper = mount(BuilderSizeSelector, { localVue, store });
  };

  beforeEach(async () => {
    await setSizes(store);
    await setActiveSize(store, activeSize);
    createComponent();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("render diameter__input with correct modifier", () => {
    expect(wrapper.find(".diameter__input").element.className).toBe(
      "diameter__input diameter__input--small"
    );
  });

  it("invoke updateSize on change", async () => {
    createComponent();
    wrapper.find("[name='diameter']").trigger("change");
    expect(updateSize).toHaveBeenCalledTimes(1);
  });
});
