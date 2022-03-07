import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MainView from "../views/MainView.vue";
import AuthView from "../views/AuthView.vue";
import GroupView from "../views/GroupView.vue";
import { checkAuth, docExistsGuard } from "@/FB_Queries/groups";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: MainView,
    beforeEnter: checkAuth,
  },
  {
    path: "/group/:groupId",
    name: "group",
    beforeEnter: docExistsGuard,
    component: GroupView,
  },
  {
    path: "/login",
    name: "login",
    component: AuthView,
  },
  {
    path: "/registration",
    name: "registration",
    component: AuthView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
