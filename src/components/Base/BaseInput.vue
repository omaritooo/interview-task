<template>
  <div class="flex flex-col w-full min-h-fit gap-y-2">
    <label v-if="label" class="text-left text-white" :for="label">{{
      props.label
    }}</label>
    <component
      :is="componentRef"
      :id="props.label"
      class="flex-1 w-full px-4 py-2 bg-gray-100 rounded-md shadow-sm focus:outline-none"
      :class="errorStack ? 'ring-1 ring-red-500  ' : ''"
      :type="props.type"
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    ></component>
    <!-- <InputText /> -->
    <span v-if="errorStack" class="text-sm text-red-400">
      {{ errorStack[0] }}
    </span>
  </div>
</template>
<script setup lang="ts">
import { PropType, computed, defineAsyncComponent, shallowRef } from "vue";
import { loginSchemaType } from "../Login/schema.ts";
const InputText = defineAsyncComponent(() => import("primevue/inputtext"));

const Password = defineAsyncComponent(() => import("primevue/password"));
const TextField = defineAsyncComponent(() => import("primevue/textarea"));

const inputComponents = {
  password: Password,
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
    type: Object as PropType<loginSchemaType>,
    default: null,
  },
});

const componentRef = shallowRef(inputComponents[props.type]);

const errorStack = computed(() => {
  if (!props.error) {
    return null;
  }

  return props.error[props.validator]
    ? props.error[props.validator]._errors
    : null;
});

defineEmits(["update:modelValue"]);
</script>
