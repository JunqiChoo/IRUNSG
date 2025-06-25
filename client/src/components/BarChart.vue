<template>
  <div class="container mt-4">
    <h3 class="mb-3">Events by Region</h3>

    <div class="card">
      <div class="card-body">
        <Bar
          v-if="chartData.datasets.length"
          :data="chartData"
          :options="chartOptions"
        />
        <p v-else>Loading chart data...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

// Chart.js core imports
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

// Register required Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// Import Bar chart component
import { Bar } from 'vue-chartjs'

// Store backend data
const chartDataRaw = ref({})

// Fetch region counts from backend
const getChartData = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/getChartData')
    chartDataRaw.value = res.data || {}
  } catch (err) {
    console.error('Error fetching chart data:', err)
  }
}

onMounted(() => {
  getChartData()
})

// Generate distinct color for each bar
const getRandomColor = () =>
  `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`

// Prepare Chart.js dataset
const chartData = computed(() => {
  const labels = Object.keys(chartDataRaw.value)
  const data = Object.values(chartDataRaw.value)

  return {
    labels,
    datasets: [
      {
        label: 'Event Count',
        data,
        backgroundColor: labels.map(() => getRandomColor()), // 🎨 different color per bar
        borderRadius: 5
      }
    ]
  }
})

// Chart display options
const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Event Count per Region' }
  }
}
</script>

<style scoped>

</style>
