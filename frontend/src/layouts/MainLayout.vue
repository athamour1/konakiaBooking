<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated v-if="isLoginPage">
      <q-toolbar>
        <q-toolbar-title>
          <div class="flex">
            <div class="row flex-center">
              <div class="flex-center">
                <q-btn flat dense icon="menu" no-caps @click="() => { drawer = !drawer }" v-if="isAuthenticated" />
              </div>
              <div class="row flex-center pointer" @click="() => { router.push('/') }">
                <div class="flex-center q-px-sm" v-if="!drawer"><img alt="konakia booking logo"
                    src="public/icons/favicon-32x32.png"></div>
                <div class="flex-center" v-if="!drawer">Konakia Booking</div>
              </div>
            </div>
          </div>
        </q-toolbar-title>
        <q-btn flat dense icon="person" label="Login" no-caps to="login" v-if="!isAuthenticated" />
        <q-btn flat dense icon="logout" label="Log Out" no-caps @click="logout()" v-if="isAuthenticated" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="700" elevated>
      <q-scroll-area class="fit flex flex-center">
        <div class="row flex-center q-pa-sm pointer" @click="() => { router.push('/') }">
          <div class="flex-center q-px-sm"><img alt="konakia booking logo" src="public/icons/favicon-32x32.png"></div>
          <div class="flex-center">Konakia Booking</div>
        </div>
        <div class="q-pa-sm flex-center" v-for="(item, key) in  drawerItems " :key="key">
          <div class="row flex-center">
            <q-btn class="full-width" :label="item.buttonTitle" :to="item.toPage" flat no-caps />
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, computed, ref } from 'vue'
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

    const drawer = ref(false);
    const drawerItems = ref({
      "1": {
        "buttonTitle": "Κρατησεις",
        "toPage": "authenticated"
      }
    })

    function logout() {
      authStore.logout(router)
    }
    return {
      route,
      router,
      isLoginPage,
      isAuthenticated,
      drawer,
      drawerItems,
      logout
    }
  }
})
</script>
