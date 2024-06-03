<script setup>
const auth = useAuth()

const data = reactive({
  username: '',
  password: '',
  loading: false,
})

const handleLogin = async () => {
  data.loading = true
  try {
    await auth.login({
      username: data.username,
      password: data.password
    })
  } catch (error) {

  } finally {
    data.loading = false
  }
}

const isButtonDisabled = computed(() => {
  return (!data.username || !data.password) || data.loading
})
</script>

<template>
  <div class="w-full" @keyup.enter="handleLogin">
    <div class="flex justify-center">
      <div class="w-10 h-10">
        <LogoTwitter />
      </div>
    </div>
    <div class="pt-5 space-y-5">
      <UIInput v-model="data.username" label="Username" type="text" placeholder="@username" />
      <UIInput v-model="data.password" label="Password" type="password" placeholder="******" />

      <UIButton @click="handleLogin" liquid :disabled="isButtonDisabled">
        Login
      </UIButton>
    </div>
  </div>
</template>