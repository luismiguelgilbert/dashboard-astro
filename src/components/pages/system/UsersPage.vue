<script setup lang="ts">
import type { Params, DataResponse } from '@/types/Users';
import { ref } from 'vue';
import { CirclePlusIcon } from 'lucide-vue-next';
import Button from '@/components/ui/button/Button.vue';
import SearchButton from '@/components/block/SearchButton.vue';
import DataPagination from '@/components/block/DataPagination.vue';
import DataTable from '@/components/block/DataTable.vue';
import type { ColumnDef } from '@tanstack/vue-table';

const props = defineProps<{
  filters: Params,
  data: DataResponse,
}>();

const columns: ColumnDef<unknown>[] = [
  {
    accessorKey: 'user_name',
    header: 'Nombres',
    // header: () => h('div', { class: 'text-right' }, 'Amount'),
    // cell: ({ row }) => {
      // const amount = Number.parseFloat(row.getValue('amount'))
      // const formatted = new Intl.NumberFormat('en-US', {
      //   style: 'currency',
      //   currency: 'USD',
      // }).format(amount)

      // return h('div', { class: 'text-right font-medium' }, formatted)
    // },
  },
  {
    accessorKey: 'user_lastname',
    header: 'Apellidos',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'is_active',
    header: 'Activo',
  },
];

const rows = ref(props.data.rows || []);
const rowsCount = ref<number>(Number(props.data.count) || 0);
const rowsPerPage = ref<number>(props.data.rowsPerPage || 0);
const currentPage = ref<number>(props.data.currentPage || 0);
const search = ref<string>(props.filters.search ?? '');

const updateSearchParams = async(key: string, value: string | undefined, resetPage: boolean) => {
  console.time('[perfCheck - fetch] > /api/system/users');
  const params = new URLSearchParams(document.location.search);
  if (value) { params.set(key, value); }
  else { params.delete(key); }
  if (resetPage) { params.set('page', '1'); currentPage.value = 1; }

  const query = new URLSearchParams(params).toString();
  const url = `/api/system/users?${query}`;
  fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
  .then(res => res.json())
  .then(response => { rows.value = response.rows; rowsCount.value = response.count; })
  .catch(error => console.error('Error:', error));
  
  const currentURL = new URL(window.location.href);
  const newUrlPath = currentURL.pathname + '?' + params.toString() + currentURL.hash;
  history.replaceState(null, '', newUrlPath);
  console.timeEnd('[perfCheck - fetch] > /api/system/users');
};
</script>

<template>
  <div class="flex flex-col h-[calc(100dvh-64px)] w-full">
    <header class="relative flex h-12 w-full overflow-auto items-center justify-between pl-2 pr-1">
      <Button variant="outline"><CirclePlusIcon /> Nuevo</Button>
      <SearchButton
        v-model="search"
        @update:model-value="(search) => updateSearchParams('search', search, true)">
        Buscar
      </SearchButton>
    </header>

    <main class="flex-1 overflow-auto">
      <DataTable
        :columns="columns"
        :data="rows" />
    </main>

    <footer class="border-t">
      <DataPagination
        :initialPage="currentPage"
        :rowsPerPage="rowsPerPage"
        :rowsCount="rowsCount"
        :currentPage="currentPage"
        @update="(page) => {
          if (currentPage !== page) {
            currentPage = page;
            updateSearchParams('page', page.toString(), false)
          };
        }" />
    </footer>
  </div>
</template>