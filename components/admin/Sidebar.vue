<script setup lang="ts">
    const menu = [
        {icon: 'iconoir:candlestick-chart', title: 'Dashboard', path: ''},
        {icon: 'iconoir:wallet', title: 'Portfolio', path: ''},
        {icon: 'iconoir:stats-report', title: 'Reports', path: ''},
        {icon: 'iconoir:building', title: 'My Business', path: ''},
        {icon: 'iconoir:community', title: 'My Staff', path: ''},
        {icon: 'iconoir:settings', title: 'Settings', path: ''},
    ]

</script>

<template>
        <div class="fixed h-[100vh]  z-10 flex flex-col bg-primary pl-3 top-0">
            <div class="flex items-center justify-center rounded-md p-4 text-white mb-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-8 w-8 cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
            </div>

            <div class="rounded-md">
                <ul class="tabs flex-col items-center">
                    <li v-for="(item, idx) in menu"
                        :key="item.title"
                        :class="['cursor-pointer w-full flex gap-2 py-3 px-3 my-3 rounded-l-3xl relative', {'active bg-white': idx === 0}]">
                        <nuxt-link>
                            <Icon :name="item.icon" :class="['text-2xl text-white', {'text-primary': idx === 0}]"/>
                        </nuxt-link>
<!--                        <a>-->
<!--                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 cursor-pointer text-primary transition-all hover:text-blue-600">-->
<!--                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />-->
<!--                            </svg>-->
<!--                        </a>-->
                        <div :class="['text-white font-semibold',{'text-primary': idx === 0}]">{{item.title}}</div>
                    </li>
<!--                    <li class="w-full flex gap-2 py-3 px-3 my-3 rounded-l-3xl relative">-->
<!--                        <a>-->
<!--                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 cursor-pointer text-primary transition-all hover:text-blue-600">-->
<!--                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />-->
<!--                            </svg>-->
<!--                        </a>-->
<!--                        <div>Dashboard</div>-->
<!--                    </li>-->
<!--                    <li class="w-full flex gap-2 py-3 px-3 my-3 rounded-l-3xl relative">-->
<!--                        <a>-->
<!--                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 cursor-pointer text-primary transition-all hover:text-blue-600">-->
<!--                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />-->
<!--                            </svg>-->
<!--                        </a>-->
<!--                        <div>Dashboard</div>-->
<!--                    </li>-->
<!--                    <li class="w-full flex gap-2 py-3 px-3 my-3 rounded-l-3xl relative">-->
<!--                        <a>-->
<!--                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 cursor-pointer text-primary transition-all hover:text-blue-600">-->
<!--                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />-->
<!--                            </svg>-->
<!--                        </a>-->
<!--                        <div>Dashboard</div>-->
<!--                    </li>-->
<!--                    <li class="w-full flex gap-2 py-3 px-3 my-3 rounded-l-3xl relative">-->
<!--                        <a>-->
<!--                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 cursor-pointer text-primary transition-all hover:text-blue-600">-->
<!--                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />-->
<!--                            </svg>-->
<!--                        </a>-->
<!--                        <div>Dashboard</div>-->
<!--                    </li>-->
<!--                    <li class="w-full flex gap-2 py-3 px-3 my-3 rounded-l-3xl relative">-->
<!--                        <a>-->
<!--                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 cursor-pointer text-primary transition-all hover:text-blue-600">-->
<!--                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />-->
<!--                            </svg>-->
<!--                        </a>-->
<!--                        <div>Dashboard</div>-->
<!--                    </li>-->
<!--                    <li class="py-3 pl-3 my-3">-->
<!--                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 cursor-pointer text-white transition-all hover:text-blue-600">-->
<!--                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />-->
<!--                        </svg>-->
<!--                    </li>-->
<!--                    <li class="py-3 pl-3 my-3">-->
<!--                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 cursor-pointer text-white transition-all hover:text-blue-600">-->
<!--                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />-->
<!--                        </svg>-->
<!--                    </li>-->
<!--                    <li class="py-3 pl-3 my-3">-->
<!--                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 cursor-pointer text-white transition-all hover:text-blue-600">-->
<!--                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />-->
<!--                        </svg>-->
<!--                    </li>-->
<!--                    <li class="py-3 pl-3 my-3">-->
<!--                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 cursor-pointer text-white transition-all hover:text-blue-600">-->
<!--                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />-->
<!--                        </svg>-->
<!--                    </li>-->
<!--                    <li class="py-3 pl-3 my-3">-->
<!--                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 cursor-pointer text-white transition-all hover:text-blue-600">-->
<!--                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />-->
<!--                        </svg>-->
<!--                    </li>-->
                </ul>
            </div>
            <div class="mt-auto flex items-center justify-center pb-14 my-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 cursor-pointer text-white hover:text-blue-600">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
            </div>
        </div>
</template>

<style scoped>
.tabs li:before, .tabs li a:before {
    /* All pseudo elements are
       abs. positioned and on bottom */
    position: absolute;
    top: -13px;
}
 .tabs li:after, .tabs li a:after {
    /* All pseudo elements are
       abs. positioned and on bottom */
    position: absolute;
    bottom: -13px;
}
/* Only the first, last, and active
   tabs need pseudo elements at all */
.tabs li:last-child:after,   .tabs li:last-child a:after,
.tabs li:first-child:before, .tabs li:first-child a:before,
.tabs .active:after,   .tabs .active:before,
.tabs .active a:after, .tabs .active a:before {
    content: "";
}
.tabs .active:before, .tabs .active:after {
    background: white;

    /* Squares below circles */
    z-index: 1;
}
/* Squares */
.tabs  li:before, .tabs li:after {
    width: 30px;
    height: 30px;
}
.tabs li:before {
    right: 0;
}
.tabs li:after {
    right: 0;
}
/* Circles */
.tabs li a:after, .tabs li a:before {
    width: 40px;
    height: 20px;
    /* Circles are circular */
    -webkit-border-radius: 20px;
    -moz-border-radius:    20px;
    border-radius:         20px;

    /* Circles over squares */
    z-index: 2;
}
.tabs .active a:after, .tabs .active a:before {
    background: #fe5d0d;
}
/* First and last tabs have different
   outside color needs */
.tabs li:first-child.active a:before,
.tabs li:last-child.active a:after {
    //background: #222;
}
.tabs li a:before {
    right: 0;
    top: -20px;

}
.tabs li a:after {
    right: 0;
    bottom: -20px;
}
</style>
