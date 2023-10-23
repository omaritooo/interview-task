<template>
  <div class="flex flex-col w-full min-h-fit gap-y-2">
    <label v-if="label" class="text-left text-white" :for="label">{{
      props.label
    }}</label>
    <component
      :is="componentRef"
      :id="props.label"
      class="flex-1 w-full px-4 py-2 text-black bg-gray-100 rounded-md shadow-sm focus:outline-none"
      :class="errorStack ? 'ring-1 ring-red-500  ' : ''"
      :style="{ backgroundColor: 'white', color: 'black' }"
      :type="props.type"
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    ></component>
    <!-- <InputText /> -->
    <span v-if="errorStack" class="text-sm text-red-400">
      {{ errorStack["_errors" as keyof typeof errorStack] }}
    </span>
  </div>
</template>
<script setup lang="ts">
import { computed, defineAsyncComponent, PropType, shallowRef } from "vue";
import type { errorType } from "../Login/schema.ts";
const InputText = defineAsyncComponent(() => import("primevue/inputtext"));
const TextField = defineAsyncComponent(() => import("primevue/textarea"));

const inputComponents = {
  password: InputText,
  text: InputText,
  number: InputText,
  textfield: TextField,
};

const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: "",
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  validator: {
    type: String,
    default: "",
  },
  error: {
    type: Object as PropType<errorType>,
    default: null,
  },
});

const componentRef = shallowRef(
  inputComponents[props.type as keyof typeof inputComponents]
);

const errorStack = computed(() => {
  if (
    !props.error ||
    !props.error[props.validator as keyof typeof props.error]
  ) {
    return null;
  }

  return props.error[props.validator as keyof typeof props.error]
    ? props.error[props.validator as keyof typeof props.error]
    : null;
});

defineEmits(["update:modelValue"]);
</script>
