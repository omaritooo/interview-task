<template>
  <main class="flex w-screen min-h-screen bg-[#101827]">
    <TheSidebar />
    <router-view />
  </main>
</template>

<script setup lang="ts">
import TheSidebar from "../components/TheSidebar.vue";
</script>
