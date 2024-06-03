<script setup>
defineProps({
  tweets: {
    type: Array,
    required: true
  }
})

const {twitterBorderColor, defaultTransition} = useTailwindConfig()

const redirect = (tweet) => {
  navigateTo({
    path: `/status/${tweet.id}`
  })
}
</script>

<template>
  <div v-if="!tweets.length" class="p-4">
    <p class="text-center text-gray-500">No tweets 😢</p>
  </div>
  <div v-else class="pb-4 border-b hover:bg-gray-100 cursor-pointer dark:hover:bg-dim-300" :class="[twitterBorderColor, defaultTransition]"
       v-for="tweet in tweets" :key="tweet.id"
       @click.native="redirect(tweet)"
  >
    <TweetItem :tweet="tweet" compact/>
  </div>
</template>