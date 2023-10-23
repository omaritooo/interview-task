<template>
  <Dialog
    :modelValue:visible="modelValue"
    @update:modelValue="(newValue: any) => $emit('update:modelValue', newValue)"
    header="Header"
    :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
  >
    <template #closeicon>
      <ButtonComponent icon="pi pi-times" />
    </template>
    <form class="flex flex-col w-full px-6 gap-y-4">
      <BaseInput
        validator="title"
        :errors="errors"
        v-model="product.title"
        label="title"
      />
      <BaseInput
        :errors="errors"
        validator="description"
        type="textfield"
        v-model.trim="product.description"
        label="Description"
      />
      <BaseInput
        :errors="errors"
        validator="category"
        v-model="product.category"
        label="category"
      />
      <BaseInput
        :errors="errors"
        v-model.number="product.price"
        validator="price"
        type="number"
        label="Price"
      />
      <BaseInput
        :errors="errors"
        validator="image"
        v-model="product.image"
        label="Thumbnail"
      />
      <div class="flex justify-between w-full mt-5">
        <ButtonComponent
          v-if="modify"
          @click="modifyProduct"
          label="Update Product"
        />
        <ButtonComponent v-else @click="newProduct" label="Add Product" />
        <ButtonComponent label="Clear Form" />
        <ToastComponent />
      </div>
    </form>
  </Dialog>
</template>
<script setup lang="ts">
import Dialog from "primevue/dialog";
import { toRefs, ref, PropType } from "vue";
import { Product } from "../../typing/index.ts";
import { z } from "zod";
import { useProductsStore } from "../../stores/products.ts";
import { productSchema, productSchemaType } from "./productSchema.ts";
import { useToast } from "primevue/usetoast";

const { addProduct, updateProduct } = useProductsStore();
const toast = useToast();

const errors = ref<z.ZodFormattedError<productSchemaType> | null>(null);

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  modify: {
    type: Boolean,
    default: false,
  },
  product: {
    type: Object as PropType<Product>,
    default: () => ({
      title: "",
      description: "",
      category: "",
      price: 0,
      image: "",
      rating: () => ({
        rate: 0,
        count: 0,
      }),
    }),
  },
});

const newProduct = async () => {
  const filteredProduct = {
    title: product.value.title,
    description: product.value.description,
    category: product.value.category,
    price: product.value.price,
    image: product.value.image,
  };
  try {
    const valid = await productSchema.safeParseAsync(filteredProduct);
    if (!valid.success) {
      errors.value = valid.error.format();
      toast.add({
        severity: "error",
        summary: "Product not added",
        detail: "Your product has validation errors",
        life: 3000,
      });
    } else {
      const response = await addProduct(filteredProduct);
      if (response) {
        toast.add({
          severity: "success",
          summary: "Product added",
          detail: "Your product has been successfully added",
          life: 3000,
        });
      } else {
        toast.add({
          severity: "error",
          summary: "Server Error",
          life: 3000,
        });
      }
    }
  } catch (err) {
    throw new Error("Error");
  }
};

const modifyProduct = async () => {
  const filteredProduct = {
    title: product.value.title,
    description: product.value.description,
    category: product.value.category,
    price: product.value.price,
    image: product.value.image,
  };
  try {
    const valid = await productSchema.safeParseAsync(filteredProduct);
    if (!valid.success) {
      errors.value = valid.error.format();
      toast.add({
        severity: "error",
        summary: "Product not updated",
        detail: "Your product has validation errors",
        life: 3000,
      });
    } else {
      const response = await updateProduct(
        product.value.id as number,
        filteredProduct
      );
      if (response) {
        toast.add({
          severity: "success",
          summary: "Product updated",
          detail: "Your product has been successfully updated",
          life: 3000,
        });
      } else {
        toast.add({
          severity: "error",
          summary: "Server Error",
          life: 3000,
        });
      }
    }
  } catch (err) {
    throw new Error("Error");
  }
};

const { product } = toRefs(props);
defineEmits(["update:modelValue"]);
</script>
