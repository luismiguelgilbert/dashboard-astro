<script setup lang="ts">
import type { PaginationPrevProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import type { ButtonVariants } from '@/components/ui/button';
import { reactiveOmit } from '@vueuse/core';
import { ChevronLeftIcon } from 'lucide-vue-next';
import { PaginationPrev, useForwardProps } from 'reka-ui';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const props = withDefaults(defineProps<PaginationPrevProps & {
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
}>(), {
  size: 'default',
});

const delegatedProps = reactiveOmit(props, 'class', 'size');
const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <PaginationPrev
    data-slot="pagination-previous"
    class="cursor-pointer size-1"
    :class="cn(buttonVariants({ variant: 'ghost', size }), props.class)"
    v-bind="forwarded">
    <slot>
      <ChevronLeftIcon />
    </slot>
  </PaginationPrev>
</template>
