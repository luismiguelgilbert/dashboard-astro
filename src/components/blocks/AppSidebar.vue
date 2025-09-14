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
      <SidebarHeader />
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
      <header class="flex h-16 shrink-0 items-center gap-2 border-b">
        <div class="flex items-center gap-2 px-3">
          <SidebarTrigger />
          {{ title }}
        </div>
      </header>
      <main>
        <slot />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>

