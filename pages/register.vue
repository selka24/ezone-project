<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
            class="mx-auto w-auto"
            height="100"
            src="/images/logo.png"
            alt="E Zone"
            />
            <h2
            class="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
            >
            Register your account
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit.prevent="handleSignup">

            <div>
                <label for="username" class="block text-sm font-medium leading-6 text-gray-900">
                    Username
                </label>
                <div class="mt-2">
                    <input
                        v-model="registerData.user_name"
                        @change="v$.user_name.$touch"
                        id="username"
                        name="username"
                        type="text"
                        required
                        class="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <span
                        v-if="v$.user_name.$error"
                        class="mt-2 text-sm text-red-500"
                    >
                        {{ v$.user_name.$errors[0].$message }}
                    </span>
                </div>
            </div>

            <div>
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                </label>
                <div class="mt-2">
                    <input
                        v-model="registerData.email"
                        @change="v$.email.$touch"
                        id="email"
                        name="email"
                        type="email"
                        autocomplete="email"
                        required
                        class="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <span
                        v-if="v$.email.$error"
                        id="email-error"
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
                        class="block text-sm font-medium leading-6 text-gray-900">
                        Password
                    </label>
                </div>
                <div class="mt-2">
                    <input
                        v-model="registerData.password"
                        @change="v$.password.$touch"
                        id="password"
                        name="password"
                        type="password"
                        autocomplete="current-password"
                        required
                        class="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <span
                        v-if="v$.password.$error"
                        class="mt-2 text-sm text-red-500"
                    >
                        {{ v$.password.$errors[0].$message }}
                    </span>
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between">
                    <label
                        for="confirm"
                        class="block text-sm font-medium leading-6 text-gray-900">
                        Confirm Password
                    </label>
                </div>
                <div class="mt-2">
                    <input
                        v-model="registerData.confirmPassword"
                        @change="v$.confirmPassword.$touch"
                        id="confirm"
                        name="confirmPassword"
                        type="password"
                        autocomplete="current-password"
                        required
                        class="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <span
                        v-if="v$.confirmPassword.$error"
                        class="mt-2 text-sm text-red-500"
                    >
                        {{ v$.confirmPassword.$errors[0].$message }}
                    </span>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 px-1.5 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Register
                </button>
            </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
                Already a member?
                <NuxtLink
                    to="/login"
                    class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                    Login
                </NuxtLink>
            </p>
        </div>
        <Modal v-if="successReg"/>
    </div>
</template>
<script setup>
    import {useVuelidate} from '@vuelidate/core'
    import {helpers, required, email, minLength, sameAs} from '@vuelidate/validators'

    const user = useSupabaseUser();
    const {auth} = useSupabaseClient();

    const registerData = reactive({
        email: '',
        password: '',
        confirmPassword: '',
        user_name: '',
    })

    const successReg = ref(false)

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
            confirmPassword: {
                required: helpers.withMessage("The confirm password field is required!", required),
                sameAs: helpers.withMessage("Passwords don't match", sameAs(registerData.password)),
            },
            user_name: {
                required: helpers.withMessage("The business name field is required!", required),
            }
        }
    })

    const v$ = useVuelidate(rules, registerData);



    const handleSignup = async () => {
        const valid = await v$.value.$validate();
        if(!valid) return;
        try {
            const { error } = await auth.signUp({
                email: registerData.email,
                password: registerData.password,
                options: {
                    data: {
                        full_name: registerData.user_name,
                    }
                }
            });
            if(error) throw error;
            successReg.value = true;
        } catch (error) {
            alert(error.message);
        }
    }


    watchEffect(() => {
        if (user.value) {
            navigateTo('/')
        }
    })
</script>
