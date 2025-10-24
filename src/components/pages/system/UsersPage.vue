<script setup lang="ts">
import type { Params, DataResponse } from '@/types/Users';
import { ref } from 'vue';
import { CirclePlusIcon } from 'lucide-vue-next';
import Button from '@/components/ui/button/Button.vue';
import SearchButton from '@/components/block/SearchButton.vue';
import DataPagination from '@/components/block/DataPagination.vue';
import Label from '@/components/ui/label/Label.vue';
import RadioGroup from '@/components/ui/radio-group/RadioGroup.vue';
import RadioGroupItem from '@/components/ui/radio-group/RadioGroupItem.vue';
import DataTable from '@/components/block/DataTable.vue';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

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
const showOptions = ref<boolean>(false);

const updateSearchParams = async(key: string, value: string | undefined, resetPage: boolean) => {
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
  .then(response => { rows.value = response.rows; rowsCount.value = response.count; })
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
          :columns="columns"
          :data="rows" />
        <Sheet v-model:open="showOptions">
          <SheetTrigger as-child />
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Ordenar</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div class="grid gap-4 py-4">
              <div class="grid items-center grid-cols-4 gap-4">
                <RadioGroup default-value="option-one" @click="updateSearchParams('sort', 'user_name, id', false)">
                  <div class="flex items-center space-x-2">
                    <RadioGroupItem id="option-one" value="user_name, id" />
                    <Label for="option-one">Nombres</Label>
                  </div>
                  <div class="flex items-center space-x-2" @click="updateSearchParams('sort', 'user_lastname, id', false)">
                    <RadioGroupItem id="option-two" value="user_lastname, id" />
                    <Label for="option-two">Apellidos</Label>
                  </div>
                  <div class="flex items-center space-x-2" @click="updateSearchParams('sort', 'email, id', false)">
                    <RadioGroupItem id="option-three" value="email, id" />
                    <Label for="option-three">Email</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <SheetFooter>
              <SheetClose as-child>
                <Button type="submit">
                  Save changes
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
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