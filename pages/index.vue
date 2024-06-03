<script setup>
const {useAuthUser} = useAuth()
const user = useAuthUser()
const {twitterBorderColor} = useTailwindConfig()

const {getTweets} = useTweets()
const loading = ref(false)


const homeTweets = ref([])

onBeforeMount(async () => {
  loading.value = true

  try {
    const {tweets} = await getTweets()

    homeTweets.value = tweets
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})

const handleFormSuccess = (tweet) => {
  navigateTo({
    path: `/status/${tweet.id}`
  })
}

</script>

<template>
  <div>
    <MainSection title="Home" :loading="loading">
      <Head>
        <Title>Home / Twitter</Title>
      </Head>

      <div class="border-b" :class="twitterBorderColor">
        <TweetForm @onSuccess="handleFormSuccess" />
      </div>

      <TweetListFeed :tweets="homeTweets" />
    </MainSection>
  </div>
</template>