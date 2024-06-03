<script setup>
const darkMode = ref(false)
const {useAuthUser, initAuth, useAuthLoading, logout} = useAuth()

const isAuthLoading = useAuthLoading()
const user = useAuthUser()
const {closePostTweetModal, openPostTweetModal, useReplyTweet} = useTweets()
const emitter = useEmitter()
const replyTweet = useReplyTweet()

emitter.$on('replyTweet', (tweet) => {
  openPostTweetModal(tweet)
})
onBeforeMount(() => {
  initAuth()
})

const handleFormSuccess = (tweet) => {
  handleCloseModal()
  navigateTo({
    path: `/status/${tweet.id}`
  })
}

const handleCloseModal = () => {
  closePostTweetModal()
}

const handleOpenModal = () => {
  openPostTweetModal(null)
}

const handleToggleDarkMode = () => {
  darkMode.value = !darkMode.value
}

const handleUserLogout = () => {
 logout()
}
</script>

<template>
  <div :class="{'dark': darkMode}">

    <div class="bg-white dark:bg-dim-900">
      <LoadingPage v-if="isAuthLoading" />
      <div v-else-if="user" class="min-h-full">
        <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">

          <!-- Left sidebar -->
          <div class="hidden md:block xs:col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft @onTweet="handleOpenModal" @onLogout="handleUserLogout" />
            </div>
          </div>

          <!-- Main content -->
          <main class="col-span-12 md:col-span-8 xl:col-span-6">
            <NuxtPage />
          </main>

          <!-- Right sidebar -->
          <div class="hidden md:block xl:col-span-4 md:col-span-3">
            <div class="sticky top-0">
              <SidebarRight @toggleDarkMode="handleToggleDarkMode" />
            </div>
          </div>
        </div>

      </div>
      <AuthPage v-else />

      <UIModal @closeModal="handleCloseModal">
        <TweetForm @onSuccess="handleFormSuccess" showReply :replyTo="replyTweet" />
      </UIModal>
    </div>
  </div>
</template>
