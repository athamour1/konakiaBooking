// auth.js
import { defineStore } from 'pinia'
// import axios from 'axios'
import { api } from 'boot/axios'

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
    },

    setAuthenticated(status) {
      this.isAuthenticated = status
    },

    setRole(role) {
      this.role = role
    },

    async loginUser(identifier, password) {
      try {
        const credentials =
        {
          "identifier": identifier,
          "password": password
        }
        const response = await api.post('/api/auth/local', credentials)
        // Update state based on the response
        this.setToken(response.data.jwt)
        this.setAuthenticated(true)

        try {
          const responseUserMe = await api.get('/api/users/me?populate=role', {
            headers: {
              Authorization: `Bearer ${response.data.jwt}`,
            },
          });
          this.setRole(responseUserMe.data.role.id)
        } catch (error) {
          console.log('Users me:', error)
        }

        return response.data
      } catch (error) {
        // Handle error and update state accordingly
        console.error('Login failed:', error)
        throw error
      }
    },

    // Example action for logging out
    logout() {
      this.token = ""
      this.isAuthenticated = false
      this.role = {}
    },

    test(x, y) {
      console.log("this one coming from store from login button");
      console.log(x);
      console.log(y);
    }
  },
})
