<template>
  <div>
    <h3 v-if="user" class="text-center">Welcome back, {{ user.username }}</h3>
    <p v-else>Loading user...</p>

    <div class="container">
      <div class="row">
        <div class="col-6">
          <div class="pb-2">
            <div class="card">
              <div class="card-body">
                <h4 v-if="user">POINTS: {{ user.points }}</h4>
                <p v-else>Loading points...</p>
              </div>
            </div>
          </div>
          <br />
          <div class="card min-vh-100">
            <div class="card-body">
            <BarChart/>
            </div>
          </div>
        </div>

        <div class="col-6">
          <div class="card min-vh-100">
            <div class="card-body">
              <h4>EVENTS AVAILABLE!</h4>
              <br />

              <div v-if="events && events.length > 0">
                <table class="table">
                  <thead class="table-dark">
                    <tr>
                      <th scope="col" style="width: 10%;">No.</th>
                      <th scope="col" style="width: 80%;">Event</th>
                      <th scope="col" style="width: 10%;"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(event, index) in events" :key="event._id">
                      <th scope="row">{{ index + 1 }}</th>
                      <td>{{ event.eventName }}</td>
                      <td>
                        <button @click="viewEvent(event._id)" class="btn btn-success">View</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p v-else>Sorry, no events available.</p>
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
const events = ref([])
const ChartCount = ref(null) 

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

const getAllEvents = async () => {
  try {
    let res = await axios.get("http://localhost:3000/api/getAllEvents")
    events.value = res.data
  } catch (err) {
    console.log(err)
    toast.error('Failed to load events')
  }
}



const getChartData = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/getChartData")
    ChartCount.value = res.data.count
    console.log("Event count:", ChartCount.value)
    console.log("Raw response:", res)
    console.log("Raw response data:", res.data)
    console.log("Event count:", res.data.count)

  } catch (err) {
    console.log(err)
    toast.error('Failed to load chart data')
  }
}


const viewEvent = async(id)=>{
  try{
    router.push("/viewEvent/"+id)
  }catch(err){
    console.log("an error occured when transporting you to viewevents page")
  }
  
}




onMounted(() => {
  getChartData()
  getProfile()
  getAllEvents()
  
})
</script>
