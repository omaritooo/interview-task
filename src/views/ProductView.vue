<template>
  <section class="overflow-hidden text-white body-font bg-site" v-if="!loading">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-wrap mx-auto lg:w-4/5">
        <img
          :alt="product.title"
          class="object-cover object-center w-full h-64 p-4 bg-white border-4 border-gray-400 rounded lg:w-1/2 lg:h-auto"
          :src="product.image"
        />
        <div class="w-full mt-6 lg:w-1/2 lg:pl-10 lg:py-6 lg:mt-0">
          <h2 class="text-sm tracking-widest text-gray-500 title-font">
            {{ product.category }}
          </h2>

          <h1 class="mb-1 text-3xl font-medium">
            {{ product.title }}
          </h1>
          <div class="flex items-center mb-4 gap-x-1">
            <i class="text-yellow-300 pi pi-star-fill"></i>
            {{ product.rating.rate }}
            <span> {{}} </span>
          </div>
          <p class="leading-relaxed">
            {{ product.description }}
          </p>

          <div class="flex mt-10">
            <span class="text-2xl font-medium">${{ product.price }}</span>
            <ButtonComponent
              class="flex px-6 py-2 ml-auto text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600"
            >
              Add to cart
            </ButtonComponent>
            <button
              class="inline-flex items-center justify-center w-10 h-10 p-0 ml-4 text-gray-500 bg-gray-200 border-0 rounded-full"
            >
              <svg
                fill="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useProductsStore } from "../stores/products.ts";
import { storeToRefs } from "pinia";

const store = useProductsStore();
const { product, loading } = storeToRefs(store);
</script>
