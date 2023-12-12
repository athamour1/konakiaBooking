// auth.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: "skata",
    isAuthenticated: false,
    role: null,
  }),

  getters: {
    getToken: (state) => state.token,
    isAuthenticated: (state) => state.isAuthenticated,
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
        const response = await axios.post('/auth/local', credentials)
        // Update state based on the response
        this.setToken(response.data.jwt)
        this.setAuthenticated(true)
        this.setRole(response.data.role)
        return response.data
      } catch (error) {
        // Handle error and update state accordingly
        console.error('Login failed:', error)
        throw error
      }
    },

    // Example action for logging out
    logout() {
      this.token = null
      this.isAuthenticated = false
      this.role = null
    },

    test(x, y) {
      console.log("this one coming from store from login button");
      console.log(x);
      console.log(y);
    }
  },
})
