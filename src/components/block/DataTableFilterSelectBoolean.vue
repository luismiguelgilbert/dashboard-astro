<script setup lang="ts">
import { ref } from 'vue';
import IconAsync from '@/components/block/IconAsync.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import Button from '@/components/ui/button/Button.vue';
import ButtonGroup from '@/components/ui/button-group/ButtonGroup.vue';
import ButtonGroupSeparator from '@/components/ui/button-group/ButtonGroupSeparator.vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import DropdownMenu from '@/components/ui/dropdown-menu/DropdownMenu.vue';
import DropdownMenuContent from '@/components/ui/dropdown-menu/DropdownMenuContent.vue';
import DropdownMenuGroup from '@/components/ui/dropdown-menu/DropdownMenuGroup.vue';
import DropdownMenuItem from '@/components/ui/dropdown-menu/DropdownMenuItem.vue';
import DropdownMenuTrigger from '@/components/ui/dropdown-menu/DropdownMenuTrigger.vue';

interface DataTableFilterSelectBooleanProps {
  fieldName?: string;
  activeLabel?: string;
  inactiveLabel?: string;
  initialValues?: boolean[];
}
const props = withDefaults(defineProps<DataTableFilterSelectBooleanProps>(), {
  fieldName: 'Estado',
  activeLabel: 'Activo',
  inactiveLabel: 'Inactivo',
});
const emit = defineEmits<{(e: 'selected-values-change', selectedValues: boolean[]): void}>();

const selectedValues = ref<boolean[]>(props.initialValues || []);
const toggleActive = () => {
  if(selectedValues.value.includes(true)) selectedValues.value = selectedValues.value.filter(x => x !== true);
  else selectedValues.value.push(true);
  emit('selected-values-change', selectedValues.value);
};
const toggleInactive = () => {
  if(selectedValues.value.includes(false)) selectedValues.value = selectedValues.value.filter(x => x !== false);
  else selectedValues.value.push(false);
  emit('selected-values-change', selectedValues.value);
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <ButtonGroup>
        <Button variant="dashed" size="sm">
          <IconAsync name="FunnelIcon" class="!w-6 !h-6" />
          {{ props.fieldName }}
          <ButtonGroupSeparator v-if="selectedValues.length" class="!m-2" />
          <Badge v-if="selectedValues.length" variant="secondary">
            {{ selectedValues.length }}
          </Badge>
        </Button>
      </ButtonGroup>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-30">
      <DropdownMenuGroup>
        <DropdownMenuItem
          class="cursor-pointer"
          @click="toggleActive">
          <Checkbox :model-value="selectedValues.includes(true)" />
          <span>{{ props.activeLabel }}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          class="cursor-pointer"
          @click="toggleInactive">
          <Checkbox :model-value="selectedValues.includes(false)" />
          <span>{{ props.inactiveLabel }}</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>