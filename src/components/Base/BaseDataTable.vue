<!-- eslint-disable vue/attribute-hyphenation -->

<template>
  <DataTable
    :value="props.products"
    :loading="loader"
    class="border-[1px] border-blue-950 drop-shadow-lg rounded-md shadow-md w-full lg:min-w-[80vw] px-4 sm:px-6 lg:px-10 overflow-x-scroll py-5"
  >
    <ToastComponent />
    <template #header>
      <div
        class="flex flex-wrap gap-2 mb-6 align-items-center justify-content-between"
      >
        <span class="text-xl font-bold text-900">Products</span>
      </div>
    </template>
    <Column header="Thumbnail" class="px-2 w-fit h-fit lg:px-4">
      <template #body="slotProps">
        <router-link :to="`/product/${slotProps.data.id}`">
          <img
            :src="slotProps.data.image"
            :alt="slotProps.data.image"
            class="w-full h-full rounded-md lg:w-16 lg:h-16 shadow-2 border-round"
        /></router-link> </template
    ></Column>
    <Column header="Title" class="px-4 lg:px-8">
      <template #body="slotProps">
        <router-link :to="`/product/${slotProps.data.id}`">
          {{ slotProps.data.title }}
        </router-link>
      </template></Column
    >
    <Column
      v-for="field in fields"
      :key="field.field"
      :field="field.field"
      class="p-4 sm:p-6"
      :header="field.header"
    >
    </Column>
    <Column header="Rating" class="px-4 lg:px-8">
      <template #body="slotProps">
        <span class="flex items-center gap-x-1">
          <i class="text-yellow-300 pi pi-star-fill"></i>
          {{ slotProps.data.rating.rate }}</span
        >
      </template></Column
    >
    <Column :exportable="false" class="px-3">
      <template #body="slotProps">
        <ButtonComponent
          icon="pi pi-pencil"
          outlined
          rounded
          class="mr-4"
          @click="editProduct(slotProps.data)"
        />
        <ProductDialog
          :modify="true"
          v-model:visible="visible"
          :product="slotProps.data"
        />

        <ButtonComponent
          icon="pi pi-trash"
          outlined
          rounded
          severity="danger"
          @click="removeProduct(slotProps.data.id)"
        />
      </template>
    </Column>
    <template #footer>
      In total there are {{ products ? products.length : 0 }} products.
    </template>
  </DataTable>
</template>
<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { computed, PropType, ref } from "vue";
import Product from "../typing/index.ts";
import { RouterLink } from "vue-router";
import ProductDialog from "../Product/ProductDialog.vue";
import { useProductsStore } from "../../stores/products.ts";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const { deleteProduct } = useProductsStore();
const props = defineProps({
  products: {
    type: Array as PropType<Product[]>,
    default: () => [],
  },
  loader: {
    type: Boolean,
    default: false,
  },
});
const visible = ref(false);

const editProduct = () => {
  visible.value = true;
};
const removeProduct = async (id: number) => {
  try {
    const response = await deleteProduct(id);
    if (response) {
      toast.add({
        severity: "success",
        summary: "Product deleted",
        detail: "Your product has deleted",
        life: 3000,
      });
    } else {
      toast.add({
        severity: "error",
        summary: "Product not deleted",
        detail: "Your product has validation errors",
        life: 3000,
      });
    }
  } catch (err) {
    throw new err();
  }
};

const fields = computed(() => {
  let fieldsMap = [];
  let excludedFields = ["id", "image", "rating", "title"];
  if (props.products.length > 0) {
    fieldsMap = Object.keys(props.products[0])
      .filter((el) => {
        return !excludedFields.includes(el);
      })
      .map((el) => {
        if (el !== "id" && el !== "image") {
          return {
            field: el,
            header: el.charAt(0).toUpperCase() + el.slice(1),
          };
        }
      });
  }
  return fieldsMap;
});
</script>
