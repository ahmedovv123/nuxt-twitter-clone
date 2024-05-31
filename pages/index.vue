<script setup>

const loading = ref(false)

</script>

<template>
  <div>
    <MainSection title="Home" :loading="loading">
      This is our home page
    </MainSection>
  </div>
</template>