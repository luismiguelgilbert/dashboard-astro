<script setup lang="ts">
import { SystemLinks } from '@/routes';
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
import ModeToggle from '@/components/blocks/ModeToggle.vue'
import Icon from '@/components/ui/icon.vue'
import UserDropdown from '@/components/blocks/UserDropdown.vue'

const { title } = defineProps<{
  title: string
}>()

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
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/" tooltip="Página de Inicio">
                  <Icon name="Home" />
                  <span>Inicio</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup v-for="link in SystemLinks.filter(l => !l.parent)" :key="link.id">
          <SidebarGroupLabel>{{ link.name_es }}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem v-for="page in SystemLinks.filter(p => p.parent === link.id)" :key="page.id" :title="page.comment_es">
                <SidebarMenuButton asChild>
                  <a :href="page.link" :tooltip="page.comment_es">
                    <Icon :name="page.icon" />
                    <span>{{page.name_es}}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
    <SidebarInset>
      <header
        class="padding-safe my-header flex h-16 shrink-0 fixed border-b dark:border-b-neutral-800 bg-white dark:bg-zinc-900">
        <div class="flex w-full p-2 items-center justify-between">
          <div class="flex items-center gap-2">
            <SidebarTrigger class="cursor-pointer" />
            {{ title }}
          </div>
          <div class="flex items-center gap-2">
            <ModeToggle />
            <UserDropdown />
          </div>
        </div>
      </header>
      <main class="mt-24 px-2 md:mt-20 md:px-4">
        <slot />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>

<style>
.my-header {
  width: -webkit-fill-available;
  width: -moz-available;
}
</style>