<template>
    <div v-click-outside="hideDropdown" class="relative inline-block text-left w-full">
        <div>
            <label for="search" class="block text-sm font-medium leading-6 text-gray-900">Search and employ users</label>
            <div class="mt-2">
                <input
                    autocomplete="one-time-code"
                    type="text"
                    @focus="showDropdown"
                    name="search"
                    v-model="searchText"
                    @keyup.enter="handleSearch"
                    id="search"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
            </div>
            <!-- <button type="button" class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
               Options
                <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                </svg>
            </button> -->
        </div>

        <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
            From: "transform opacity-0 scale-95"
            To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
            From: "transform opacity-100 scale-100"
            To: "transform opacity-0 scale-95"
        -->
        <div v-show="dropdownState" class="w-full py-2 absolute left-0 z-10 mt-1 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            <div class="flex flex-col">
                <div v-for="option in options" @click="handleOptionSelect(option)" class="hover:bg-gray-100 py-1 px-3 cursor-pointer">
                    <slot name="option" :option="option">{{ option[displayKey] }}</slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    const emit = defineEmits(['searchChange', 'optionSelect']);
    const props = defineProps(['options', 'displayKey'])

    const dropdownState = ref(false);
    const inputOnFocus = ref(false);
    const searchText = ref('');

    const showDropdown = () => dropdownState.value = true;
    const hideDropdown = () =>{
        dropdownState.value = false;
    }

    const toggleDropdown = () => {
        if(inputOnFocus && dropdownState.value) return;
        dropdownState.value = !dropdownState.value;
    }

    const handleSearch = () => {
        emit('searchChange', searchText.value);
    }

    const handleOptionSelect = (option) => {
        emit('optionSelect', option);
        hideDropdown();
    }

</script>
