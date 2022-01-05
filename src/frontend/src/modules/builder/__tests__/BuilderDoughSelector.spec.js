import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import Vuex from "vuex";
import BuilderDoughSelector from "../BuilderDoughSelector";
import { SET_ENTITY } from "@/store/mutation-types";
import { getIdToItemMap } from "@/common/utils/getIdToItemMap";
import { doughTypes } from "@/common/test-utils/dough.mock";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderDoughSelector", () => {
  let wrapper;
  const updateDough = jest.fn(() => Promise.resolve(doughTypes[1]));
  const store = generateMockStore({
    Builder: { updateDough },
  });
  function setDough() {
    const map = getIdToItemMap(doughTypes);

    store.commit(SET_ENTITY, {
      entity: "dough",
      value: { list: doughTypes, map },
    });
    store.commit("Builder/UPDATE_ENTITY", {
      entity: "doughId",
      value: doughTypes[1].id,
    });
  }

  beforeEach(async () => {
    await setDough();
    wrapper = mount(BuilderDoughSelector, {
      localVue,
      store,
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("render 2 dough inputs", () => {
    expect(wrapper.findAll("[name='dough']")).toHaveLength(2);
  });

  it("render with first checked input", () => {
    expect(wrapper.find("input:checked").element.value).toBe(
      doughTypes[1].type
    );
  });

  it("render dough input with correct value", () => {
    expect(wrapper.find("[name='dough']").element.value).toBe(
      doughTypes[0].type
    );
  });

  it("invoke updateDough on change", () => {
    wrapper.find("[name='dough']").trigger("change");
    expect(updateDough).toHaveBeenCalled();
  });
});
