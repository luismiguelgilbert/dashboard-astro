<script lang="ts" setup>
import { authClient } from '@/lib/auth-client.ts';
import { computed } from "vue";
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

const props = defineProps<{
  user: import("better-auth").User | null,
}>();

const userInitials = computed<string>(() => props.user?.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'NA');

const closeSession = async () => {
  try {
    await authClient.signOut();
    location.href="/login";
  } catch {
    console.error('Error during logout');
  }
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Avatar
        class="cursor-pointer h-10 w-10">
        <!-- <AvatarImage src="https://github.com/unovue.png" alt="@unovue" /> -->
        <AvatarImage
          v-if="props.user?.image"
          :src="props.user.image"
          :alt="props.user.email" />
        <AvatarFallback class="text-lg md:text-lg">
          {{ userInitials }}
        </AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuLabel>
        {{ props.user?.email }}
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