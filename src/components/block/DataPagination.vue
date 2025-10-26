<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const props = defineProps<{
  initialPage: number;
  rowsPerPage: number;
  rowsCount: number;
  currentPage: number;
}>();
const emit = defineEmits<{(e: 'update', page: number): void}>();

const _currentPage = ref<number>(props.initialPage ?? 1);
const firstRecordInPage = computed(() => ( (_currentPage.value - 1) * props.rowsPerPage ) + 1);
const lastRecordInPage = computed(() => {
  const potentialLast = _currentPage.value *  props.rowsPerPage;
  return potentialLast > props.rowsCount ? props.rowsCount : potentialLast;
});

const updatePage = (page: number) => emit('update', page);

watch(() => props.currentPage, (newPage) => {
if (newPage !== _currentPage.value) { _currentPage.value = newPage; }
});
</script>

<template>
  <div class="flex w-full justify-between items-center px-8 md:px-4">
    <span class="flex text-nowrap text-xs text-neutral-500">{{ firstRecordInPage }} - {{ lastRecordInPage }} de {{ props.rowsCount }}</span>
    <Pagination
      class="hidden md:flex"
      v-slot="{ page }"
      v-model:page="_currentPage"
      :items-per-page="props.rowsPerPage"
      :total="props.rowsCount"
      :sibling-count="1">
      {{ updatePage(page) }}
      <PaginationContent v-slot="{ items }">
        <PaginationFirst />
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
  
        <PaginationNext />
        <PaginationLast />
      </PaginationContent>
    </Pagination>
    <Pagination
      class="flex md:hidden"
      v-slot="{ page }"
      v-model:page="_currentPage"
      :items-per-page="props.rowsPerPage"
      :total="props.rowsCount"
      :sibling-count="0">
      {{ updatePage(page) }}
      <PaginationContent v-slot="{ items }">
        <PaginationFirst />
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
  
        <PaginationNext />
        <PaginationLast />
      </PaginationContent>
    </Pagination>
  </div>
</template>