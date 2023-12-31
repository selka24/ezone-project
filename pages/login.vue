<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto w-auto"
        height="100"
        src="/images/logo.png"
        alt="Your Company"
      />
      <h2
        class="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleLogin">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              v-model="loginData.email"
              @change="v$.email.$touch"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <span
              v-if="v$.email.$error"
              class="mt-2 text-sm text-red-500"
            >
              {{ v$.email.$errors[0].$message }}
            </span>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
            <div class="text-sm">
              <NuxtLink to="/" class="font-semibold text-indigo-600 hover:text-indigo-500"
                >Forgot password?</NuxtLink
              >
            </div>
          </div>
          <div class="mt-2">
            <input
              v-model="loginData.password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Not a member?
        <NuxtLink
          to="/register"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
            Register
        </NuxtLink>
      </p>
    </div>
    <Loading v-if="loading"/>
  </div>
</template>
<script setup>
    import { useVuelidate } from "@vuelidate/core";
    import { helpers, required, email, minLength } from "@vuelidate/validators";

    const {auth} = useSupabaseClient();
    const user = useSupabaseUser();
    const loading = ref(false)

    const loginData = reactive({
      email: "",
      password: "",
    });

    const rules = computed(() => {
        return {
            email: {
                required: helpers.withMessage("The email field is required!", required),
                email: helpers.withMessage("Invalid email format!", email),
            },
            password: {
                required: helpers.withMessage("The password field is required!", required),
                minLength: minLength(8),
            },
        }
    });

    const v$ = useVuelidate(rules, loginData);

    const handleLogin = async () => {
        loading.value = true;
        const valid = await v$.value.$validate();
        if (!valid) return;
        try {
        const { error } = await auth.signInWithPassword(loginData);
            if (error) throw error;
        } catch (error) {
            alert(error);
        } finally {
            loading.value = false;
        }
    };

    watchEffect(() => {
        if (user.value) {
            navigateTo('/')
        }
    })
</script>
