<script setup>
const {getTweetById} = useTweets()

const loading = ref(false)
const tweetId = useRoute().params.id
const humanTweet = ref({})

onBeforeMount(async () => {
  loading.value = true

  try {
    const {tweet} = await getTweetById(tweetId)
    humanTweet.value = tweet
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})


</script>

<template>
  <div>
    <MainSection title="Tweet" :loading="loading">
      <Head>
        <Title>Tweet / {{tweetId}}</Title>
      </Head>
      <TweetDetails :tweet="humanTweet" />
    </MainSection>
  </div>
</template>