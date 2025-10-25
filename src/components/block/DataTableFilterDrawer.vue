<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue';
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
  icon: string;
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

const createIconComponent = (iconName: string) => {
  return defineAsyncComponent({
    loader: async () => {
      try {
        const module = await import('lucide-vue-next');
        // Try different naming conventions
        let IconComponent = module[iconName as keyof typeof module];
        
        // If not found, try with first letter uppercase
        if (!IconComponent) {
          const capitalizedName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
          IconComponent = module[capitalizedName as keyof typeof module];
          console.log(`Trying capitalized: ${capitalizedName}`, !!IconComponent);
        }
        
        // If still not found, try camelCase conversion
        if (!IconComponent) {
          const camelCaseName = iconName.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
          IconComponent = module[camelCaseName as keyof typeof module];
          console.log(`Trying camelCase: ${camelCaseName}`, !!IconComponent);
        }
        
        console.log('Final IconComponent found:', !!IconComponent);
        
        if (!IconComponent) {
          console.error(`Icon ${iconName} not found in lucide-vue-next`);
          // Return a simple fallback component
          return {
            template: '<div class="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center text-xs">?</div>'
          };
        }
        
        // Return the component directly - Lucide components are already Vue components
        return IconComponent;
      } catch (error) {
        console.error(`Failed to load icon: ${iconName}`, error);
        return {
          template: '<div class="w-4 h-4 bg-red-400 rounded-full flex items-center justify-center text-xs">!</div>'
        };
      }
    },
    loadingComponent: {
      template: '<div class="w-4 h-4 animate-pulse bg-gray-300 rounded"></div>'
    },
    errorComponent: {
      template: '<div class="w-4 h-4 bg-red-200 rounded flex items-center justify-center text-xs">X</div>'
    },
    delay: 0,
    timeout: 3000
  });
};
// Create a computed property that maps icon names to components
const iconComponents = computed(() => {
  const components: Record<string, ReturnType<typeof createIconComponent>> = {};
  props.sortingOptions.forEach(option => {
    if (option.icon && !components[option.icon]) {
      components[option.icon] = createIconComponent(option.icon);
    }
  });
  return components;
});
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
              <component :is="iconComponents[sortingOption.icon]" />
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