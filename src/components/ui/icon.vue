<script setup>
import { computed } from 'vue';
import * as icons from "lucide-vue-next";

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: Number,
  color: String,
  strokeWidth: Number,
  defaultClass: String
})

const iconName = computed(() => toPascalCase(props.name.replaceAll('i-lucide-','')));
const icon = computed(() => icons[iconName.value] );

const toPascalCase = (str) => {
  if (!str || typeof str !== 'string') return '';

  return str.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};
</script>

<template>
  <component
    :is="icon"
    :size="size"
    :color="color"
    :stroke-width="strokeWidth" :default-class="defaultClass"
  />
</template>