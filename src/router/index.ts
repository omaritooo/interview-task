import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import MainLayout from "../layouts/MainLayout.vue";
import { useAuthStore } from "../stores/auth.ts";
import { useProductsStore } from "../stores/products.ts";
import HomeView from "../views/HomeView.vue";
import ProductView from "../views/ProductView.vue";
import CategoryView from "../views/CategoryView.vue";
import ErrorView from "../views/ErrorView.vue";
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
      {
        path: "/product/:id",
        name: "Product",
        component: ProductView,
        meta: { requiresAuth: true },
      },
      {
        path: "/category/:name",
        name: "Category",
        component: CategoryView,
        meta: { requiredAuth: true },
      },
      {
        path: "/:pathMatch(.*)*",
        name: "Error",
        component: ErrorView,
        meta: { requiredAuth: true },
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
  } else if (to.name == "Login" && store.isLogged) {
    next("/");
  } else {
    next();
  }
});

router.beforeResolve(async (to) => {
  if (to.name === "Product") {
    const { id } = to.params;
    const store = await useProductsStore();
    const { fetchProduct } = store;
    await fetchProduct(id);
  }
  if (to.name === "Products") {
    const store = await useProductsStore();
    const { fetchProducts } = store;
    await fetchProducts();
  }
  if (to.name === "Category") {
    const { name } = to.params;

    const store = await useProductsStore();
    const { fetchProducts } = store;
    await fetchProducts(5, "desc", name);
  }
});
export default router;
