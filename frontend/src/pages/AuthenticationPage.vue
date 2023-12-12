<template>
  <q-page class="flex flex-center trees-pattern-background">
    <q-card bordered class="login-card">
      <q-card-section class="bg-primary text-white">
        <div class="text-h4 text-center">Login</div>
      </q-card-section>

      <q-card-actions vertical align="center" class="bg-secondary flex flex-cetner">
        <div class="flex flex-center full-width">
          <div class="col-12 full-width">
            <div class="row q-pa-md flex flex-center">
              <q-input dense dark rounded outlined label="Email" class="full-width" v-model="email" />
            </div>
            <div class="row q-pa-md flex flex-center">
              <q-input dense dark rounded outlined label="Password" :type="isPwd ? 'password' : 'text'" class="full-width"
                v-model="password">
                <template v-slot:append>
                  <q-icon :name="!isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="isPwd = !isPwd" />
                </template>
              </q-input>
            </div>
            <div class="row q-pa-md flex flex-center">
              <q-btn dense rounded color="accent" label="Login" no-caps size="lg" class="full-width" />
            </div>
          </div>
        </div>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'AuthenticationPage',

  setup() {
    const email = ref("");
    const password = ref("");
    const isPwd = ref(true);
    return {
      email,
      password,
      isPwd
    }
  }
})
</script>