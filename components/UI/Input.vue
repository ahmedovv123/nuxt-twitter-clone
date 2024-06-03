<script setup>
const value = defineModel({type: String, required: true})
defineProps({
  label: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: ''
  }
})
const attrs = useAttrs()

</script>

<template>
  <div class="border-none">
    <label v-if="label" class="block pl-3 ml-px text-sm font-medium text-gray-700">{{label}}</label>
    <input v-bind="{...attrs}" v-model="value" class="block px-4 w-full border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" :placeholder="placeholder">
  </div>
</template>