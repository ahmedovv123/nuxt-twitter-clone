<script setup>
const {defaultTransition} = useTailwindConfig()
const emits = defineEmits(['onClick'])

defineProps({
  color: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 5
  }
})
</script>

<template>
  <div @click.stop.prevent="emits('onClick')" class="flex items-center text-gray-400 cursor-pointer group">
    <div :class="`p-2 group-hover:bg-${color}-100 group-hover:text-${color}-400 rounded-full dark:group-hover:bg-opacity-20 ${defaultTransition}`">

      <slot name="icon" :classes="`w-${size} h-${size}`" />

    </div>

    <span :class="`ml-1 group-hover:text-${color}-400`">
      <slot />
    </span>
  </div>
</template>