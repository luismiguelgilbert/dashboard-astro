<script setup lang="ts">
import { ref, watch } from 'vue';
import { refDebounced } from '@vueuse/core';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Input } from '@/components/ui/input';
import IconAsync from '@/components/block/IconAsync.vue';

const modelValue = defineModel<string>('modelValue');
const emit = defineEmits(['open-sheet']);

const inputValue = ref(modelValue.value);
const inputValueDebounced = refDebounced(inputValue, 500);

watch(inputValueDebounced, (newValue) => {
  modelValue.value = newValue;
});
</script>

<template>
  <ButtonGroup>
    <Input
      v-model="inputValue"
      class="max-w-[100px] md:max-w-[300px]"
      placeholder="Buscar..." />
    <Button
      variant="outline"
      aria-label="Search"
      @click="emit('open-sheet')">
      <IconAsync name="AdjustmentsHorizontalIcon" class="!w-5 !h-5" />
    </Button>
  </ButtonGroup>
</template>