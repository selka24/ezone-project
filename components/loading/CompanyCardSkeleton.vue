<template>
    <div class="card items-center w-full max-w-lg bg-base-100 shadow-2xl">
        <div class="card-body w-full">
            <div class="flex flex-col justify-between items-center gap-x-5 gap-y-2 mb-8">
                <div class="card-title bg-base-300 w-[50%] animate-pulse h-7 rounded-2xl"></div>
                <div class="w-[100px] h-[100px] animate-pulse rounded-full bg-base-300"/>
                <div class="bg-base-300 animate-pulse w-[60%] h-6 rounded-2xl"></div>
            </div>
            <div class="mb-2 animate-pulse bg-base-300 w-full h-5 rounded-2xl">
            </div>
            <div class="h-full flex flex-col mt-2">
                <div class="flex flex-wrap gap-5 justify-between">
                    <div v-for="idx in 10" class="border border-gray-200 bg-base-300 w-[45%] animate-pulse h-12 rounded-xl items-center flex pr-2">
    <!--                    <div class="bg-white h-6 w-6 ml-auto rounded-full border border-primary"></div>-->
                    </div>
                </div>
                <div class="bg-base-300 mt-auto w-full h-12 animate-pulse rounded-full"></div>
            </div>
        </div>
    </div>
</template>
