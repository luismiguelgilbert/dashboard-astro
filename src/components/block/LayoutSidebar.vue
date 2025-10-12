<script setup lang="ts">
import { computed } from 'vue';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarInset,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { sidebarMenuList } from '@/types/Menu.ts';
import UserDropdown from '@/components/block/UserDropdown.vue';
import ColorToggle from '@/components/block/ColorToggle.vue';
// import { Loader } from "lucide-vue-next";

const props = defineProps<{
  urlPathName: string;
  permissions?: string;
  user: import('better-auth').User | null;
  session: import('better-auth').Session | null;
}>();

const computedMenu = computed(() => {
  if (!props.permissions)
    return sidebarMenuList.map((group) => {
      return {
        ...group,
        items: group.items.filter((x) => !x.id),
      };
    });

  const groups = sidebarMenuList.map((group) => {
    return {
      ...group,
      items: group.items.filter(
        (x) => !x.id || props.permissions?.includes(x.id),
      ),
    };
  });

  return groups.filter((x) => x.items.length > 0);
});
const formattedUrlPathName = computed(() => {
  const lastCharacter = props.urlPathName.charAt(props.urlPathName.length - 1);
  return lastCharacter === '/' && props.urlPathName.length > 1
    ? props.urlPathName.slice(0, -1)
    : props.urlPathName;
});
const routeTitle = computed(() => {
  let result = '';
  for (let group of sidebarMenuList) {
    for (let item of group.items) {
      if (item.url === formattedUrlPathName.value) {
        result = item.title;
        break;
      }
    }
  }

  return result;
});
</script>

<template>
  <SidebarProvider>
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarContent>
        <SidebarGroup v-for="group in computedMenu" :key="group.title">
          <SidebarGroupLabel>{{ group.title }}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem
                v-for="menuItem in group.items"
                :key="menuItem.title"
              >
                <SidebarMenuButton
                  asChild
                  :is-active="menuItem.url === formattedUrlPathName"
                >
                  <a :href="menuItem.url">
                    <component :is="menuItem.icon" />
                    <span>{{ menuItem.title }}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <!--        <Loader v-if="isFetchingSession" class="animate-spin size-6 w-full" />-->
      </SidebarContent>
    </Sidebar>
    <SidebarInset>
      <header
        class="w-full padding-safe my-header flex h-16 shrink-0 fixed border-b dark:border-b-neutral-800 bg-white dark:bg-zinc-900"
      >
        <div class="flex w-full p-2 items-center justify-between">
          <div class="flex items-center gap-2">
            <SidebarTrigger ref="theSidebarTrigger" class="cursor-pointer" />
            {{ routeTitle }}
          </div>
          <div class="flex items-center gap-2">
            <ColorToggle />
            <UserDropdown :user="props.user" />
          </div>
        </div>
      </header>
      <main class="mt-16">
        <slot />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>

<style scoped>
.my-header {
  width: -webkit-fill-available;
  width: -moz-available;
}
</style>
