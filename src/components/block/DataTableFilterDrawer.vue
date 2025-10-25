<script setup lang="ts">
import type { HeroIconName } from '@/types/Utils';
import IconAsync from '@/components/block/IconAsync.vue';
import Switch from '@/components/ui/switch/Switch.vue';
import {
  Sheet,
  // SheetClose,
  SheetContent,
  // SheetDescription,
  // SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

type sortingOptionType = {
  label: string;
  description: string;
  value: string;
  icon: HeroIconName;
};

const props = defineProps<{
  sortingOptions: sortingOptionType[];
}>();
const emit = defineEmits<{
  (e: 'sort-click', sort: string): void;
  (e: 'close-click'): void;
}>();
const isOpen = defineModel<boolean>('isOpen');
const sort = defineModel<string>('sort', { default: '' });
</script>

<template>
  <Sheet
    v-model:open="isOpen"
    class="h-vdh overflow-scroll"
    @update:open="emit('close-click')">
    <SheetTrigger as-child />
    <SheetContent side="right">
      <SheetHeader class="border-b">
        <SheetTitle>Ordenar y Filtrar</SheetTitle>
        <!-- <SheetDescription>
          Make changes to your profile here. Click save when you're done.
        </SheetDescription> -->
      </SheetHeader>
      <div class="h-dvh overflow-scroll">
        <p class="mb-4 text-sm font-light m-4">
          Ordernar usando columna:
        </p>
        <div class="rounded-md border m-4">
          <div
            v-for="(sortingOption, index) in props.sortingOptions"
            :key="sortingOption.value">
            <div class="flex items-center space-x-4 p-4">
              <IconAsync :name="sortingOption.icon" class="w-6 h-6" />
              <div class="flex-1 space-y-1">
                <p class="text-sm font-medium leading-none">
                  {{ sortingOption.label }}
                </p>
                <p class="text-xs text-muted-foreground">
                  {{ sortingOption.description }}
                </p>
              </div>
              <Switch :model-value="sort === sortingOption.value" @click="emit('sort-click', sortingOption.value)" />
            </div>
            <hr v-if="index != (props.sortingOptions.length -1)" />
          </div>
        </div>
      </div>
      <!-- <SheetFooter class="border-t">
        <SheetClose as-child>
          <Button type="submit">
            Save changes
          </Button>
        </SheetClose>
      </SheetFooter> -->
    </SheetContent>
  </Sheet>
</template>