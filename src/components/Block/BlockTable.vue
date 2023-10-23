<template>
  <section
    class="container flex flex-col justify-center w-screen min-h-screen px-5 py-8 searchText-white sm:px-10 sm:py-12"
  >
    <ProductDialog v-model:visible="visible" />
    <ToolbarComponent>
      <template #start>
        <DropdownComponent
          v-model="sortProducts"
          :options="['asc', 'desc']"
          placeholder="Sorting"
          class="w-full md:w-full"
        />
      </template>

      <template #center>
        <Transition>
          <BaseInput v-if="show" v-model="searchText" />
        </Transition>
      </template>

      <template #end>
        <ButtonComponent
          icon="pi pi-search"
          severity="success"
          @click="show = !show"
          class="ml-5 mr-2"
        />
        <ButtonComponent
          icon="pi pi-plus"
          class="mr-2"
          @click="visible = true"
        />
      </template>
    </ToolbarComponent>
    <BaseDataTable :loader="loading" :products="products" />
    <div class="flex justify-end w-full mt-10 h-fit">
      <div class="w-fit">
        <DropdownComponent
          v-model="selectedLimit"
          :options="limits"
          placeholder="Pagination"
          class="w-full md:w-full"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useProductsStore } from "../../stores/products.ts";
import ProductDialog from "../Product/ProductDialog.vue";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";

const selectedLimit = ref("5");
const limits = ref(["5", "10", "20", "50"]);
const store = useProductsStore();
const { loading, products } = storeToRefs(store);
const { fetchProducts, searchProducts } = store;
const show = ref(false);
const searchText = ref("");
const visible = ref(false);
const sortProducts = ref("desc");

watch(selectedLimit, async (newVal) => {
  try {
    fetchProducts(newVal, sortProducts.value);
  } catch (err) {
    throw new err();
  }
});

watch(sortProducts, async (newVal) => {
  try {
    fetchProducts(selectedLimit.value, newVal);
  } catch (err) {
    throw new err();
  }
});

watch(searchText, async (newVal) => {
  searchProducts(newVal);
});
</script>
