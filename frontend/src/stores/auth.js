// auth.js
import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { LocalStorage } from 'quasar'

export const useAuthStore = defineStore('auth', {

  state: () => ({
    token: "",
    isAuthenticated: false,
    role: {},
  }),

  getters: {
    getToken: (state) => state.token,
    getIsAuthenticated: (state) => state.isAuthenticated,
    getRole: (state) => state.role,
  },

  actions: {
    setToken(token) {
      this.token = token
      LocalStorage.set("token", token)
    },

    setAuthenticated(status) {
      this.isAuthenticated = status
    },

    setRole(role) {
      this.role = role
    },

    async getUserRole() {
      try {
        const responseUserMe = await api.get('/api/users/me?populate=role', {
          headers: {
            Authorization: `Bearer ${this.getToken}`,
          },
        });
        this.setRole(responseUserMe.data.role.id)
      } catch (error) {
        console.log('Get User Rile Error:', error)
      }
    },

    async loginUser(router, identifier, password) {
      try {
        const credentials =
        {
          "identifier": JSON.parse(JSON.stringify(identifier)),
          "password": JSON.parse(JSON.stringify(password))
        }
        const response = await api.post('/api/auth/local', credentials)
        // Update state based on the response
        this.setToken(response.data.jwt)
        this.setAuthenticated(true)
        this.getUserRole()
        router.push('/authenticated')
      } catch (error) {
        // Handle error and update state accordingly
        console.error('Login failed:', error)
        throw error
      }
    },

    // Example action for logging out
    logout(router) {
      this.token = ""
      this.isAuthenticated = false
      this.role = {}
      router.push('/')
    },

    authInit() {
      let token = LocalStorage.getItem("token")
      if (token != "") {
        this.setAuthenticated(true)
        this.setToken(token)
        this.getUserRole()
      }
      // TODO: localstorage
    }
  },
})
