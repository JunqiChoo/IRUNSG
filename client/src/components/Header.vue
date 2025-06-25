<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand ms-3 fw-bold fs-3" href="#">IRUNSG</a>

    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" href="#">Create Event</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">My Runs</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">My Events</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Rewards</a>
        </li>
      </ul>

      <!-- Logout Button floated right -->
      <button class="btn btn-outline-secondary ms-auto me-3">Logout</button>
    </div>
  </nav>
</template>



<script>

import { useRouter } from 'vue-router'
const router = useRouter();
export default{
    name: 'Header'
}
</script>