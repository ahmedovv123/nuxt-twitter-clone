<script setup>
const emits = defineEmits(['onCommentClick'])
import {ChatIcon, RefreshIcon, HeartIcon, UploadIcon} from '@heroicons/vue/outline'
const tweet = inject('tweet')

const props = defineProps({
  compact: {
    type: Boolean,
    default: false
  }
})

const generateRandomNumber = () => Math.floor(Math.random() * 100)
const size = computed(() => props.compact ? 5 : 6)
</script>

<template>
  <div class="flex items-center justify-around w-full">
    <TweetItemActionsIcon color="blue" :size="size" @onClick="emits('onCommentClick')">
      <template #icon="{classes}">
        <ChatIcon :class="classes" />
      </template>
      <span v-if="compact">
        {{tweet.repliesCount}}
      </span>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="green" :size="size">
      <template #icon="{classes}">
        <RefreshIcon :class="classes" />
      </template>
      <span v-if="compact">
        {{generateRandomNumber()}}
      </span>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="red" :size="size">
      <template #icon="{classes}">
        <HeartIcon :class="classes" />
      </template>
      <span v-if="compact">
        {{generateRandomNumber()}}
      </span>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="blue" :size="size">
      <template #icon="{classes}">
        <UploadIcon :class="classes" />
      </template>
      <span v-if="compact">
        {{generateRandomNumber()}}
      </span>
    </TweetItemActionsIcon>
  </div>
</template>