<script setup lang="ts">
import { SunMoon } from "lucide-vue-next";
import { useColorMode } from '@vueuse/core'
import { Button } from '@/components/ui/button'

const mode = useColorMode()
</script>

<template>
  <Button
    variant="ghost"
    class="cursor-pointer"
    @click="() => mode = mode === 'dark' ? 'light' : 'dark'">
    <SunMoon />
  </Button>
</template>