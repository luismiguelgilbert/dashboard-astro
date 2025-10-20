<script setup lang="ts">
import type { PaginationNextProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import type { ButtonVariants } from '@/components/ui/button';
import { reactiveOmit } from '@vueuse/core';
import { ChevronRightIcon } from 'lucide-vue-next';
import { PaginationNext, useForwardProps } from 'reka-ui';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const props = withDefaults(defineProps<PaginationNextProps & {
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
}>(), {
  size: 'default',
});

const delegatedProps = reactiveOmit(props, 'class', 'size');
const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <PaginationNext
    data-slot="pagination-next"
    class="cursor-pointer size-1"
    :class="cn(buttonVariants({ variant: 'ghost', size }), props.class)"
    v-bind="forwarded">
    <slot>
      <ChevronRightIcon />
    </slot>
  </PaginationNext>
</template>
