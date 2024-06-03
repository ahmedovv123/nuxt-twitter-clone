<script setup>
const props = defineProps({
  placeholder: {
    type: String,
    default: 'What\'s happening?'
  },
  replyTo: {
    type: Object,
    default: null
  },
  showReply: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['onSuccess'])

const {useAuthUser} = useAuth()
const {postTweet} = useTweets()
const user = useAuthUser()
const loading = ref(false)


const handleFormSubmit = async (data) => {
  loading.value = true
  try {
    const response = await postTweet({
      text: data.text,
      mediaFiles: data.mediaFiles,
      replyTo: props.replyTo?.id
    })
    emits('onSuccess', response.tweet)
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
      <TweetItem v-if="replyTo && showReply" :tweet="replyTo" hideActions />
      <TweetFormInput @onSubmit="handleFormSubmit" :user="user" :placeholder="placeholder" />
    </div>
  </div>
</template>