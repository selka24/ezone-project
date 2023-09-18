<template>
<div>
  <div v-click-outside="handleClickOutside" class="relative mt-2">
    <button @click="handleToggle" type="button" class="relative w-full cursor-default rounded-md bg-white py-1.5 px-5 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
      <span :class="[{'text-gray-400': timeParts[0] === '00' && timeParts[1] === '00'}, 'flex justify-between items-center']">
        <span>{{timeParts[0] || '00'}}</span>
        <span>:</span>
        <span>{{timeParts[1] || '00'}}</span>
      </span>
    </button>
    <div v-show="selecState" class="flex absolute z-10 mt-1 max-h-56 w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
      <div class="overflow-y-scroll no-scrollbar border-r">
        <div v-for="hour in hours" :key="hour + 'h'" @click="handleTimeChange(hour, 0)" class="cursor-pointer text-gray-900 relative cursor-default select-none py-2 pl-5 pr-3 hover:text-blue-500" id="listbox-option-0" role="option">
            <div class="items-center">
                <span :class="[timeParts.hour === hour ? 'font-semibold' : 'font-normal', 'block']">{{ hour }}</span>
            </div>
        </div>
      </div>
      <div  class="overflow-y-scroll no-scrollbar">
        <div v-for="minute in minutes" :key="minute + 'm'" class="text-gray-900 relative cursor-default select-none py-2 pr-5 pl-2 hover:text-blue-500" id="listbox-option-0" role="option">
            <div @click="handleTimeChange(minute, 1)" class="cursor-pointer items-center">
            <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                <span :class="[timeParts.minute === minute ? 'font-semibold' : 'font-normal', 'block']">{{ minute }}</span>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script setup>
    const emit = defineEmits(['update:modelValue']);
    const props = defineProps(['modelValue'])

    const addZero = (num) => {
        num = `${num}`
        if(num.length === 1)
            return `0${num}`;
        return num;
    }
    const hours = [...Array(6).keys()].map(x => addZero(x));
    const minutes = [...Array(12).keys()].map(x => addZero(x*5));

    const selecState = ref(false);

    const timeParts = computed(() => {
        return props.modelValue.split(':');
    })

    const handleClickOutside = () => selecState.value = false;

    const handleTimeChange = (value, idx) => {
        console.log(timeParts.value, 'timePArts')
        const newValue = timeParts.value.toSpliced(idx, 1, value).join(':');
        emit('update:modelValue', newValue);
    }

    const handleToggle = () => {
        selecState.value = !selecState.value
    }
</script>
