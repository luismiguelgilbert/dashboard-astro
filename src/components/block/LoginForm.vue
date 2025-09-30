<script setup lang="ts">
import "@/styles/global.css";
import { ref } from 'vue';
import { authClient } from '@/lib/auth-client.ts'
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatabaseZap, LogIn, Loader } from "lucide-vue-next";

const status = ref<boolean>(false);
const credentials = ref({
  email: '',
  password: '',
  callbackURL: '/',
});
const login = async () => {
  try {
    status.value = true;
    const response = await authClient.signIn.email(credentials.value);
    if (response.data?.user?.id) window.location.href = '/';
  } catch (error) {
    console.error('Error during login:', error);
  } finally {
    status.value = false;
  }
};
</script>

<template>
  <div class="w-full sm:grid sm:grid-cols-2 sm:min-h-[calc(100dvh)] px-5 sm:px-0">
    <div class="flex items-center justify-center sm:py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <Card class="w-[350px] mt-0 md:mt-12 border-0 md:border shadow-none md:shadow" >
          <CardHeader>
            <CardTitle>Bienvenido a Framework</CardTitle>
            <CardDescription>Ingrese sus credencial para continuar</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              id="signin-form"
              class="padding-safe grid gap-4">
              <form class="grid gap-2 gap-y-5">
                <div class="grid w-full max-w-sm items-center gap-1.5">
                  <Label for="user_name">Usuario</Label>
                  <div class="relative w-full max-w-sm items-center">
                    <Input
                      v-model="credentials.email"
                      type="text"
                      name="email"
                      autocomplete="username"
                      :disabled="status" />
                  </div>
                </div>
                <div class="grid w-full max-w-sm items-center gap-1.5">
                  <Label for="user_name">Contrase&#241;a</Label>
                  <div class="relative w-full max-w-sm items-center">
                    <Input
                      v-model="credentials.password"
                      type="password"
                      name="password"
                      autocomplete="current-password"
                      :disabled="status" />
                  </div>
                </div>
              </form>

              <Button
                class="h-12 w-full mt-2 cursor-pointer justify-between"
                :disabled="status"
                @click="login">
                <Loader v-if="status" class="animate-spin size-6" />
                Ingresar
                <LogIn name="i-lucide-log-in" class="size-6" />
              </Button>
              <!-- <p>Don't have an account? <a href="/signup">Sign up here</a>.</p> -->
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    <div class="hidden bg-neutral-950 sm:flex items-center justify-center py-2 sm:py-12">
      <div class="flex items-center gap-x-2">
        <DatabaseZap class="h-24 w-24 text-9xl text-primary-400 text-white" />
        <div class="grid grid-cols-1">
          <span class="text-3xl font-bold text-center text-neutral-100">
            Framework
          </span>
          <span class="text-xl font-semibold text-center text-neutral-300">
            Business Intelligence
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>