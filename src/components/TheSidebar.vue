<template>
  <aside
    class="fixed left-0 top-0 py-10 max-w-[20vw] w-fit flex text-black justify-content-start"
    :class="visible ? 'w-[15vw] h-screen shadow-md' : 'w-fit h-fit'"
  >
    <Sidebar
      v-model:visible="visible"
      position="left"
      class="w-full h-screen px-2 py-6 text-black bg-white shadow-md sm:w-1/6 sm:px-4"
    >
      <router-link to="/"> Home </router-link>
    </Sidebar>
    <Transition>
      <ButtonComponent
        v-if="!visible"
        class="p-4 bg-green-300 rounded-md h-fit"
        icon="pi pi-arrow-right"
        @click="visible = true"
    /></Transition>
  </aside>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Sidebar from "primevue/sidebar";
import { RouterLink } from "vue-router";
const visible = ref(false);
</script>
<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
