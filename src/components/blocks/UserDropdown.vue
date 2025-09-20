<script lang="ts" setup>
import { authClient } from '@/lib/auth-client';
import { Settings2, LogOut } from "lucide-vue-next";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const user = 'LG';
const userLogin = 'luismiguelgilbert@gmail.com';
const closeSession = async () => {
  await authClient.signOut();
  window.location.href = '/login'
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Avatar
        class="cursor-pointer h-6 md:h-10 w-6 md:w-10">
        <AvatarImage src="https://github.com/unovue.png" alt="@unovue" />
        <AvatarFallback class="text-xs md:text-lg">{{ user }}</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuLabel>
        {{ userLogin }}
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem class="cursor-pointer">
        <Settings2 class="mr-2 h-4 w-4" />
        Mi configuración
      </DropdownMenuItem>
      <DropdownMenuItem class="cursor-pointer" @click="closeSession">
        <LogOut class="mr-2 h-4 w-4 text-red-500" />
        <span class="text-red-500">Cerrar sesión</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>