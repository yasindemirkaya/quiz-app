<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 d-flex flex-column justify-content-center align-items-center mt-3">
        <!-- Title -->
        <div class="row">
          <div class="col-md-12">
            <h1>Quiz App</h1>
          </div>
        </div>

        <div class="row">
          <!-- Basic -->
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Basic</h5>
                <p class="card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                <NuxtLink to="/basic" class="btn btn-primary">Go</NuxtLink>
              </div>
            </div>
          </div>
          <!-- Tournament -->
          <div class="col-md-6">
            <div class="card">
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