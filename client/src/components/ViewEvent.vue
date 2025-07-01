<template>
    <div class="container p-3">
        <div class="row">
            <div class="col">
                <div class="card min-vh-100">
                    <h4 class="card-header text-center">
                        Event Status:
                        <span :class="event.EventStatus ? 'text-danger' : 'text-success'">
                            {{ event.EventStatus ? 'Completed' : 'Ongoing' }}
                        </span>
                    </h4>
                    <div class="card-body">
                        <h3 class="card-title text-center">{{ event.eventName }}</h3>

                        <div class="card mb-3">
                            <div class="card-body">
                                <label>Run type: {{ event.runtype }}</label>
                                <br />
                                <label>Date: {{ Date(event.date) }}</label>
                                <br />
                                 <div class="container">
                                    <div id="map" style="height: 400px; width: 100%;"></div>
                                </div>
                                <br />
                                <div class="container ">
                                    <div class="row">
                                        <div class="col">
                                            <div class="card">
                                                <div class="card-body text-center">
                                                    <label> {{ event.duration }}min</label>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="col">
                                            <div class="card">
                                                <div class="card-body text-center">
                                                    <label> {{ event.distance }}Km</label>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="col">
                                            <div class="card">
                                                <div class="card-body text-center">
                                                    <label> {{ event.region }}</label>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <br />
                                <h5 class=" text-center">Points Awarded:
                                    <p class="text-warning"> {{ event.points }}</p>

                                </h5>
                               
                            </div>
                        </div>
                        <div class="container" v-if="!ViewOnlyBool">
                            <div class="row mb-2">
                                <div class="col">
                                    <button @click="btnback" class="btn btn-primary w-100">Back</button>
                                </div>
                                <div class="col">
                                    <button @click="joinEvent(user._id,event._id)" class="btn btn-success w-100"
                                        v-if="!JoinBool && !ViewOnlyBool">Join</button>
                                    <button @click="withdrawEvent(user._id,event._id)" class="btn btn-danger w-100"
                                        v-else=" !ViewOnlyBool">Withdraw</button>
                                </div>
                            </div>
                            <div class="col" v-if="event.UserID === user._id && !ViewOnlyBool">
                                <button class="btn btn-secondary w-100 mb-2"
                                    @click="btnClickEdit(event._id)">Edit</button>
                            </div>
                            <div class="col" v-if="event.UserID === user._id && !ViewOnlyBool">
                                <button @click="btnCLickEventCompleted(event._id,event.points)"
                                    class="btn btn-warning mb-2 w-100">Event Completed</button>
                            </div>
                            <div class="col" v-if="event.UserID === user._id && !ViewOnlyBool">
                                <button class="btn btn-danger w-100" @click="btnClickDeleteEvent(event._id)">Delete
                                    Event</button>
                            </div>

                            <div v-else class="text-center">This event is not organised by you.</div>
                        </div>
                        <div class="container" v-else>
                            <div class="row mb-2">
                                <div class="col">
                                    <button class="btn btn-primary w-100"
                                        @click="btnClickBackFromCompleted">Back</button>
                                </div>
                                <div class="col">
                                    <button class="btn btn-danger w-100" @click="btnClickDeleteEvent(event._id)">Delete
                                        Event</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card min-vh-100">
                    <div class="card-body">
                        <h2>PARTICIPANT(s)</h2>
                        <br />

                        <div>
                            <table class="table" v-if="Array.isArray(participants) && participants.length > 0">
                                <thead class="table-dark">
                                    <tr>
                                        <th scope="col" style="width: 10%;">No.</th>
                                        <th scope="col" style="width: 90%;">Username</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(participant, index) in participants" :key="participant._id">
                                        <th scope="row">{{ index + 1 }}</th>
                                        <td>{{ participant.UserID.username}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p class="text-center" v-else>Currently no Participant!</p>
                        </div>


                    </div>
                </div>
            </div>

        </div>
    </div>





</template>


<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'


const toast = useToast();

// Optional: only if you're using toast notifications
// import { useToast } from 'vue-toastification'
// const toast = useToast()

const route = useRoute()
const router = useRouter()

const id = route.params.id
const event = ref({})
const user = ref({})
const participants = ref([])
const JoinBool = ref(false);
const ViewOnlyBool = ref(false);
const latitude = ref();
const longitude = ref();
const x = ref();
const y = ref();


const getEvent = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/getEvent/${id}`)
    console.log(res.data.EventStatus)
    if(!res.data.EventStatus){
        ViewOnlyBool.value = false
    }else{
        ViewOnlyBool.value = true
    }
    event.value = res.data
    console.log("Event data:", res.data)
  } catch (err) {
    console.log("Error occurred while retrieving the event:", err)
  }
}
const btnClickBackFromCompleted = async()=>{
    router.push(`/completedEvent/${user.value._id}`)
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
  } catch (err) {
    console.error("Failed to fetch profile:", err)
    // toast.error('Failed to load profile') // Optional
    router.push('/login')
  }
}

const btnback = async () => {
  try {
    await router.push("/home")
  } catch (err) {
    console.log("Error going back home:", err)
  }
}


const joinEvent = async(uid,id)=>{
   try {
    // 1. Check if user already participated
    const checkRes = await axios.get(`http://localhost:3000/api/checkParticipatedUser/${uid}/${id}`);

    // 2. If not participated (empty array), then join
    if (Array.isArray(checkRes.data) && checkRes.data.length === 0) {
      const joinRes = await axios.post(`http://localhost:3000/api/joinEvent/${uid}/${id}`);
      console.log("User successfully joined:", joinRes.data);
      JoinBool.value = true;
      await getAllParticipants();   // Refresh list
      await checkJoined();          // Refresh button state
      toast.success(`Successfully enroll into the event (${event.value.eventName})`)
    } else {
      console.log("User already joined. No action taken.");
    }
  } catch (err) {
        
  }
};


