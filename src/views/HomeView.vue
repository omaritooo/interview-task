<template>
  <section class="container w-screen h-screen bg-red-500">Test</section>
</template>
<script setup lang="ts">
import { useProductsStore } from "../stores/products.ts";
const store = useProductsStore();
const { fetchProducts } = store;
const { requestState } = fetchProducts();
console.log(requestState);
</script>
