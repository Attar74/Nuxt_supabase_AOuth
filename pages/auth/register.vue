<template>
  <section class="bg-gray-50">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div class="my-auto">
        <div>
          <h1
            class="text-[#101010] text-[3rem] font-bold leading-8 text-center"
          >
            SignUp
          </h1>
          <h1
            class="text-[#101010] text-[1.5rem] mt-[3rem] font-normal leading-6 w-[25.875rem] text-center"
          >
            Or Continue using
          </h1>
        </div>
        <div class="my-[2rem]" />
        <div class="flex justify-evenly mb-[1.5rem] mx-[2.5rem]">
          <button @click="loginWithSocialLinks('google')">
            <div
              class="cursor-pointer rounded-[2rem] flex border-[0.063rem] border-[#101010] w-[9rem] px-[2rem] py-[0.75rem]"
            >
              <img :src="googleIcon" alt="" />
              <p
                class="text-[#101010] text-[0.875rem] font-semibold ml-[0.375rem] leading-[1.5rem]"
              >
                Google
              </p>
            </div>
          </button>
          <button @click="loginWithSocialLinks('facebook')">
            <div
              class="cursor-pointer rounded-[2rem] flex border-[0.063rem] border-[#101010] w-[9rem] px-[1.438rem] py-[0.75rem]"
            >
              <img :src="facebookIcon" alt="" />
              <p
                class="text-[#101010] text-[0.875rem] font-semibold ml-[0.375rem] leading-[1.5rem]"
              >
                Facebook
              </p>
            </div>
          </button>
        </div>
        <div class="flex items-center mb-[0.5rem]">
          <hr class="flex-grow border-t border-gray-300" />
          <p class="px-[1rem] text-[#AAACB9] text-[0.75rem] font-medium">Sign Up</p>
          <hr class="flex-grow border-t border-gray-300" />
        </div>
        <div>
          <form @submit.prevent="signUp">
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
              </div>
              <p class="text-[1rem] ml-[1.8rem] text-red-600 mt-[0.5rem]" v-if="errMsg">
                {{ errMsg }}
              </p>
              <p class="text-[1rem] ml-[1.8rem] text-green-600 mt-[0.5rem]" v-else-if="successMsg">
                {{ successMsg }}
              </p>
            </div>
            <button
              @click="signUp"
              type="button"
              class="w-full font-bold mt-[2rem] mx-auto text-white bg-[#264aec] hover:bg-[#2665f3] focus:outline-none leading-7 rounded-full text-[1rem] py-[0.875rem] text-center dark:bg-[#264aec]"
            >
              <p class="mx-3">Register</p>
            </button>
            <div class="flex justify-center mt-[1rem]">
              <p class="text-[1rem] text-[#AAACB9] mr-[0.5rem]">
                Already have an account ?
              </p>
              <RouterLink to="/auth/login">
                <p
                  class="text-[0.875rem] text-[#264aec] cursor-pointer font-semibold hover:underline leading-[1.5rem]"
                >
                  Log In
                </p>
              </RouterLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import googleIcon from "@/assets/img/auth/google.svg";
import facebookIcon from "@/assets/img/auth/facebook.svg";
import { ref } from "vue";

definePageMeta({
	middleware: ['login']
})

const client = useSupabaseClient();
const email = ref("");
const password = ref(null);
let errMsg = ref('');
let successMsg = ref(null);

const signUp = async () => {
  if(!email.value || !password.value) {
    errMsg.value = 'Signup requires a non empty and valid credntials'
  }
  else {
    try {
      const { error } = await client.auth.signUp({
        email: email.value,
        password: password.value,
      });

      if (error) {
        errMsg.value = error
        throw error;
      } else {
        successMsg.value = "User have been created! Congrats!!"
        setTimeout(() => {
          navigateTo('/')
        }, 1500)
      }
    } catch (err) {
      errMsg.value = err.message;
    }
  }
};
const loginWithSocialLinks = async (provider) => {
  try {
    const { errors } = await client.auth.signInWithOAuth({
      provider
    });
    localStorage.setItem("loggedIn", "true")

    if (errors) {
      throw error;
    }
  } catch (err) {
    errMsg.value = error.message;
  }
};
</script>
