<script setup lang="ts">
  import type { ColumnDef } from '@tanstack/vue-table';
  import type { HeroIconName } from '@/types/Utils';
  import type { Params, DataResponse } from '@/types/Users';
  import type { UserRow } from '@/types/Users';
  import z from 'zod/v4';
  import { ref } from 'vue';
  import { ParamsSchema } from '@/types/Users';
  import IconAsync from '@/components/block/IconAsync.vue';
  import Button from '@/components/ui/button/Button.vue';
  import SearchButton from '@/components/block/SearchButton.vue';
  import DataPagination from '@/components/block/DataPagination.vue';
  import DataTable from '@/components/block/DataTable.vue';
  import DataTableSortButton from '@/components/block/DataTableSortButton.vue';
  import DataTableFilterSelectBoolean from '@/components/block/DataTableFilterSelectBoolean.vue';
  import DropdownMenu from '@/components/ui/dropdown-menu/DropdownMenu.vue';
  import DropdownMenuItem from '@/components/ui/dropdown-menu/DropdownMenuItem.vue';
  import DropdownMenuContent from '@/components/ui/dropdown-menu/DropdownMenuContent.vue';
  import DropdownMenuTrigger from '@/components/ui/dropdown-menu/DropdownMenuTrigger.vue';
  import DropdownMenuSeparator from '@/components/ui/dropdown-menu/DropdownMenuSeparator.vue';
  import DropdownMenuLabel from '@/components/ui/dropdown-menu/DropdownMenuLabel.vue';
  import DropdownMenuSub from '@/components/ui/dropdown-menu/DropdownMenuSub.vue';
  import DropdownMenuSubTrigger from '@/components/ui/dropdown-menu/DropdownMenuSubTrigger.vue';
  // import DropdownMenuPortal from '@/components/ui/dropdown-menu/m';
  import DropdownMenuSubContent from '@/components/ui/dropdown-menu/DropdownMenuSubContent.vue';
  import DropdownMenuRadioGroup from '@/components/ui/dropdown-menu/DropdownMenuRadioGroup.vue';
  import DropdownMenuRadioItem from '@/components/ui/dropdown-menu/DropdownMenuRadioItem.vue';
  import { DropdownMenuPortal } from '@/components/ui/dropdown-menu/index';
  // <DropdownMenuPortal>
  // <DropdownMenuSubContent>

const props = defineProps<{
  filters: Params;
  data: DataResponse;
}>();

const columns: ColumnDef<unknown>[] = [
  {
    accessorKey: 'user_name',
    id: 'user_name',
    header: 'Nombres',
  },
  {
    id: 'user_lastname',
    accessorKey: 'user_lastname',
    header: 'Apellidos',
    enableHiding: true,
    meta: 'hidden md:table-cell',
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: 'Email',
    meta: 'hidden md:table-cell',
  },
  {
    id: 'is_active',
    accessorKey: 'is_active',
    header: 'Estado',
    meta: 'hidden md:table-cell',
  },
  {
    id: 'user_sex',
    accessorKey: 'user_sex',
    header: 'Sexo',
    meta: 'hidden md:table-cell',
  },
];
const sortingOptions: {
  label: string;
  description: string;
  value: string;
  icon: HeroIconName;
}[] = [
  {
    label: 'Nombres',
    description: 'Ordenar lista por "Nombres" de usuario',
    value: 'user_name',
    icon: 'UserIcon',
  },
  {
    label: 'Apellidos',
    description: 'Ordenar lista por "Apellidos" de usuario',
    value: 'user_lastname',
    icon: 'UserCircleIcon',
  },
  {
    label: 'Email',
    description: 'Ordenar lista por "Email" de usuario',
    value: 'email',
    icon: 'EnvelopeIcon',
  },
];

const loading = ref<boolean>(false);
const rows = ref(props.data.rows || []);
const rowsCount = ref<number>(Number(props.data.count) || 0);
const rowsPerPage = ref<number>(props.data.rowsPerPage || 0);
const currentPage = ref<number>(props.data.currentPage || 0);
const search = ref<string>(props.filters.search ?? '');
const is_active = ref<boolean[]>(props.filters.is_active || []);
const user_sex = ref<boolean[]>(props.filters.user_sex || []);
const sort = ref<string>(props.filters.sort ?? '');
const direction = ref<'asc' | 'desc'>(props.filters.direction ?? 'asc');

const updateSearchParams = async (key: keyof z.infer<typeof ParamsSchema>, value: string | undefined, resetPage: boolean ) => {
  loading.value = true;
  const params = new URLSearchParams(document.location.search);
  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }
  if (resetPage) {
    params.set('page', '1');
    currentPage.value = 1;
  }

  const query = new URLSearchParams(params).toString();
  const url = `/api/system/users?${query}`;
  fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
    .then((res) => res.json())
    .then((response) => {
      rows.value = response.rows;
      rowsCount.value = response.count;
      loading.value = false;
    })
    .catch((error) => console.error('Error:', error));

  const currentURL = new URL(window.location.href);
  const newUrlPath =
    currentURL.pathname + '?' + params.toString() + currentURL.hash;
  history.replaceState(null, '', newUrlPath);
};
</script>

