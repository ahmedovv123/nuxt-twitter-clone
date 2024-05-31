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
</script>

<template>
  <div>
    <div class="pt-5 space-y-5">
      <UIInput v-model="data.username" label="Username" type="text" placeholder="@username" />
      <UIInput v-model="data.password" label="Password" type="password" placeholder="******" />
      <div>
        <button @click="handleLogin">Login</button>
      </div>
    </div>
  </div>
</template>