<script setup>
const props = defineProps({
  tweet: {
    type: Object,
    required: true,
  }
})

const replies = computed(() => props.tweet.replies || [])

const handleFormSuccess = (tweet) => {
  navigateTo({
    path: `/status/${tweet.id}`
  })
}
</script>

<template>
  <div>
    <TweetItem :tweet="tweet" />
    <TweetForm :replyTo="tweet" :placeholder="'Tweet your reply'" @onSuccess="handleFormSuccess" />
    <TweetListFeed :tweets="replies" />
  </div>
</template>