<script setup lang="ts">
import { SearchIcon } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Input } from '@/components/ui/input';

const modelValue = defineModel<string>('modelValue');
</script>

<template>
  <ButtonGroup>
    <Input
      v-model="modelValue"
      placeholder="Buscar..." />
    <Button variant="outline" aria-label="Search">
      <SearchIcon />
    </Button>
  </ButtonGroup>
</template>