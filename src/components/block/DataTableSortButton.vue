<script setup lang="ts">
import type { HeroIconName } from '@/types/Utils';
import IconAsync from '@/components/block/IconAsync.vue';
import Button from '@/components/ui/button/Button.vue';
import ButtonGroup from '@/components/ui/button-group/ButtonGroup.vue';
import DropdownMenu from '@/components/ui/dropdown-menu/DropdownMenu.vue';
import DropdownMenuSeparator from '@/components/ui/dropdown-menu/DropdownMenuSeparator.vue';
import DropdownMenuContent from '@/components/ui/dropdown-menu/DropdownMenuContent.vue';
import DropdownMenuGroup from '@/components/ui/dropdown-menu/DropdownMenuGroup.vue';
import DropdownMenuItem from '@/components/ui/dropdown-menu/DropdownMenuItem.vue';
import DropdownMenuLabel from '@/components/ui/dropdown-menu/DropdownMenuLabel.vue';
import DropdownMenuTrigger from '@/components/ui/dropdown-menu/DropdownMenuTrigger.vue';
import Switch from '@/components/ui/switch/Switch.vue';

type sortingOptionType = {
  label: string;
  description: string;
  value: string;
  icon: HeroIconName;
};

interface DataTableSortButtonProps {
  sortingOptions: sortingOptionType[];
}
const props = defineProps<DataTableSortButtonProps>();
const emit = defineEmits<{
  (e: 'sort-click', sort: string): void;
  (e: 'direction-change', direction: 'asc' | 'desc'): void;
}>();

const sort = defineModel<string>('sort', { default: '' });
const direction = defineModel<'asc'|'desc'>('direction', { default: 'asc' });
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <ButtonGroup>
        <Button variant="dashed" size="sm">
          <IconAsync name="ChevronUpDownIcon" class="!w-6 !h-6" />
          Orden
        </Button>
      </ButtonGroup>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-60">
      <DropdownMenuLabel>Orden:</DropdownMenuLabel>
      <DropdownMenuGroup>
        <DropdownMenuItem
          class="cursor-pointer"
          @click="emit('direction-change', direction === 'asc' ? 'desc' : 'asc')">
          <div class="flex items-center space-x-4 w-full">
            <div class="flex flex-1 items-center gap-x-2">
              <IconAsync name="ChevronUpDownIcon" class="w-8 h-8 stroke-2" />
              <span class="text-sm leading-none">
                {{ direction === 'asc' ? 'Ascendente' : 'Descendente' }}
              </span>
            </div>
            <Switch :model-value="direction === 'asc'" />
          </div>
          
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuLabel>
        Columna:
      </DropdownMenuLabel>
      <DropdownMenuGroup>
        <div
          v-for="(sortingOption) in props.sortingOptions"
          :key="sortingOption.value">
          <DropdownMenuItem
            class="cursor-pointer"
            @click="sort !== sortingOption.value ? emit('sort-click', sortingOption.value) : null">
            <div class="flex items-center space-x-4 w-full">
              <div class="flex flex-1 items-center gap-x-2">
                <IconAsync :name="sortingOption.icon" class="w-8 h-8 stroke-2" />
                <span class="text-sm leading-none">
                  {{ sortingOption.label }}
                </span>
              </div>
              <Switch :model-value="sort === sortingOption.value" />
            </div>
          </DropdownMenuItem>
        </div>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>