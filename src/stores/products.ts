import { defineStore } from "pinia";
import { ref } from "vue";
import { Product } from "../typing/index.ts";

export const useProductsStore = defineStore("Products", () => {
  const products = ref<Product[]>([]);
  const loading = ref<Boolean>(false);
  const error = ref<Error | null>();

  const fetchProducts = async () => {
    try {
      products.value = [];
      loading.value = true;
      const request = await fetch(
        `${import.meta.env.VITE_BASE_URL}products`
      ).then((res) => res.json());
      console.log(request);

      products.value = request;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return { products, fetchProducts };
});
