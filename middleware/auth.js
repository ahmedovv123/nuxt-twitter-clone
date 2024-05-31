export default defineNuxtRouteMiddleware((to, form) => {
  const isLoggedIn = false

  if (isLoggedIn) {
    return navigateTo(to.fullPath)
  }

  // return navigateTo('/login')
})