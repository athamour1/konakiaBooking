<template>
  <q-layout view="hHh LpR lfr">
    <q-header class="" v-if="isLoginPage">
      <q-toolbar class="shadow-5 border-line-white">
        <q-toolbar-title>
          <div class="flex">
            <div class="row flex-center">
              <div class="flex-center">
                <q-btn flat dense icon="menu" no-caps @click="() => { drawer = !drawer }" v-if="isAuthenticated" />
              </div>
              <div class="row flex-center pointer" @click="() => { router.push('/') }">
                <!-- <div class="flex-center q-px-sm"><img alt="konakia booking logo" src="/icons/favicon-32x32.png"></div> -->
                <div class="flex-center">Konakia Booking</div>
              </div>
            </div>
          </div>
        </q-toolbar-title>
        <q-btn flat dense icon="person" label="Login" no-caps to="login" v-if="!isAuthenticated" />
        <!-- <q-btn flat dense icon="logout" label="Log Out" no-caps @click="logout()" v-if="isAuthenticated" /> -->
      </q-toolbar>
    </q-header>

    <q-drawer class="bg-secondary shadow-5" v-model="drawer" :width="200" :breakpoint="700" flat persistent="false">
      <q-scroll-area class="fit flex flex-center q-pt-xs">
        <div class="q-py-xs q-px-sm flex-center" v-for="(item, key) in  drawerItems " :key="key">
          <div class="row flex-center">
            <q-btn class="full-width radious-10px shadow-5" color="accent" text-color="white" :label="item.buttonTitle"
              :to="item.toPage" @click="drawer = !drawer" no-caps />
          </div>
        </div>
        <div class="q-py-xs q-px-sm flex-center">
          <div class="row flex-center">
            <q-btn class="full-width radious-10px shadow-5" color="negative" text-color="white" icon="logout"
              label="Log Out" no-caps @click="() => { logout(); drawer = !drawer }" v-if="isAuthenticated" />
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
      },
      "2": {
        "buttonTitle": "Ημερολογιο",
        "toPage": "callendar"
      },
      // "3": {
      //   "buttonTitle": "Κρατησεις",
      //   "toPage": "authenticated"
      // },
      // "4": {
      //   "buttonTitle": "Κρατησεις",
      //   "toPage": "authenticated"
      // },
      // "5": {
      //   "buttonTitle": "Κρατησεις",
      //   "toPage": "authenticated"
      // },
      // "6": {
      //   "buttonTitle": "Κρατησεις",
      //   "toPage": "authenticated"
      // },
      // "7": {
      //   "buttonTitle": "Κρατησεις",
      //   "toPage": "authenticated"
      // },
      // "8": {
      //   "buttonTitle": "Κρατησεις",
      //   "toPage": "authenticated"
      // },
      // "9": {
      //   "buttonTitle": "Κρατησεις",
      //   "toPage": "authenticated"
      // },
      // "10": {
      //   "buttonTitle": "Κρατησεις",
      //   "toPage": "authenticated"
      // },
      // "11": {
      //   "buttonTitle": "Κρατησεις",
      //   "toPage": "authenticated"
      // },
      // "12": {
      //   "buttonTitle": "Κρατησεις",
      //   "toPage": "authenticated"
      // },
      // "13": {
      //   "buttonTitle": "Κρατησεις",
      //   "toPage": "authenticated"
      // },
      // "14": {
      //   "buttonTitle": "Κρατησεις",
      //   "toPage": "authenticated"
      // },
      // "15": {
      //   "buttonTitle": "Κρατησεις",
      //   "toPage": "authenticated"
      // },
      // "16": {
      //   "buttonTitle": "Κρατησεις",
      //   "toPage": "authenticated"
      // },
      // "17": {
      //   "buttonTitle": "Κρατησεις",
      //   "toPage": "authenticated"
      // },
      // "18": {
      //   "buttonTitle": "Κρατησεις",
      //   "toPage": "authenticated"
      // },
      // "19": {
      //   "buttonTitle": "Κρατησεις",
      //   "toPage": "authenticated"
      // },
      // "20": {
      //   "buttonTitle": "Κρατησεις",
      //   "toPage": "authenticated"
      // },
      // "21": {
      //   "buttonTitle": "Κρατησεις",
      //   "toPage": "authenticated"
      // },
      // "22": {
      //   "buttonTitle": "Κρατησεις",
      //   "toPage": "authenticated"
      // },
      // "23": {
      //   "buttonTitle": "Κρατησεις",
      //   "toPage": "authenticated"
      // },
      // "24": {
      //   "buttonTitle": "Κρατησεις",
      //   "toPage": "authenticated"
      // }
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
