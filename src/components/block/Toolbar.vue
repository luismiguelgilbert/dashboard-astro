<script setup lang="ts">
const props = defineProps<{
  position: 'top' | 'bottom',
}>();
</script>

<template>
  <header v-if="props.position === 'top'" class="sticky top-16 z-40 h-10 w-full bg-white dark:bg-zinc-900 border-b dark:border-zinc-900">
    <slot />
  </header>
  <footer v-if="props.position === 'bottom'" class="sticky bottom-0 z-40 h-10 w-full bg-white dark:bg-zinc-900 border-t dark:border-zinc-900">
    <slot />
  </footer>
</template>