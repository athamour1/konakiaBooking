<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated v-if="isLogin">
      <q-toolbar>
        <q-toolbar-title>
          Konakia Booking
        </q-toolbar-title>
        <q-btn flat dense icon="person" label="Login" no-caps to="login" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const route = useRoute()
    const isLogin = computed(() => {
      return route.path !== '/login'
    })
    return { isLogin }
  }
})
</script>
