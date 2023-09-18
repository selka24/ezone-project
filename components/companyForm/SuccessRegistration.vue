<template>
    <div class="relative rounded-lg bg-white text-left w-full">
        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="flex flex-col items-center">
                <!-- <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
                </div> -->
                <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="h-6 w-6 text-green-600"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path></svg>
                </div>
                <div class="mt-3 text-center">
                    <h3 class="text-base text-center font-semibold leading-6 text-gray-900" id="modal-title">Success</h3>
                    <div class="mt-2">
                        <p class="text-sm text-center text-gray-500">Your company has been created successfully. You can now continue to your admin page.</p>
                    </div>

                </div>
            </div>
        </div>
        <div class="text-center mt-5">
            <NuxtLink to="/admin" class="border rounded-xl px-4 py-3">My admin page</NuxtLink>
        </div>
    </div>
</template>
