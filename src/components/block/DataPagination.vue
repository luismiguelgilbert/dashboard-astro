<script setup lang="ts">
import { ref } from 'vue';
import {
  Pagination,
  PaginationContent,
  // PaginationEllipsis,
  PaginationItem,
  // PaginationNext,
  // PaginationPrevious,
} from '@/components/ui/pagination';

const props = defineProps<{
  initialPage: number;
  rowsPerPage: number;
  rowsCount: number;
}>();
const emit = defineEmits<{
  (e: 'update', page: number): void;
}>();

const currentPage = ref<number>(props.initialPage ?? 1);
</script>

<template>
  <div class="flex justify-between items-center">
    <!-- hidden md:flex -->
    <span class="text-zinc-500 pl-2">1-25 de {{ props.rowsCount }}</span>
    <Pagination v-slot="{ page }" :items-per-page="props.rowsPerPage" :total="props.rowsCount" :default-page="currentPage">
      <PaginationContent v-slot="{ items }">
        <!-- <PaginationPrevious @click="emit('update', currentPage - 1)"  /> -->
  
        <template v-for="(item, index) in items" :key="index">
          <PaginationItem
            v-if="item.type === 'page'"
            :value="item.value"
            :is-active="item.value === page"
            class="cursor-pointer"
            @click="emit('update', item.value)">
            {{ item.value }}
          </PaginationItem>
        </template>
  
        <!-- <PaginationEllipsis :index="4" /> -->
  
        <!-- <PaginationNext @click="emit('update', currentPage + 1)" /> -->
      </PaginationContent>
    </Pagination>
  </div>
</template>