<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import { Button } from '@/components/ui/button';
import { SunMoon } from 'lucide-vue-next';

const mode = useColorMode();
const toogleColorMode = () =>
  (mode.value = mode.value === 'dark' ? 'light' : 'dark');
</script>

<template>
  <Button variant="ghost" @click="toogleColorMode">
    <SunMoon />
  </Button>
</template>

<style scoped></style>
