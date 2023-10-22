<template>
  <div class="flex flex-col w-full pb-4 min-h-fit gap-y-2">
    <label v-if="label" class="text-left text-black" :for="label">{{
      props.label
    }}</label>
    <InputText
      :id="props.label"
      class="flex-1 w-full px-4 py-2 bg-gray-100 rounded-md shadow-sm focus:outline-none"
      :class="errorStack ? 'ring-1 ring-red-500  ' : ''"
      :value="props.modelValue"
      :type="props.type"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span v-if="errorStack" class="text-sm text-red-400">
      {{ errorStack[0] }}
    </span>
  </div>
</template>
<script setup lang="ts">
import InputText from "primevue/inputtext";
import { PropType, computed } from "vue";
import { loginSchemaType } from "../Login/schema.ts";
const props = defineProps({
  modelValue: {
    type: String,
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
    default: () => {},
  },
});

const errorStack = computed(() => {
  return props.error[props.validator]
    ? props.error[props.validator]._errors
    : null;
});

defineEmits(["update:modelValue"]);
</script>
