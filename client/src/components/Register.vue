<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10">
        <div class="card text-center">
          <div class="card-header fw-bold">REGISTER HERE</div>
          <div class="card-body">
            <!-- Wrap in a form and prevent default submit -->
            <form @submit.prevent="signUp">
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder="Enter username"
                  v-model="User.username"
                />
              </div>

              <div class="form-group mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  v-model="User.email"
                />
              </div>

              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Postal code"
                  v-model="User.postalCode"
                />
              </div>

              <div class="form-group mb-4">
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  v-model="User.password"
                />
              </div>

              <!-- Button Row Centered -->
              <div class="d-flex justify-content-center gap-3">
                <button type="submit" class="btn btn-success" style="width: 40%;">
                  CREATE
                </button>
                <button type="button" @click="testing" class="btn btn-secondary">
                  To Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-1"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const toast = useToast()
const router = useRouter()
const UrlLink = "http://localhost:3000/api/register"

const User = ref({
  email: '',
  password: '',
  postalCode: '',
  username: '',
})

const signUp = async () => {
  console.log(User.value)
  try {
    const tempData = await axios.post(UrlLink, { ...User.value })
    router.push('/login')
  } catch (err) {
    console.log(err)
    toast.error("Unable to register to IRUNSG :(")
  }
}

const testing = async () => {
  console.log("Trying to navigate to login manually")
  router.push("/login")
}
</script>
