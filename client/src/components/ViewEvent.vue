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
                                <label>Date: {{ event.date }}</label>
                                <br />

                                <br />
                                <div class="container ">
                                    <div class="row">
                                        <div class="col">
                                            <div class="card">
                                                <div class="card-body text-center">
                                                    <label> {{ event.Duration }}min</label>
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
                        <div class="container">
                            <div class="row mb-2">
                                <div class="col">
                                    <button @click="btnback" class="btn btn-primary w-100">Back</button>
                                </div>
                                <div class="col">
                                    <button @click="joinEvent(user._id,event._id)" class="btn btn-success w-100" v-if="!JoinBool">Join</button>
                                    <button @click="withdrawEvent(user._id,event._id)" class="btn btn-danger w-100" v-else>Withdraw</button>
                                </div>
                            </div>
                            <div class="col" v-if="event.UserID === user._id">
                                <button class="btn btn-secondary w-100 mb-2">Edit</button>
                            </div>
                            <div class="col" v-if="event.UserID === user._id">
                                <button class="btn btn-danger w-100">Event Completed</button>
                            </div>
                            <div v-else class="text-center">This event is not organised by you.</div>
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
                                <tbody >
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

// Optional: only if you're using toast notifications
// import { useToast } from 'vue-toastification'
// const toast = useToast()

const route = useRoute()
const router = useRouter()

const id = route.params.id
const event = ref({})
const user = ref({})
const participants = ref({})
const JoinBool = ref(false);
//here


const getEvent = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/getEvent/${id}`)
    event.value = res.data
    console.log("Event data:", res.data)
  } catch (err) {
    console.log("Error occurred while retrieving the event:", err)
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
onMounted(async () => {
    await getEvent();
     await getAllParticipants();
    await getProfile();
    await checkJoined();
})
</script>