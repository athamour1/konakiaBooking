
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), meta: { requiresAuth: false } },
      { path: 'login', component: () => import('pages/AuthenticationPage.vue'), meta: { requiresAuth: false } },
      { path: 'authenticated', component: () => import('pages/AuthenticatedPage.vue'), meta: { requiresAuth: true } },
      { path: 'callendar', component: () => import('pages/CallendarPage.vue'), meta: { requiresAuth: true } }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
