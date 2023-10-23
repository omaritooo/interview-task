<template>
  <aside
    class="fixed left-0 top-0 py-10 max-w-[20vw] w-fit flex text-black justify-content-start"
    :class="visible ? 'w-[15vw] h-screen shadow-md' : 'w-fit h-fit'"
  >
    <Sidebar
      v-model:visible="visible"
      position="left"
      class="flex flex-col justify-between w-full h-screen px-2 py-6 text-black bg-white shadow-md sm:w-1/6 sm:px-4"
    >
      <template #container>
        <div class="flex flex-col h-screen px-5 py-10">
          <router-link to="/"> Home </router-link>
          <Menu class="mt-5" :style="{ marginTop: '20px' }" :model="items">
            <template #item="{ label, item, props }">
              <router-link
                v-if="item.route"
                v-slot="routerProps"
                :to="item.route"
                custom
              >
                <a
                  :href="routerProps.href"
                  v-bind="props.action"
                  @click="routerProps.navigate"
                >
                  <span v-bind="props.icon" />
                  <span v-bind="props.label">{{ label }}</span>
                </a>
              </router-link>
              <a v-else :href="item.url" v-bind="props.action">
                <span v-bind="props.icon" />
                <span v-bind="props.label">{{ label }}</span>
              </a>
            </template>
          </Menu>
          <ButtonComponent
            class="mt-auto w-fit"
            @click="logoutFunction"
            label="Logout"
          />
        </div>
      </template>
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
import Menu from "primevue/menu";
import { RouterLink } from "vue-router";
import { useAuthStore } from "../stores/auth.ts";

const { logout } = useAuthStore();

const logoutFunction = () => {
  logout();
  location.reload();
};

const visible = ref(false);

const items = ref([
  {
    label: "Categories",
    items: [
      {
        label: "Electronics",
        route: "/category/electronics",
        target: "_blank",
      },
      {
        label: "Jewelery",
        route: "/category/jewelery",
        target: "_blank",
      },
      {
        label: "Men's Clothing",
        route: "/category/men's clothing",
        target: "_blank",
      },
      {
        label: "Women's Clothing",
        route: "/category/women's clothing",
        target: "_blank",
      },
    ],
  },
]);
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
