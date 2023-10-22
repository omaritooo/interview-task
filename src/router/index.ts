import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import MainLayout from "../layouts/MainLayout.vue";
import { useAuthStore } from "../stores/auth.ts";
import HomeView from "../views/HomeView.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/",
        name: "Products",
        component: HomeView,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: { requiresAuth: false },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach(async (to, from, next): Promise<void> => {
  const store = await useAuthStore();
  if (to.meta.requiresAuth && !store.isLogged) {
    next("/login");
  } else if (!to.meta.requiresAuth && store.isLogged) {
    next({ name: "Home" });
  } else {
    next();
  }
});
export default router;