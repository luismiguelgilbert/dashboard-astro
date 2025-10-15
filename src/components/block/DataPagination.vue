<script setup lang="ts">
import { ref } from 'vue';
import {
  Pagination,
  PaginationContent,
  // PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
const currentPage = defineModel({ type: Number, default: 1 });
// const lastName = defineModel('lastName')
</script>

<template>
  <Pagination v-slot="{ page }" :items-per-page="10" :total="100" :default-page="currentPage">
    <PaginationContent v-slot="{ items }">
      <PaginationPrevious />

      <template v-for="(item, index) in items" :key="index">
        <PaginationItem
          v-if="item.type === 'page'"
          :value="item.value"
          :is-active="item.value === page"
          class="cursor-pointer">
          {{ item.value }}
        </PaginationItem>
      </template>

      <!-- <PaginationEllipsis :index="4" /> -->

      <PaginationNext />
    </PaginationContent>
  </Pagination>
</template>