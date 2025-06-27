<template>
    <div>
        <h3 v-if="user" class="text-center fst-italic m-4">Welcome back, {{ user.username }}</h3>
        <p v-else>Loading user...</p>

        <div class="container">
            <div class="row">
                <div class="col-6">
                    <div class="pb-2">
                        <div class="card">
                            <div class="card-body">
                                <h4 v-if="user">
                                    <span class="fw-bold me-2">POINTS:</span>
                                    <span class="text-warning">{{ user.points }}</span>
                                </h4>
                                <p v-else>Loading points...</p>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div class="card min-vh-100">
                        <div class="card-body">
                            <h3>Event completion Log</h3>

                            <div v-if="ParticipatedObj && ParticipatedObj.length > 0 ">
                                <table class="table">
                                    <thead class="table-dark">
                                        <tr>
                                            <th scope="col" style="width: 10%;">No.</th>
                                            <th scope="col" style="width: 70%;">Event</th>
                                            <th scope="col" style="width: 10%;">points</th>
                                            <th scope="col" style="width: 10%;">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(EachEventUserParticipated, index) in ParticipatedObj"
                                            :key="EachEventUserParticipated._id">
                                            <th scope="row">{{ index + 1 }}</th>
                                            <td>{{ EachEventUserParticipated.eventID.eventName }}</td>
                                            <td>{{ EachEventUserParticipated.eventID.points }}</td>
                                            <td>
                                                <button disabled
                                                    :class="EachEventUserParticipated.EventCompletion ? ' btn btn-success' : ' btn btn-danger'">

                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>


                            <p v-else class="text-center">You have no record of past participation</p>

                        </div>
                    </div>
                </div>

                <div class="col-6">
                    <div class="card min-vh-100">
                        <div class="card-body ">
                            <h4>REWARDS REDEMPTION</h4>
                            <div class="d-flex flex-wrap gap-3 p-3">
                                <div class="card" style="width: 11rem;">
                                    <img src="@/assets/YaKunLogo.png" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">20% Voucher</h5>
                                        <p class="card-text">Enjoy 20% off your yakun meal with no min. spend
                                        </p>
                                        <a href="#" class="btn btn-primary">REDEEM NOW!</a>
                                    </div>
                                </div>
                                <div class="card" style="width: 11rem;">
                                    <img src="@/assets/YaKunLogo.png" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">20% Voucher</h5>
                                        <p class="card-text">Enjoy 20% off your yakun meal with no min. spend
                                        </p>
                                        <a href="#" class="btn btn-primary">REDEEM NOW!</a>
                                    </div>
                                </div>
                                <div class="card" style="width: 11rem;">
                                    <img src="@/assets/YaKunLogo.png" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">20% Voucher</h5>
                                        <p class="card-text">Enjoy 20% off your yakun meal with no min. spend
                                        </p>
                                        <a href="#" class="btn btn-primary">REDEEM NOW!</a>
                                    </div>
                                </div>
                                <div class="card" style="width: 11rem;">
                                    <img src="@/assets/YaKunLogo.png" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">20% Voucher</h5>
                                        <p class="card-text">Enjoy 20% off your yakun meal with no min. spend
                                        </p>
                                        <a href="#" class="btn btn-primary">REDEEM NOW!</a>
                                    </div>
                                </div>
                                <div class="card" style="width: 11rem;">
                                    <img src="@/assets/YaKunLogo.png" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">20% Voucher</h5>
                                        <p class="card-text">Enjoy 20% off your yakun meal with no min. spend
                                        </p>
                                        <a href="#" class="btn btn-primary">REDEEM NOW!</a>
                                    </div>
                                </div>
                                <div class="card" style="width: 11rem;">
                                    <img src="@/assets/YaKunLogo.png" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">20% Voucher</h5>
                                        <p class="card-text">Enjoy 20% off your yakun meal with no min. spend
                                        </p>
                                        <a href="#" class="btn btn-primary">REDEEM NOW!</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import BarChart from "./BarChart.vue"

const toast = useToast()
const router = useRouter()

const user = ref(null)
const ParticipatedObj = ref([]);




const getProfile = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/getProfile', {
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    })
    user.value = res.data
    console.log("Logged-in user:", res.data)
  } catch (err) {
    console.error(err)
    toast.error('Failed to load profile')
    router.push('/login')
  }
}

const getParticipated = async()=>{
    try{
        const res = await axios.get(`http://localhost:3000/api/getParticipatedData/${user.value._id}`)
        ParticipatedObj.value = res.data
        console.log(res.value)
    }catch(err){
        console.log(err)
    }
}


onMounted(async() => {
  
  await getProfile();
  await getParticipated();
})
</script>
