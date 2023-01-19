import Vue from "vue";
import Vuex from "vuex";

import freetownNewsStore from "./module/freetownNews";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    freetownNewsStore,
  },
});
