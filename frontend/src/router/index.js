import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { useAuthStore } from 'stores/auth'

export default route(function (/* { store, ssrContext } */) {
  const authStore = useAuthStore();

  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  // Specific beforeEnter guard for the authenticated route
  Router.beforeEach((to, from, next) => {
    // Check if the route requires authentication
    const requiresAuth = to.meta.requiresAuth;

    if (requiresAuth) {
      // Check if the user is authenticated
      const isAuthenticated = authStore.isAuthenticated;

      if (!isAuthenticated) {
        next({ path: 'login' })
        return
      }
    }

    // Continue to the next route
    next();
  });

  return Router
})
