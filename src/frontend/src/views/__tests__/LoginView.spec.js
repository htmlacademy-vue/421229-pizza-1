import LoginView from "@/views/LoginView";
import { shallowMount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";

describe("LoginView", () => {
  let wrapper;
  const login = jest.fn();
  const routerPush = jest.fn();
  const store = generateMockStore({ User: { login } });
  const createComponent = () => {
    wrapper = shallowMount(LoginView, {
      store,
      stubs: ["router-link"],
      mocks: { $router: { push: routerPush } },
    });
  };

  beforeEach(() => {
    createComponent();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("do not invoke login when mail & password fields not filled", () => {
    wrapper.find("form").trigger("submit");
    expect(login).toHaveBeenCalledTimes(0);
  });

  it("do not invoke login when password field not filled", () => {
    wrapper.find("input[name='email']").element.value = "example@mail.ru";
    wrapper.find("form").trigger("submit");
    expect(login).toHaveBeenCalledTimes(0);
  });

  it("do not invoke login when email field not filled", () => {
    wrapper.find("input[name='pass']").element.value = "pass";
    wrapper.find("form").trigger("submit");
    expect(login).toHaveBeenCalledTimes(0);
  });

  it("invoke login when email and password fields filled", () => {
    const email = "example@mail.ru";
    const pass = "pass";
    wrapper.find("input[name='email']").element.value = email;
    wrapper.find("input[name='pass']").element.value = pass;
    wrapper.find("form").trigger("submit");
    expect(login).toHaveBeenCalledWith(expect.any(Object), {
      email,
      password: pass,
    });
  });
});
