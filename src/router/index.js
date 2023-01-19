import Vue from "vue";
import VueRouter from "vue-router";

// import { store } from "../store/index.js";``
import FreeTownView from "../views/FreeTownView.vue";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/myWallet",
    },

    {
      path: "/myWallet",
      name: "myWallet",
      component: FreeTownView,
    },
  ],
});
