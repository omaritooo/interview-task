import { defineStore } from "pinia";
import { ref } from "vue";
import { Product } from "../typing/index.ts";

type newProduct = Omit<Product, "id", "rating">;

export const useProductsStore = defineStore("Products", () => {
  const products = ref<Product[]>([]);
  const product = ref<Product | null>(null);
  const loading = ref<Boolean>(false);
  const error = ref<Error | null>();

  const fetchProducts = async (limit = 5, sort = "desc", category = "") => {
    let url = `${import.meta.env.VITE_BASE_URL}products`;
    let limits = `?limit=${limit}&sort=${sort}`;

    if (category) {
      url = url + "/category/" + category + limits;
    } else {
      url = url + limits;
    }

    try {
      products.value = [];
      loading.value = true;
      const request = await fetch(url).then((res) => res.json());
      products.value = request;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  const fetchProduct = async (id: string) => {
    try {
      product.value = null;
      loading.value = true;
      const request = await fetch(
        `${import.meta.env.VITE_BASE_URL}products/${id}`
      ).then((res) => res.json());

      product.value = request;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  const addProduct = async (payload: newProduct) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}products/`,
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      ).then((res) => res.json());
      return response;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };
  const updateProduct = async (id: number, payload: newProduct) => {
    try {
      loading.value = true;
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}products/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(payload),
        }
      ).then((res) => res.json());
      return response;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };
  const deleteProduct = async (id: number) => {
    try {
      loading.value = true;

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}products/${id}`,
        {
          method: "DELETE",
        }
      ).then((res) => res.json());

      return response;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  const searchProducts = async (search = "") => {
    if (search) {
      products.value = products.value.filter((el) => el.title.includes(search));
    } else {
      fetchProducts();
    }
  };

  return {
    products,
    fetchProducts,
    fetchProduct,
    deleteProduct,
    addProduct,
    updateProduct,
    product,
    searchProducts,
    loading,
    error,
  };
});
