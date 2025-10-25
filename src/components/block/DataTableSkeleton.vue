<script setup lang="ts">
import Skeleton from '@/components/ui/skeleton/Skeleton.vue';
</script>

<template>
  <div class="max-h-[calc(100dvh-170px)] overflow-hidden">
    <div class="flex w-full items-center space-x-4 p-2" v-for="n in 100" :key="n">
      <div class="flex gap-4 w-full items-center justify-center">
        <Skeleton class="h-4 w-[25dvw]" />
        <Skeleton class="h-4 w-[25dvw]" />
        <Skeleton class="h-4 w-[25dvw]" />
        <Skeleton class="h-4 w-[25dvw] hidden md:flex" />
      </div>
    </div>
  </div>
</template>