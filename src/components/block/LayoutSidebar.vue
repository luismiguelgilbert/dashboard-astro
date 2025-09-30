<script setup lang="ts">
import "@/styles/global.css";
import { computed, ref } from "vue";
import { authClient } from '@/lib/auth-client.ts';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarInset, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar";
import { sidebarMenuList } from "@/types/Menu.ts";
import ColorToggle from '@/components/block/ColorToggle.vue'
import { Loader } from "lucide-vue-next";

const props = defineProps<{
  urlPathName: string
}>()
const isLoading = ref<boolean>(true);
const sessionData = ref();
authClient.getSession().then((res) => {
  sessionData.value = res.data;
  isLoading.value = false;
});

const computedMenu = computed(() => {
  if (!sessionData.value?.roles) return sidebarMenuList.map(group => {
    return {
      ...group,
      items: group.items.filter(x => !x.id)
    }
  });

  const groups = sidebarMenuList.map(group => {
    return {
      ...group,
      items: group.items.filter(x => !x.id || sessionData.value?.roles.includes(x.id))
    }
  });

  return groups.filter(x => x.items.length > 0);
});
const formattedUrlPathName = computed(() => {
  const lastCharacter = props.urlPathName.charAt(props.urlPathName.length - 1);
  return (lastCharacter === '/' && props.urlPathName.length > 1)
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
    <Sidebar collapsible="icon" variant="sidebar"  >
      <SidebarContent>
        <SidebarGroup v-for="(group) in computedMenu" :key="group.title">
          <SidebarGroupLabel>{{ group.title }}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem v-for="menuItem in group.items" :key="menuItem.title">
                <SidebarMenuButton asChild :is-active="menuItem.url === formattedUrlPathName">
                  <a :href="menuItem.url">
                    <component :is="menuItem.icon" />
                    <span>{{menuItem.title}}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Loader v-if="isLoading" class="animate-spin size-6 w-full" />
      </SidebarContent>
    </Sidebar>
    <SidebarInset>
      <header
        class="w-full padding-safe my-header flex h-16 shrink-0 fixed border-b dark:border-b-neutral-800 bg-white dark:bg-zinc-900">
        <div class="flex w-full p-2 items-center justify-between">
          <div class="flex items-center gap-2">
            <SidebarTrigger
              ref="theSidebarTrigger"
              class="cursor-pointer" />
            {{ routeTitle }}
          </div>
          <div class="flex items-center gap-2">
            <ColorToggle />
<!--            <BlocksUserDropdown />-->
          </div>
        </div>
      </header>
      <main class="mt-24 px-2 md:mt-20 md:px-4">
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