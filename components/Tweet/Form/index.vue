<script setup>
const {useAuthUser} = useAuth()
const {postTweet} = useTweets()
const user = useAuthUser()
const loading = ref(false)


const handleFormSubmit = async (data) => {
  loading.value = true
  try {
    const response = await postTweet({
      text: data.text,
      mediaFiles: data.mediaFiles
    })
    console.log(response)
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <div>
    <div v-if="loading" class="flex justify-center items-center p-6">
      <UISpinner />
    </div>
    <div v-else>
      <TweetFormInput @onSubmit="handleFormSubmit" :user="user" />
    </div>
  </div>
</template>