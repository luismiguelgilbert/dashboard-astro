<script setup lang="ts">
import { computed, ref } from 'vue';
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

const updatePage = (page: number) => {
  if (_currentPage.value != page) {
    _currentPage.value = page;
    emit('update', page);
  }
};

</script>

<template>
  <div class="flex justify-between items-center px-2 py-1">
    <span class="flex text-nowrap text-xs text-neutral-500">{{ firstRecordInPage }} - {{ lastRecordInPage }} de {{ props.rowsCount }}</span>
    <Pagination
      v-slot="{ page }"
      :items-per-page="props.rowsPerPage"
      :total="props.rowsCount"
      :sibling-count="1"
      :default-page="_currentPage">
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