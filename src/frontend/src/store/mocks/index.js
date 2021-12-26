import { cloneDeep } from "lodash";

import { mutations } from "@/store";
import modules from "@/store/modules";
import Vuex from "vuex";

import VuexPlugins from "@/plugins/vuexPlugins";
import { getInitialState } from "../index";

export const generateMockStore = (actions, getters) => {
  const modulesCopy = cloneDeep(modules);
  if (actions) {
    Object.entries(actions).forEach(([module, actions]) => {
      modulesCopy[module] = { ...modulesCopy[module], actions };
    });
  }

  return new Vuex.Store({
    state: getInitialState(),
    mutations,
    modules: modulesCopy,
    plugins: [VuexPlugins],
    getters,
  });
};
