<script setup lang="ts">
import "@/styles/global.css";
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarInset, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar";
import { sidebarMenuList } from "@/types/Menu.ts";
// import {Loader} from "lucide-vue-next";

const props = defineProps<{
  urlPathName: string
}>()
</script>

<template>
  <SidebarProvider>
    <Sidebar collapsible="icon" variant="sidebar"  >
      <SidebarContent>
        <SidebarGroup v-for="(group) in sidebarMenuList" :key="group.title">
          <SidebarGroupLabel>{{ group.title }}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem v-for="menuItem in group.items" :key="menuItem.title">
                <SidebarMenuButton asChild :is-active="props.urlPathName === menuItem.url">
                  <a :href="menuItem.url">
                    <component :is="menuItem.icon" />
                    <span>{{menuItem.title}} - {{menuItem.url}}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
<!--        <Loader v-if="isLoading" class="animate-spin size-6 w-full" />-->
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
            {{props.urlPathName}}
          </div>
          <div class="flex items-center gap-2">
<!--            <Colortoggle />-->
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