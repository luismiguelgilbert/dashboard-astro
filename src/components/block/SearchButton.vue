<script setup lang="ts">
import { SearchIcon } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Input } from '@/components/ui/input';

const emit = defineEmits<{(e: 'update:model-value', search: string | undefined): void}>();
const modelValue = defineModel<string>('');
</script>

<template>
  <ButtonGroup>
    <Input v-model="modelValue" placeholder="Buscar..." @update:model-value="emit('update:model-value', modelValue)" />
    <Button variant="outline" aria-label="Search">
      <SearchIcon />
    </Button>
  </ButtonGroup>
</template>