<script setup>

const {getTweets: getTweetsComposable} = useTweets()
const loading = ref(false)


const searchTweets = ref([])

watch(() => useRoute().fullPath, () => getTweets())

async function getTweets() {
  loading.value = true
  const searchQuery = useRoute().query.q
  try {
    const {tweets} = await getTweetsComposable({
      query: searchQuery
    })

    searchTweets.value = tweets
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

onBeforeMount(() => {
  getTweets();
})

</script>

<template>
  <div>
    <MainSection title="Search" :loading="loading">
      <Head>
        <Title>Search</Title>
      </Head>


      <TweetListFeed :tweets="searchTweets" />
    </MainSection>
  </div>
</template>