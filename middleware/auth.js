export default defineNuxtRouteMiddleware(async (to, from) => {
  const loggedIn = process.client ? localStorage.getItem("loggedIn") : ''
  const user = await useSupabaseUser();

  if (!user.value && process.client && loggedIn != 'true') {
    return navigateTo('/auth/login');
  }
});