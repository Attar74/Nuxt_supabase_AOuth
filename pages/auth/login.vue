<template>
  <section class="bg-gray-50">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div class="my-auto">
        <div class="mb-[2rem]">
          <h1
            class="text-[#101010] text-[3rem] font-bold leading-8 text-center"
          >
            Login
          </h1>
        </div>
        <div class="flex items-center mb-[0.5rem]">
          <hr class="flex-grow border-t border-gray-300" />
          <p class="px-[1rem] text-[#AAACB9] text-[0.75rem] font-medium">
            Login
          </p>
          <hr class="flex-grow border-t border-gray-300" />
        </div>
        <div>
          <div>
            <div>
              <p
                class="text-[#2A2F4F] text-[0.875rem] mb-[0.25rem] ml-[1rem] font-medium mt-[1rem]"
              >
                Email
              </p>
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"
                ></div>
                <input
                  type="email"
                  id="input-group-2"
                  class="border-[#D4D5DC] border-[0.063rem] outline-0 text-[1rem] text-[#000] rounded-full block w-[25.875rem] h-[3.5rem] pl-5 p-2.5 dark:placeholder-[#AAACB9]"
                  placeholder="Enter your Email"
                  v-model="email"
                />
              </div>
            </div>
            <p
              class="text-[#2A2F4F] text-[0.875rem] mt-[1rem] mb-[0.25rem] ml-[1rem] font-medium"
            >
              Password
            </p>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"
              ></div>
              <input
                id="input-group-3"
                class="border-[#D4D5DC] border-[0.063rem] outline-0 text-[1rem] text-[#000] rounded-full block w-[25.875rem] h-[3.5rem] pl-5 p-2.5 dark:placeholder-[#AAACB9]"
                placeholder="Enter your password"
                v-model="password"
              />
              <div
                class="absolute inset-y-0 right-[1.25rem] flex items-center pl-3.5"
              ></div>
              <p class="text-[1rem] ml-[1.8rem] text-red-600 mt-[0.5rem]">
                {{ errMsg }}
              </p>
            </div>
          </div>
            <button
              @click="logIn"
              type="button"
              class="w-full font-bold mt-[2rem] mx-auto text-white bg-[#264aec] hover:bg-[#2665f3] focus:outline-none leading-7 rounded-full text-[1rem] py-[0.875rem] text-center dark:bg-[#264aec]"
            >
              <p class="mx-3">Login</p>
            </button>
          <div class="flex justify-center mt-[1rem]">
            <p class="text-[1rem] text-[#AAACB9] mr-[0.5rem]">
              Don't have an account ?
            </p>
            <RouterLink to="/auth/register">
              <p
                class="text-[0.875rem] text-[#264aec] cursor-pointer font-semibold hover:underline leading-[1.5rem]"
              >
                Register
              </p>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

definePageMeta({
	middleware: ['login']
})

const email = ref("");
const password = ref(null);
const errMsg = ref("");
const client = useSupabaseClient();

const logIn = async () => {
  if (!email.value || !password.value) {
    errMsg.value = "Signup requires a non empty and valid credntials";
  } else {
    try {
      const { error } = await client.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      });
      if (error) {
        errMsg.value = error
        throw error;
      }
      localStorage.setItem("loggedIn", "true")
      navigateTo("/");
    } catch (err) {
      errMsg.value = err.message;
    }
  }
};
</script>
