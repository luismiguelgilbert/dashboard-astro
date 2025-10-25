<script setup lang="ts">
import Skeleton from '@/components/ui/skeleton/Skeleton.vue';
</script>

<template>
  <div class="max-h-[calc(100dvh-170px)] overflow-hidden">
    <div
      v-for="n in 100"
      :key="n"
      class="flex w-full">
      <div class="hidden md:grid grid-cols-4 w-full gap-4 p-2">
        <Skeleton class="h-4" :class="n % 2 ? 'w-3/3' : 'w-2/3'" />
        <Skeleton class="h-4" :class="n % 2 ? 'w-3/3' : 'w-2/3'" />
        <Skeleton class="h-4" :class="n % 2 ? 'w-3/3' : 'w-2/3'" />
        <Skeleton class="h-4" :class="n % 2 ? 'w-3/3' : 'w-2/3'" />
      </div>
      <div class="grid md:hidden grid-cols-3 w-full gap-4 p-2">
        <Skeleton class="h-4" :class="n % 2 ? 'w-3/3' : 'w-2/3'" />
        <Skeleton class="h-4" :class="n % 2 ? 'w-3/3' : 'w-2/3'" />
        <Skeleton class="h-4" :class="n % 2 ? 'w-3/3' : 'w-2/3'" />
      </div>
    </div>
  </div>
</template>