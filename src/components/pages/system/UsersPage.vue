<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table';
import type { HeroIconName } from '@/types/Utils';
import type { Params, DataResponse } from '@/types/Users';
import { ref } from 'vue';
import { CirclePlusIcon } from 'lucide-vue-next';
import Button from '@/components/ui/button/Button.vue';
import SearchButton from '@/components/block/SearchButton.vue';
import DataPagination from '@/components/block/DataPagination.vue';
import DataTable from '@/components/block/DataTable.vue';
import DataTableFilterDrawer from '@/components/block/DataTableFilterDrawer.vue';

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
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'is_active',
    header: 'Activo',
  },
];
const sortingOptions: { label: string; description: string; value: string; icon: HeroIconName }[] = [
  {
    label: 'Nombres',
    description: 'Ordenar lista por "Nombres" de usuario',
    value: 'user_name, id',
    icon: 'UserIcon',
  },
  {
    label: 'Apellidos',
    description: 'Ordenar lista por "Apellidos" de usuario',
    value: 'user_lastname, id',
    icon: 'UserCircleIcon',
  },
  {
    label: 'Email',
    description: 'Ordenar lista por "Email" de usuario',
    value: 'email, id',
    icon: 'EnvelopeIcon',
  },
];

const loading = ref<boolean>(false);
const rows = ref(props.data.rows || []);
const rowsCount = ref<number>(Number(props.data.count) || 0);
const rowsPerPage = ref<number>(props.data.rowsPerPage || 0);
const currentPage = ref<number>(props.data.currentPage || 0);
const search = ref<string>(props.filters.search ?? '');
const sort = ref<string>(props.filters.sort ?? '');
const showOptions = ref<boolean>(false);

const updateSearchParams = async(key: string, value: string | undefined, resetPage: boolean) => {
  loading.value = true;
  console.log('updateSearchParams');
  console.log(`key: ${key}, value: ${value}, resetPage: ${resetPage}`);
  const params = new URLSearchParams(document.location.search);
  if (value) { params.set(key, value); }
  else { params.delete(key); }
  if (resetPage) { params.set('page', '1'); currentPage.value = 1; }

  const query = new URLSearchParams(params).toString();
  console.log({ query });
  const url = `/api/system/users?${query}`;
  fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
  .then(res => res.json())
  .then(response => { rows.value = response.rows; rowsCount.value = response.count; loading.value = false; })
  .catch(error => console.error('Error:', error));
  
  const currentURL = new URL(window.location.href);
  const newUrlPath = currentURL.pathname + '?' + params.toString() + currentURL.hash;
  history.replaceState(null, '', newUrlPath);
};
</script>

<template>
  <div class="flex flex-col min-h-[calc(100dvh-64px)]">
    <header class="my-header-footer relative flex h-12 w-full overflow-auto items-center justify-between pl-2 pr-1">
      <Button variant="outline"><CirclePlusIcon /> Nuevo</Button>
      <SearchButton
        v-model="search"
        @open-sheet="showOptions = true"
        @update:model-value="(search) => updateSearchParams('search', search, true)">
        Buscar
      </SearchButton>
    </header>

    <main class="flex-1 overflow-auto">
      <div class="h-[calc(100dvh-156px)] max-w-full overflow-auto">
        <DataTable
          :loading="loading"
          :columns="columns"
          :data="rows" />
        <DataTableFilterDrawer
          :is-open="showOptions"
          :sorting-options="sortingOptions"
          v-model:sort="sort"
          @close-click="showOptions = !showOptions"
          @sort-click="(newSortValue) => { sort = newSortValue; updateSearchParams('sort', sort, false) }" />
      </div>
    </main>

    <footer class="my-header-footer border-t absolute bottom-0 ">
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

<style scoped>
.my-header-footer {
  width: -webkit-fill-available;
  width: -moz-available;
}
</style>