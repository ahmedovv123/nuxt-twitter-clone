<script setup>
const props = defineProps({
  tweet: {
    type: Object,
    required: true
  },
  compact: {
    type: Boolean,
    default: false
  },
  hideActions: {
    type: Boolean,
    default: false
  }
})

provide('tweet', props.tweet)

const {twitterBorderColor} = useTailwindConfig()

const tweetBodyWrapper = computed(() => props.compact ? 'ml-16' : 'ml-2 mt-4')
const textSize = computed(() => props.compact ? 'text-base' : 'text-2xl')
const emitter = useEmitter()

const handleCommentClick = () => {
  emitter.$emit('replyTweet', props.tweet)
}
</script>

<template>
  <div>
    <TweetItemHeader />
    <div :class="tweetBodyWrapper">
      <p class="flex-shrink font-medium text-gray-800 w-auto dark:text-white" :class="textSize">
        {{ tweet.text }}
      </p>
      <div v-for="image in tweet.mediaFiles" :key="image.id" class="flex my-3 mr-2 border-2 rounded-2xl overflow-hidden"
           :class="twitterBorderColor">
        <img :src="image.url" class="w-full rounded-2xl"/>
      </div>

      <div class="mt-2" v-if="!hideActions">
        <TweetItemActions @onCommentClick="handleCommentClick" :compact="compact"/>
      </div>
    </div>
  </div>
</template>