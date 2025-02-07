import { isAuthenticated } from '~/composables/helper'

export default defineNuxtRouteMiddleware(async (to, from) => {
  // isAuthenticated() is an example method verifying if a user is authenticated
  const authVal = await isAuthenticated()

  if (authVal === false) {
    const token = useCookie('token')
    const nombre = useCookie('nombre')

    token.value = null
    nombre.value = null

    return navigateTo('/login')
  }
})
