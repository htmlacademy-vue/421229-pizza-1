import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Index.vue"),
    children: [
      {
        path: "/edit/:id",
        name: "PizzaEdit",
        component: () => import("../views/Index.vue"),
      },
    ],
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart"),
    meta: {
      layout: "LayoutForm",
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile"),
    meta: {
      layout: "ProfileLayout",
    },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders"),
    meta: {
      layout: "ProfileLayout",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login"),
    meta: {
      layout: "ModalLayout",
    },
  },
  {
    path: "/order_popup",
    name: "OrderPopup",
    component: () => import("../modules/orders/OrderPopup"),
    meta: {
      layout: "ModalLayout",
    },
  },
];

const router = new VueRouter({ routes });

export default router;