const withdrawEvent = async(uid,id)=>{
    try{
        const result = await axios.delete(`http://localhost:3000/api/withdrawEvent/${uid}/${id}`);
        JoinBool.value = false;
        console.log(result)
        await getAllParticipants(); 
        toast.success(`Successfully withdrawn from the event (${event.value.eventName})`)
    }catch(err){
        console.log(err)
    }
}
const getAllParticipants = async()=>{
    try{
        const res = await axios.get(`http://localhost:3000/api/getAllParticipants/${event.value._id}`)
        participants.value = res.data
        

    }catch(err){
        console.log(err)
    }
}


const checkJoined = async()=>{
    try{
         // 1. Check if user already participated
    const checkRes = await axios.get(`http://localhost:3000/api/checkParticipatedUser/${user.value._id}/${id}`);
     if (Array.isArray(checkRes.data) && checkRes.data.length === 0) {
        JoinBool.value = false;
     }else{
        JoinBool.value = true;
     }
    }catch(err){

    }
}
const btnClickEdit = async(id)=>{
    router.push(`/editEvent/${id}`)
}

const btnClickDeleteEvent = async(eid)=>{
    try{
        const res = await axios.delete(`http://localhost:3000/api/deleteEvent/${eid}`)
        console.log(res)
        toast.success(`Successfully deleted event (${event.value.eventName})`)
        router.push("/home")
    }catch(err){
        console.log(err)
    }
}


const btnCLickEventCompleted = async(eid, points) => {
  try {
    const result = await axios.put(`http://localhost:3000/api/completeEvent/${eid}`);
    console.log(result);
    console.log(participants.value)
    for (const i of participants.value) {
        const Npoints = Number(points);
        await axios.put(`http://localhost:3000/api/updatePoints/${i.UserID._id}/${Npoints}`);
        await axios.put(`http://localhost:3000/api/updateEventCompletionStatus/${i.UserID._id}`)
        
    }
    toast.success(`successfully Completed the event rewareds are awarded to all the ${participants.value.length} participants`)
    await router.push("/home");
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
  }
};


const sortMapOut =  async()=>{
    const map = L.map('map').setView([latitude.value, longitude.value], 17)

  L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  L.marker([latitude.value, longitude.value]).addTo(map)
    .bindPopup('Your location here')
    .openPopup()
}


const getLongLat = async(id)=>{
    try{
        const response = await axios(`http://localhost:3000/api/getLongLat/${id}`)
        const data = response.data;

        if (data.found > 0 && data.results.length > 0) {
            const { LATITUDE, LONGITUDE ,X ,Y } = data.results[0];
            console.log("Latitude:", LATITUDE);
            console.log("Longitude:", LONGITUDE);
            longitude.value = LONGITUDE;
            latitude.value = LATITUDE;
            x.value = X;
            y.value = Y;


            // Optional: Return them as a tuple or object
            return { lat: parseFloat(LATITUDE), lng: parseFloat(LONGITUDE) };
        } else {
            console.warn("No results found for the given ID.");
        }

    } catch (err) {
        console.error("Error fetching coordinates:", err.message);
    }

}   

onMounted(async () => {
    await getEvent();
     await getAllParticipants();
    await getProfile();
    await checkJoined();
    console.log(user.value.postalCode)
    await getLongLat(user.value.postalCode)
    await sortMapOut();
})
</script>