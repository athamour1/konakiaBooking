<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { useAuthStore } from 'stores/auth'

export default defineComponent({
  name: 'App',
  setup() {
    const authStore = useAuthStore();
    authStore.authInit()
    return {}
  }
})


</script>
