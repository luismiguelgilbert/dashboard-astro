<script setup lang="ts">
import { ref } from 'vue';
import { CirclePlusIcon } from 'lucide-vue-next';
import Button from '@/components/ui/button/Button.vue';
import SearchButton from '@/components/block/SearchButton.vue';
import DataPagination from '@/components/block/DataPagination.vue';
import DataTable from '@/components/block/DataTable.vue';
import type { ColumnDef } from '@tanstack/vue-table';

const props = defineProps<{
  data: object
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
const search = ref<string>('');

const updateUrlParameter = (key: string, value: string) => {
  // 1. Get the current URL and its search parameters
  const url = new URL(window.location.href);
  const params = url.searchParams;

  // 2. Set the new value for the specific key
  params.set(key, value);

  // 3. Construct the new URL path (pathname + updated search params)
  const newUrlPath = url.pathname + '?' + params.toString() + url.hash;

  // 4. Use history.replaceState to update the URL without refreshing the page
  // Parameters: state object (can be null), title (can be empty), URL
  history.replaceState(null, '', newUrlPath);
};

const fetchAndReplace = async(page: number) => {
  fetch(`/api/system/users?sort=user_name&page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(res => res.json())
  .then(response => { rows.value = response.rows; rowsCount.value = response.count; })
  .catch(error => console.error('Error:', error));
  updateUrlParameter('page', page.toString());
};

const searchAndReplace = async(searchString: string | undefined) => {
  const currentURL = new URL(window.location.href);
  const params = Object.fromEntries(currentURL.searchParams.entries());
  console.log(currentURL);
  if (searchString) {
    params['search'] = searchString;
  } else {
    delete params['search'];
  }
  // converts JSON object into a URL
  const query = new URLSearchParams(params).toString();
  const url = `/api/system/users?${query}`;
  
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(res => res.json())
  .then(response => { rows.value = response.rows; rowsCount.value = response.count; })
  .catch(error => console.error('Error:', error));
  Object.entries(params).forEach(([key, value]) => updateUrlParameter(key, value || ''));
};
</script>

<template>
  <div class="flex flex-col h-[calc(100dvh-64px)] w-full">
    <!-- Header -->
    <!-- <header class="w-calc(100dvw) flex border-b h-10 items-center px-1 bg-amber-300 overflow-x-scroll"> -->
    <header class="relative flex h-12 w-full overflow-auto items-center justify-between px-1">
      <Button class="cursor-pointer"><CirclePlusIcon /> Nuevo</Button>
      <SearchButton v-model="search" @update:model-value="(search) => searchAndReplace(search)" >Buscar</SearchButton>
    </header>

    <!-- Main Content Area -->
    <main class="flex-1 overflow-auto">
      <DataTable
        :columns="columns"
        :data="rows" />
    </main>

    <!-- Footer -->
    <footer class="border-t">
      <DataPagination
        :initialPage="currentPage"
        :rowsPerPage="rowsPerPage"
        :rowsCount="rowsCount"
        :currentPage="currentPage"
        @update="(page) => fetchAndReplace(page)" />
    </footer>
  </div>
</template>