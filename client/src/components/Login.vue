<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10">
        <div class="card text-center">
          <div class="card-header fw-bold">LOGIN</div>
          <div class="card-body">
            <!-- Prevent form submission and call Login() -->
            <form @submit.prevent="loginUser">

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
                <button @click="createAccountClick" class="btn btn-secondary" style="width: 40%;">
                  Create Account?
                </button>
                <button type="submit" class="btn btn-success" style="width: 40%;">
                  LOGIN
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
    const toast = useToast();
    const router = useRouter();
    const User = ref({
        email:'',
        password:''
    })





const loginUser = async () => {
  try {
    const res = await axios.post('http://localhost:3000/api/login', {
      email: User.value.email,
      password: User.value.password
    });

    localStorage.setItem('token', res.data.token);
    toast.success('Login successful!');
    router.push('/Home'); // or whatever route you use
  } catch (err) {
    toast.error('Login failed.');
    console.error(err);
    router.push('/login')
    toast.error("Username or password inavlid, please try again.....")
  }
};

const createAccountClick = async()=>{
  router.push("/register")
};

</script>
