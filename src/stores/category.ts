import { defineStore } from "pinia";
import { ref } from "vue";
import Product from "../typing/index.ts";

export const useCategoryStore = defineStore("Categories", () => {
  const category = ref<Product[]>(null);
  const loading = ref<Boolean>(false);
  const error = ref<Error | null>();
  const fetchCategory = (payload: string) => {
    try {
      const request = await fetch(
        `${import.meta.env.VITE_BASE_URL}products?limit=${limit}&sort=${sort}`
      ).then((res) => res.json());

      return request;
    } catch (err) {
      error.value = err;
    }
  };
});
