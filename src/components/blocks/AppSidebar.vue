<script setup lang="ts">
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { Home, Users2, ShieldUserIcon } from "lucide-vue-next";

const { title } = defineProps<{
  title: string
}>()

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Users",
    url: "/settings/users",
    icon: Users2,
  },
  {
    title: "Perfiles",
    url: "/settings/profiles",
    icon: ShieldUserIcon,
  },
];
</script>

<template>
  <SidebarProvider>
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div class="padding-safe self-center">
          <!-- Company Selector  -->
          B
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem v-for="item in items" :key="item.title">
                <SidebarMenuButton asChild>
                    <a :href="item.url">
                      <component :is="item.icon" />
                      <span>{{item.title}}</span>
                    </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div class="p-1">
          luismiguelgilbert@gmail.com
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    <SidebarInset>
      <header class="padding-safe flex h-16 shrink-0 items-center gap-2 border-b w-full fixed bg-white dark:bg-gray-900 z-10">
        <div class="flex items-center gap-2 px-3">
          <SidebarTrigger class="cursor-pointer" />
          {{ title }}
        </div>
      </header>
      <main class="mt-24 px-2 md:mt-20 md:px-4">
        <slot />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>

