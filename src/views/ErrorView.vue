<template>
  <section
    class="flex items-center w-screen h-screen p-16 bg-gray-50 dark:bg-gray-700"
  >
    <div class="container flex flex-col items-center">
      <div class="flex flex-col max-w-md gap-6 text-center">
        <h2 class="font-extrabold text-gray-600 text-9xl">
          <span class="sr-only">Error</span>404
        </h2>
        <p class="text-2xl md:text-3xl dark:text-gray-400">
          Sorry, we couldn't find this page.
        </p>
        <router-link to="/"> Back to homepage </router-link>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts"></script>
