<template>


<div class="container m-4">
  <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
         <div class="card min-vh-100">
            <div class="card-body">
              <h4 class="text-center">COMPLETED EVENTS</h4>
              <br />

              <div v-if="events && events.length > 0 ">
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

              <p v-else>Sorry, no event(s) cmpleted yet</p>
            </div>
          </div>

    </div>
    <div class="col-2"></div>
  </div>
</div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const router = useRouter();
const events = ref([]);

const getAllEvents = async () => {
  try {
    let res = await axios.get("http://localhost:3000/api/getAllEvents")
    events.value = res.data
    console.log(res.data)
  } catch (err) {
    console.log(err)
    toast.error('Failed to load events')
  }
}


const viewEvent = async(id)=>{
  try{
    router.push("/viewEvent/"+id)
  }catch(err){
    console.log("an error occured when transporting you to Viewing")
  }
}



onMounted(async() => {
  
  await getAllEvents();
})

</script>