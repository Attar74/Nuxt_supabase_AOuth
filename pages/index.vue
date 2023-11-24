<template>
  <section class="bg-gray-50">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div class="my-auto">
        <div>
          <p class="text-center text-[2rem]">Welcome</p>
          <p class="text-center text-[2rem]">{{ loggedInUser?.user_metadata?.full_name || loggedInUser?.email || "loading your data...." }}</p>
          <p class="text-center text-[2rem]">We are glad you are here!!</p>
        </div>
        <button
          @click="logout"
          type="button"
          class="w-full font-bold mt-[2rem] mx-auto text-white bg-[#ea4335] hover:bg-[#d85d52] focus:outline-none leading-7 rounded-full text-[1rem] py-[0.875rem] text-center dark:bg-[#ea4335]"
        >
          <p class="mx-3">Logout</p>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
const loggedInUser = await useSupabaseUser();
const supabase = await useSupabaseClient();

definePageMeta({
	middleware: ['auth']
})

const logout = async () => {
	// LOGOUT MANUALLY DUE TO SUPABASE BUG 
	try {
		await $fetch('api/_supabase/session', {
			method: "POST",
			body: {
				event: "SIGNED_OUT", session: null
			}
		})
		loggedInUser.value = null
		const authCookie = useCookie('sb-access-token')
		const authCookie1 = useCookie('sb-refresh-token')
		const authCookie2 = useCookie('sb-access-token')
		const authCookie3 = useCookie('sb-refresh-token')
   	authCookie.value = authCookie1.value = authCookie2.value = authCookie3.value = null
		localStorage.setItem("loggedIn", "false")
		const { errors } = await supabase.auth.signOut();
		if (errors) {
			throw error;
		}
		return navigateTo('/auth/login');
	} catch (error){
		console.log(error)
	}
};
</script>
