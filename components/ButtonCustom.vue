<script setup lang="ts">
    const props = defineProps({
        theme: {
            type: String,
            default: 'default'
        },
        disabled: {
            type: Boolean,
        },
        type: {
            type: String,
            default: 'button'
        }
    });

    const classes = {
        danger: 'bg-red-500 hover:bg-red-400 focus-visible:outline-red-600',
        default: 'bg-blue-500 hover:bg-indigo-500 focus-visible:outline-indigo-500'
    }

    const currClass = computed(() => {
        if(props.theme) return classes[props.theme];
        return classes.default;
    })
</script>

<template>
    <button :disabled="disabled"
            :type="type"
            :class="[currClass, 'rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:bg-gray-400']">
        <slot>Action</slot>
    </button>
</template>
