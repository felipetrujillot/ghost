import { isAuthenticated } from '~/composables/helper'

export default defineNuxtRouteMiddleware(async (to, from) => {
  // isAuthenticated() is an example method verifying if a user is authenticated
  const authVal = await isAuthenticated()
  if (authVal === false) return
  if (typeof authVal === 'number') {
    if (authVal === 0) {
      return navigateTo('/admin')
    }
    if (authVal === 1) {
      return navigateTo('/rrhh')
    }

    if (authVal === 2) {
      return navigateTo('/dashboard')
    }
  }
})