<template>
  <div class="h-[calc(100dvh-64px)] grid grid-rows-[50px_1fr_50px]">
    <header
      class="flex max-w-screen px-2 items-center justify-between border-b">
      <!-- Left section -->
      <div class="flex gap-x-2 items-center">
        <SearchButton
          v-model="search"
          @update:model-value="(search) => updateSearchParams('search', search, true)">
          Buscar
        </SearchButton>
        <div class="hidden md:flex gap-x-2">
          <DataTableSortButton
            :sorting-options="sortingOptions"
            v-model:sort="sort"
            v-model:direction="direction"
            @direction-change="(data) => { direction = data; updateSearchParams('direction', data, false); }"
            @sort-click="(newSortValue) => { sort = newSortValue; updateSearchParams('sort', sort, false); }" />
          <DataTableFilterSelectBoolean
            field-name="Estado"
            active-label="Activo"
            inactive-label="Inactivo"
            :initial-values="is_active"
            @selected-values-change="(data) => { is_active = data; updateSearchParams('is_active', data.join(','), true); }" />
          <DataTableFilterSelectBoolean
            field-name="Sexo"
            active-label="Hombre"
            inactive-label="Mujer"
            :initial-values="user_sex"
            @selected-values-change="(data) => { user_sex = data; updateSearchParams('user_sex', data.join(','), true); }"
          />
        </div>
      </div>
      <!-- Right section -->
      <div>
        <Button variant="default">
          Nuevo
          <IconAsync name="PlusCircleIcon" class="!w-6 !h-6" />
        </Button>
      </div>
    </header>

    <main class="overflow-auto">
      <div>
        <DataTable :loading="loading" :columns="columns" :data="rows">
          <template #cell-user_name="row: UserRow">
            <span>
              <span class="hidden md:flex">{{ row.user_name }}</span>
              <span class="flex md:hidden font-bold">{{ `${row.user_name} ${row.user_lastname}` }}</span>
              <p class="flex items-center gap-x-1 md:hidden font-extralight text-xs">
                <IconAsync
                  class="!w-4 !h-4"
                  name="EnvelopeIcon"/>
                {{ row.email }}
              </p>
              <p class="flex items-center gap-x-1 md:hidden">
                <IconAsync
                  class="!w-4 !h-4"
                  :name="row.is_active ? 'CheckCircleIcon' : 'ExclamationCircleIcon'"
                  :class="row.is_active ? 'text-green-500' : 'text-red-500'" />
                {{ row.is_active ? 'Activo' : 'Inactivo' }}
                <IconAsync
                  class="!w-4 !h-4"
                  name="UserIcon"
                  :class="!row.user_sex ? 'text-rose-400' : undefined" />
                {{ row.user_sex ? 'Hombre' : 'Mujer' }}
              </p>
            </span>
          </template>
          <template #cell-user_lastname="row: UserRow">
            <span class="hidden md:flex">{{ row.user_lastname }}</span>
          </template>
          <template #cell-is_active="row: UserRow">
            <span class="flex items-center gap-x-2">
              <IconAsync
                class="!w-5 !h-5"
                :name="row.is_active ? 'CheckCircleIcon' : 'ExclamationCircleIcon'"
                :class="row.is_active ? 'text-green-500' : 'text-red-500'" />
              {{ row.is_active ? 'Activo' : 'Inactivo' }}
            </span>
          </template>
          <template #cell-user_sex="row: UserRow">
            <span class="flex items-center gap-x-2">
              <IconAsync
                class="!w-5 !h-5"
                name="UserIcon"
                :class="!row.user_sex ? 'text-rose-400' : undefined" />
                {{ row.user_sex ? 'Hombre' : 'Mujer' }}
            </span>
          </template>
        </DataTable>
      </div>
    </main>

    <footer class="flex max-w-screen items-center justify-between border-t">
      <DataPagination
        :initialPage="currentPage"
        :rowsPerPage="rowsPerPage"
        :rowsCount="rowsCount"
        :currentPage="currentPage"
        @update="(page) => {
          if (currentPage !== page) {
            currentPage = page;
            updateSearchParams('page', page.toString(), false);
          }
        }" />
      <div class="absolute right-0 mb-32 mr-2 flex md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="secondary" class="rounded-2xl">
              <IconAsync name="AdjustmentsHorizontalIcon" class="!w-6 !h-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-56" side="top" align="end" :align-offset="2"> 
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <IconAsync name="ChevronUpDownIcon" class="!w-6 !h-6" />
                <span class="pl-2">Ordenar</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                DropdownMenuRadioGroup DropdownMenuRadioItem
                <DropdownMenuSubContent>
                  <DropdownMenuLabel>Dirección:</DropdownMenuLabel>
                  <DropdownMenuRadioGroup>
                    <DropdownMenuRadioItem value="top">
                      Top
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="bottom">
                      Bottom
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Campo:</DropdownMenuLabel>
                  <DropdownMenuRadioGroup>
                    <DropdownMenuRadioItem value="user_name">
                      Nombres
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="user_lastname">
                      Apellidos
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="email">
                      Email
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <IconAsync name="AdjustmentsHorizontalIcon" class="!w-6 !h-6" />
                <span class="pl-2">Filtrar</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <span>Email</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </footer>
  </div>
</template>
