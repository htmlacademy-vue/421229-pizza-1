import store from "@/store";
import Vue from "vue";
import VueRouter from "vue-router";
import { auth, isLoggedIn, middlewarePipeline } from "@/middlewares";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/IndexHome.vue"),
    children: [
      {
        path: "/edit/:id",
        name: "PizzaEdit",
        component: () => import("../views/IndexHome.vue"),
        meta: {
          middlewares: [auth],
        },
      },
    ],
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/CartView"),
    meta: {
      layout: "LayoutForm",
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/ProfileView"),
    meta: {
      layout: "ProfileLayout",
      title: "Мои данные",
      middlewares: [auth],
    },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/OrdersView"),
    meta: {
      layout: "ProfileLayout",
      title: "История заказов",
      middlewares: [auth],
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginView"),
    meta: {
      layout: "ModalLayout",
      middlewares: [isLoggedIn],
    },
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const middlewares = to.meta.middlewares;
  if (!middlewares?.length) {
    return next();
  }

  const context = { to, from, next, store };
  const firstMiddlewareIndex = 0;
  const nextMiddlewareIndex = 1;
  return middlewares[firstMiddlewareIndex]({
    ...context,
    nextMiddleware: middlewarePipeline(
      context,
      middlewares,
      nextMiddlewareIndex
    ),
  });
});

export default router;
