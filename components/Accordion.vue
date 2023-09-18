<script setup>
    const show = ref(false);

    const toggle = () => show.value = !show.value;
    const beforeEnter = (el) => {
        el.style.height = '0';
    }
    const enter = (el) => {
        el.style.height = el.scrollHeight + 'px';
    }

    const beforeLeave = (el) => {
        el.style.height = el.scrollHeight + 'px';
    }

    const leave = (el) => {
        el.style.height = '0';
    }
</script>

<template>
    <div class="accordion">
        <div class="flex">
            <div class="cursor-pointer" @click="toggle">
                <slot name="header">HEADER</slot>
            </div>
<!--            <i class="fa fa-2x fa-angle-down header-icon" v-bind:class="{ rotate: show }"></i>-->
            <div class="ml-auto">
                <slot name="right-actions"></slot>
            </div>
        </div>
        <transition name="accordion"
                    v-on:before-enter="beforeEnter" v-on:enter="enter"
                    v-on:before-leave="beforeLeave" v-on:leave="leave">
            <div class="body" v-show="show">
                <div class="body-inner">
                    <slot></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<style scoped>

.accordion .header-icon {
    position: absolute;
    top: 5px;
    right: 8px;
    transform: rotate(0deg);
    transition-duration: 0.3s;
}

.accordion .body {
    overflow: hidden;
    transition: 150ms ease-out;
}

.header-icon.rotate {
    transform: rotate(180deg);
    transition-duration: 0.3s;
}
</style>
