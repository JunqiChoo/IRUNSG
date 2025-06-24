<template>
  <div>
    <h1 v-if="user">Welcome back, {{ user.username }}</h1>
    <p v-else>Loading user...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const toast = useToast()
const router = useRouter()

const user = ref() // Start with null, not {}

const getProfile = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/getProfile', {
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    })
    console.log(".....................")
    user.value = res.data
    console.log("Logged-in user:", res.data)
  } catch (err) {
    console.error(err)
    toast.error('Failed to load profile')
    router.push('/login') // Optional redirect
  }
}

// ✅ Run when component mounts
onMounted(() => {
  getProfile()
})
</script>
