<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 d-flex justify-content-center align-items-center flex-column mt-3">
        <h1>Quiz App</h1>

        <div class="col-md-12 d-flex justify-content-center">
          <!-- Basic -->
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Basic</h5>
              <p class="card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
              <NuxtLink to="/basic" class="btn btn-primary">Go</NuxtLink>
            </div>
          </div>
          <!-- Tournament -->
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Tournament</h5>
              <p class="card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
              <NuxtLink to="/tournament" class="btn btn-primary">Go</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Homepage',
    data() {
      return {
      }
    },
    methods: {
    },
  }
</script>

<style>
</style>