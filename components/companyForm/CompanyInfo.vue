<template>
    <form @submit.prevent="handleSubmit">
        <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">
                <CompanyFormStepHeader title="Business Information" description="This information will be displayed publicly so be careful what you share."/>
                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-4">
                        <label for="business_name" class="block text-sm font-medium leading-6 text-gray-900">Business name</label>
                        <div class="mt-2">
                            <input
                                v-model="mainStore.businessInfo.name"
                                @change="v$.name.$touch"
                                type="text"
                                name="business_name"
                                id="business_name"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                            <span
                                v-if="v$.name.$error"
                                class="mt-2 text-sm text-red-500"
                            >
                                {{ v$.name.$errors[0].$message }}
                            </span>
                        </div>
                    </div>

                    <div class="sm:col-span-4">
                        <div class="block text-sm font-medium leading-6 text-gray-900">Business Logo</div>
                        <div class="mt-2">
                            <LogoUpload v-model:path="mainStore.businessInfo.logo_url" @upload="mainStore.updateCompany"/>
                        </div>
                    </div>

                   <div class="sm:col-span-4">
                        <label for="url" class="block text-sm font-medium leading-6 text-gray-900">URL</label>
                        <div class="mt-2">
                            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">{{host}}/</span>
                                <input
                                    v-model="mainStore.businessInfo.url"
                                    @change="v$.url.$touch"
                                    @blur="handleUrlChange"
                                    type="text"
                                    name="url" id="url" autocomplete="username" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="janesmith"
                                >
                                <button v-if="checkingUrl" type="button" class="rounded-lg flex gap-2 items-center p-2 px-4" >
                                    <div class="border-gray-300 h-5 w-5 animate-spin rounded-full border-2 border-t-blue-600" />
                                    <span class="text-gray-900 text-xs">Checking URL...</span>
                                </button>
                            </div>

                            <span
                                v-if="v$.url.$error || urlExists"
                                class="mt-2 text-sm text-red-500"
                            >
                                {{ (urlExists && 'This url is already chosen. Please enter another one!') || v$.url.$errors[0].$message }}
                            </span>
                        </div>
                    </div>

                    <div class="col-span-full">
                        <label for="about" class="block text-sm font-medium leading-6 text-gray-900">About</label>
                        <div class="mt-2">
                            <textarea
                                v-model="mainStore.businessInfo.description"
                                id="about"
                                name="about" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                        </div>
                        <p class="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-6 flex items-center justify-end gap-x-6">
            <button @click="handleDelete" type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
            <button type="submit" class="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
        </div>
    </form>
</template>
<script setup>
    import {useMainStore} from '~/stores/main';
    import {useVuelidate} from '@vuelidate/core';
    import {required, helpers, alpha} from '@vuelidate/validators';
    import LogoUpload from "~/components/companyForm/LogoUpload.vue";

    const mainStore = useMainStore();
    const client = useSupabaseClient();
    const urlExists = ref(false);
    const checkingUrl = ref(false);

    const host = ref('ezone.com');
    if(!process.server){
        host.value = window.location.host
    }


    const rules = computed(() => {
        return {
            name: {required},
            url: {
                required,
                alpha
            }
        }
    })

    const v$ = useVuelidate(rules, mainStore.businessInfo);

    const handleUrlChange = async () => {
        if(!v$.value.url.$error && mainStore.businessInfo.url){
            checkingUrl.value = true;
            const {data, error} = await client
            .from('companies')
            .select()
            .match({url: mainStore.businessInfo.url})

            if(error) alert(error);
            if(data.length) {
                urlExists.value = true;
            } else {
                urlExists.value = false;
            }
            checkingUrl.value = false;
        } else {
            urlExists.value = false;
        }
    }

    const handleDelete = () => {
        mainStore.deleteCompany();
    }

    const handleSubmit = async () => {
        const valid = await v$.value.$validate();
        if(valid && !urlExists.value) {
            mainStore.createCompany();
            // mainStore.formStep++;
            // alert('Valid')
        } else {
            alert('Invalid')
        }
    }
</script>
