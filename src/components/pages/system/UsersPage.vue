<script setup lang="ts">
import { onMounted, ref } from 'vue';
// import Toolbar from '@/components/block/Toolbar.vue';
import DataPagination from '@/components/block/DataPagination.vue';
import DataTable from '@/components/block/DataTable.vue';
import type { ColumnDef } from '@tanstack/vue-table';

const props = defineProps<{
  data: any[]
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

const rows = ref(props.data || []);

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
  .then(response => rows.value = response.data)
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
        :initialPage="1"
        :rowsPerPage="250"
        :rowsCount="1000"
        @update="(page) => fetchAndReplace(page)" />
    </footer>
  </div>

  <!-- <div class="fixed top-16 z-40 h-10 w-full bg-white dark:bg-zinc-900 border-b dark:border-zinc-900">
    <DataPagination
      :initialPage="1" />
  </div> -->
  <!-- <div v-for="n in 500" :key="n">
    Users Page <br />
  </div> -->

    <!-- <Toolbar position="bottom">
      content goes here
    </Toolbar> -->
  <!-- <div class="sticky bottom-0 z-40 h-10 w-full bg-white dark:bg-zinc-900 border-t dark:border-zinc-900">
    this is where the toolbar will go
  </div> -->
</template>