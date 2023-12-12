<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated v-if="isLoginPage">
      <q-toolbar>
        <q-toolbar-title>
          Konakia Booking
        </q-toolbar-title>
        <q-btn flat dense icon="person" label="Login" no-caps to="login" v-if="!isAuthenticated" />
        <q-btn flat dense icon="logout" label="Log out" no-caps @click="logout()" v-if="isAuthenticated" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from 'stores/auth'

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const route = useRoute()
    const router = useRouter()
    const authStore = useAuthStore();

    const isAuthenticated = computed(() => authStore.getIsAuthenticated);
    const isLoginPage = computed(() => {
      return route.path !== '/login'
    })

    function logout() {
      authStore.logout(router)
    }
    return {
      isLoginPage,
      isAuthenticated,
      logout
    }
  }
})
</script>
