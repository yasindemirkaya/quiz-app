<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 d-flex flex-column justify-content-center align-items-center mt-15rem">
        <!-- Title -->
        <div class="row">
          <div class="col-md-12 d-flex flex-column justify-content-center align-items-center">
            <h1>Create Quiz</h1>
            <p>Select a quiz type that you want to create.</p>
          </div>
        </div>

        <div class="row">
          <!-- Basic -->
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Basic</h5>
                <p class="card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                <NuxtLink to="/create-quiz/basic" class="btn btn-success">Create Multiple Choice</NuxtLink>
              </div>
            </div>
          </div>
          <!-- Tournament -->
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Tournament</h5>
                <p class="card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                <NuxtLink to="/create-quiz/tournament" class="btn btn-success">Create Tournament</NuxtLink>
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
    name: 'CreateQuiz',
  }
</script>

<style>
</style>