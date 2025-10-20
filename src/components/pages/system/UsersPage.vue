<script setup lang="ts">
import { onMounted, ref } from 'vue';
// import Toolbar from '@/components/block/Toolbar.vue';
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
const rowsCount = ref(Number(props.data.count) || 0);
const rowsPerPage = ref(props.data.rowsPerPage || 0);
const currentPage = ref(props.data.currentPage || 0);

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
  // const currentState = history.state;
  updateUrlParameter('page', page.toString());
  // history.replaceState(null, '', `/system/users?page=${page}`);
};

onMounted(() => {
  console.log('UsersPage mounted');
});
</script>

<template>
  <div class="flex flex-col h-[calc(100dvh-64px)]">
    <!-- Header -->
    <header class="border-b h-10">
      <h1 class="text-2xl font-bold">My Website Header</h1>
      <!-- Navigation or other header content can go here -->
    </header>

    <!-- Main Content Area -->
    <main class="flex-1 overflow-y-auto">
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