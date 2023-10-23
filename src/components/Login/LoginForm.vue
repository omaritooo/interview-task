<template>
  <form
    class="flex flex-col items-center w-full px-4 py-6 bg-[#162747] rounded-lg shadow-lg sm:w-1/2 xl:w-1/4 sm:px-12 md:py-20 gap-y-3 h-fit"
  >
    <BaseInput
      v-model="user.username"
      validator="username"
      :error="errors"
      label="Username"
    />
    <BaseInput
      v-model="user.password"
      validator="password"
      :error="errors"
      label="Password"
      type="password"
    />
    <span v-show="credError" class="py-2 text-sm text-red-300">
      {{ credError }}
    </span>
    <ButtonComponent
      label="Login"
      class="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg w-fit"
      @click="login"
    />
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { z } from "zod";
import { loginSchema, loginSchemaType } from "./schema.ts";
import { useAuthStore } from "../../stores/auth.ts";

const store = useAuthStore();
const { loginValidation } = store;

const user = reactive({ username: "", password: "" });
const errors = ref<z.ZodFormattedError<loginSchemaType> | null>(null);

const credError = ref<string | undefined>("");

const login = async () => {
  try {
    const valid = await loginSchema.safeParse(user);
    if (!valid.success) {
      errors.value = valid.error.format();
    } else {
      errors.value = null;
      credError.value = await loginValidation(user);
    }
  } catch (err) {
    throw new Error("Error");
  }
};
</script>
