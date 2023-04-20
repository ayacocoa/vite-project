import { createRouter, createWebHashHistory } from "vue-router";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../pages/index/Index.vue"),
    },
    {
      path: "/index",
      component: () => import("../pages/index/Index.vue"),
      
    },
    {
      path: "/team",
      component: () => import("../pages/team/Team.vue"),
    },
    {
      path: "/team/add",
      component: () => import("../pages/team/TeamAdd.vue"),
    },
    {
      path: "/team/update",
      component: () => import("../pages/team/TeamUpdate.vue"),
    },
    {
      path: "/user",
      component: () => import("../pages/user/User.vue"),
    },
    {
      path: "/user/edit",
      component: () => import("../pages/user/Edit.vue"),
    },
    {
      path: "/user/list",
      component: () => import("../pages/search/SearchResult.vue"),
    },
    {
      path: "/user/login",
      component: () => import("../pages/user/UserLogin.vue"),
    },
    {
      path: "/user/update",
      component: () => import("../pages/user/UserUpdate.vue"),
    },
    {
      path: "/user/team/create",
      component: () => import("../pages/team/TeamCreated.vue"),
    },
    {
      path: "/user/team/join",
      component: () => import("../pages/team/TeamJoin.vue"),
    },
    {
      path: "/search",
      component: () => import("../pages/search/Search.vue"),
    }
  ],
});
