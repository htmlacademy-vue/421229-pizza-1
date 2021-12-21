import { shallowMount } from "@vue/test-utils";
import RadioButton from "../RadioButton";

describe("RadioButton", () => {
  const propsData = { variant: { value: "123", name: "label" }, name: "radio" };
  let wrapper;

  const createWrapper = (options) => {
    wrapper = shallowMount(RadioButton, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders not checked by default", () => {
    createWrapper({ propsData });
    expect(wrapper.find("input").element.checked).toBeFalsy();
  });

  it("renders checked if isChecked=true passed", () => {
    createWrapper({ propsData: { ...propsData, isChecked: true } });
    expect(wrapper.find("input").element.checked).toBeTruthy();
  });

  it("renders with input value === variant.value", () => {
    createWrapper({ propsData });
    expect(wrapper.find("input").element.value).toBe(propsData.variant.value);
  });

  it("renders with label text === variant.name", () => {
    createWrapper({ propsData });
    expect(wrapper.find("span").element.textContent).toBe(
      propsData.variant.name
    );
  });

  it("renders with input name === name", () => {
    createWrapper({ propsData });
    expect(wrapper.find("input").element.name).toBe(propsData.name);
  });

  it("emits onChange handler on change", () => {
    createWrapper({ propsData });
    const input = wrapper.find("input");
    input.trigger("change");
    expect(wrapper.emitted("onChange")).toBeTruthy();
  });
});
