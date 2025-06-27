<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10">
        <div class="card text-center">
          <div class="card-header fw-bold">EDIT EVENT</div>
          <div class="card-body">
            <form @submit.prevent="editEvent">
              <div class="form-group mb-3">
                <input v-model="event.eventName" type="text" class="form-control" placeholder="Enter Event Name" />
              </div>

              <div class="row">
                <div class="col">
                  <div class="form-group mb-4">
                    <input v-model="event.postal" type="text" class="form-control" placeholder="Postal Code" />
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <select v-model="event.runtype" class="form-control">
                      <option disabled value="">Select Run Type</option>
                      <option>Fun Run</option>
                      <option>Jog</option>
                      <option>Sprint</option>
                      <option>Ultra Marathon</option>
                      <option>Walkathon</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="row mb-4">
                <div class="col">
                  <div class="input-group">
                    <input v-model.number="event.distance" type="number" class="form-control" min="1" max="100"
                      step="1" />
                    <span class="input-group-text">km</span>
                  </div>
                </div>
                <div class="col">
                  <div class="input-group">
                    <input v-model.number="event.duration" type="number" class="form-control" min="15" max="200"
                      step="15" />
                    <span class="input-group-text">Minutes</span>
                  </div>
                </div>
                <div class="col">
                  <div class="input-group">
                    <input v-model.number="event.points" type="number" class="form-control" min="10" max="200"
                      step="10" />
                    <span class="input-group-text">points</span>
                  </div>
                </div>
              </div>

              <div class="form-group mb-4">
                <Datepicker v-model="event.date" class="form-control" />
              </div>

              <div class="form-group mb-4">
                <select v-model="event.region" class="form-control">
                  <option disabled value="">Select Region</option>
                  <option>North</option>
                  <option>South</option>
                  <option>East</option>
                  <option>West</option>
                  <option>Central</option>
                </select>
              </div>

              <div class="container">
                <div class="row">
                  <div class="col">
                    <button @click="btnback" class="btn btn-secondary w-100">Back</button>
                  </div>
                  <div class="col">
                    <button type="submit" class="btn btn-primary w-100" style="width: 40%;">
                  SAVE CHNAGES
                </button>
                  </div>

                </div>
              </div>

              <div class="d-flex justify-content-center gap-3">
                

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
onMounted(() => {
 getProfile();
})
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import { useRouter,useRoute } from 'vue-router'
import Datepicker from 'vue3-datepicker'



const route = useRoute()
const user = ref(null)
const toast = useToast()
const router = useRouter()
const event = ref({
  eventName: '',
  postal: '',
  runtype: '',
  distance: 1,
  duration: 15,
  UserID:user._id,
  EventStatus:false,
  date:  null,
  region: '',
  points:10
})


const btnback = async () => {
  try {
    await router.push("/home")
  } catch (err) {
    console.log("Error going back home:", err)
  }
}

const getProfile = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/getProfile', {
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    })
    user.value = res.data

    console.log("Logged-in user:", res.data)
     event.value.UserID = res.data._id
  } catch (err) {
        console.error(err)
        toast.error('Failed to load profile')
        router.push('/login')
    }
}

const editEvent = async () => {
  try {
    const res = await axios.put(
      `http://localhost:3000/api/editEvent/${route.params.id}`,
      event.value
    );
    console.log('Event updated successfully:', res.data);
    // Optional: show a toast or redirect the user
    router.push('/home')
  } catch (err) {
    console.error('Error updating event:', err);
    // Optional: show an error toast or message to the user
  }
};

const getEvent = async () => {
  try{
    const res = await axios.get(`http://localhost:3000/api/getEvent/${route.params.id}`)
    event.value = res.data;
    event.value.date = new Date(res.data.date) 
    console.log(res)
  }catch(err){
    console.log(err);
  }
}
onMounted(async() => {
  
  await getProfile();
  await getEvent();
  
})

</script>
