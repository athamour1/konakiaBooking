<template>
  <q-page class="flex flex-center trees-pattern-background">
    <q-card bordered class="login-card">
      <q-card-section class="bg-primary text-white">
        <div class="text-h4 text-center">Login</div>
      </q-card-section>

      <q-card-actions vertical align="center" class="bg-secondary flex flex-cetner">
        <q-form @submit="onPressLogin()">
          <div class="flex flex-center full-width">
            <div class="col-12 full-width radious-10px">
              <div class="row q-pa-md flex flex-center">
                <q-input input-class="text-blue-grey-1" standout="bg-accent text-blue-grey-1 no-border radious-10px" dense
                  dark label="Email" class="full-width border-line-white radious-10px" v-model="email" />
              </div>
              <div class="row q-pa-md flex flex-center">
                <q-input dense dark input-class="text-blue-grey-1" standout="bg-accent text-white no-border radious-10px"
                  label="Password" :type="isPwd ? 'password' : 'text'" class="full-width border-line-white radious-10px"
                  v-model="password">
                  <template v-slot:append>
                    <q-icon :name="!isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer text-blue-grey-1"
                      @click="isPwd = !isPwd" />
                  </template>
                </q-input>
              </div>
              <div class="row q-pa-md flex flex-center">
                <q-btn class="radious-10px full-width" dense color="accent" label="Login" no-caps size="lg" type="
                  submit" />
              </div>
            </div>
          </div>
        </q-form>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router';
import { useAuthStore } from 'stores/auth'

export default defineComponent({
  name: 'AuthenticationPage',

  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const token = computed(() => authStore.getToken);
    const isAuthenticated = computed(() => authStore.getIsAuthenticated);
    const role = computed(() => authStore.getRole)

    const email = ref("");
    const password = ref("");
    const isPwd = ref(true);

    function onPressLogin() {
      authStore.loginUser(router, email.value, password.value);
    }

    return {
      email,
      password,
      isPwd,
      token,
      isAuthenticated,
      role,
      authStore,
      onPressLogin,
      router
    }
  }
})
</script>