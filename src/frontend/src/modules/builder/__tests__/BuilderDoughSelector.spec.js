import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import Vuex from "vuex";
import BuilderDoughSelector from "../BuilderDoughSelector";
import { SET_ENTITY } from "../../../store/mutation-types";
import { getIdToItemMap } from "../../../common/utils/getIdToItemMap";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderDoughSelector", () => {
  let wrapper;
  const list = [
    {
      id: 1,
      name: "Тонкое",
      image: "/public/img/dough-light.svg",
      description: "Из твердых сортов пшеницы",
      price: 300,
      type: "light",
    },
    {
      id: 2,
      name: "Толстое",
      image: "/public/img/dough-large.svg",
      description: "Из твердых сортов пшеницы",
      price: 300,
      type: "large",
    },
  ];
  const updateDough = jest.fn(() => Promise.resolve(list[1]));
  const store = generateMockStore({
    Builder: { updateDough },
  });
  function setDough() {
    const map = getIdToItemMap(list);

    store.commit(SET_ENTITY, {
      entity: "dough",
      value: { list, map },
    });
    store.commit("Builder/UPDATE_ENTITY", {
      entity: "doughId",
      value: list[1].id,
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
    expect(wrapper.find("input:checked").element.value).toBe(list[1].type);
  });

  it("render dough input with correct value", () => {
    expect(wrapper.find("[name='dough']").element.value).toBe(list[0].type);
  });

  it("invoke updateDough on change", () => {
    wrapper.find("[name='dough']").trigger("change");
    expect(updateDough).toHaveBeenCalled();
  });
});
