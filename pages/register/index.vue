<template>
  <div class="container">
    <div class="row">
      <!-- Header -->
      <div class="col-md-12 d-flex flex-column justify-content-center align-items-center mt-10rem">
        <h1>Join Quiz App</h1>
        <p>
          Already have an account?
          <NuxtLink to="/login" class="text-decoration-none text-success">Login.</NuxtLink>
        </p>
      </div>
      <!-- Form -->
      <div class="col-md-12 d-flex flex-column justify-content-center align-items-center">
        <b-card class="mt-5 w-50">
          <b-form @submit.prevent="onSubmit">
            <!-- Email -->
            <b-form-group id="input-group-1" label-for="input-1" description="We'll never share your email with anyone else.">
              <b-form-input id="input-1" v-model="form.email" type="text" placeholder="Your email" @input="$v.form.email.$touch()" :class="{ 'is-invalid' : $v.form.email.$error, 'is-valid': !$v.form.email.$invalid}"></b-form-input>
              <div v-if="($v.form.email.required.$invalid || $v.form.email.email.$invalid || $v.form.email.$error)" class="text-danger mt-1">Please enter a valid email.</div>
            </b-form-group>
            <!-- Username -->
            <b-form-group id="input-group-2" label-for="input-2">
              <b-form-input id="input-2" v-model="form.username" type="text" placeholder="Username" @input="$v.form.username.$touch()" :class="{ 'is-invalid' : $v.form.username.$error, 'is-valid': !$v.form.username.$invalid}"></b-form-input>
              <div v-if="($v.form.username.required.$invalid || $v.form.username.$error)" class="text-danger mt-1">Username is required.</div>
              <div v-if="($v.form.username.minLength.$invalid || $v.form.username.$error)" class="text-danger mt-1">Username should be longer than six characters.</div>
            </b-form-group>
            <!-- Password -->
            <b-form-group id="input-group-3" label-for="input-3" description="By signing up, you agree to Quiz App's Terms of Service and Privacy Policy">
              <b-form-input id="input-3" v-model="form.password" type="password" placeholder="Password" @input="$v.form.password.$touch()" :class="{ 'is-invalid' : $v.form.password.$error, 'is-valid': !$v.form.password.$invalid}"></b-form-input>
              <div v-if="($v.form.password.required.$invalid || $v.form.password.$error)" class="text-danger mt-1">Password is required.</div>
              <div v-if="($v.form.password.minLength.$invalid || $v.form.password.$error)" class="text-danger mt-1">Username should be longer than eight characters.</div>
            </b-form-group>
            <!-- Sign Up -->
            <div class="row">
              <div class="col-md-12 d-flex justify-content-end">
                <b-button type="submit" variant="success" class="me-1">Sign Up</b-button>
              </div>
            </div>
          </b-form>
        </b-card>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import { required, email } from 'vuelidate/lib/validators'
  import minLength from 'vuelidate/lib/validators/minLength'
  export default {
    name: 'Login',
    data() {
      return {
        form: {
          email: null,
          username: null,
          password: null
        },
        submitted: false
      }
    },
    methods: {
      onSubmit() {
        this.$v.$touch()
        let result = this.$v.$invalid
        if (!result) {
          this.submitted = true
          console.log('Form submitted')
        } else {
          console.log('Error')
        }

      },
    },
    validations: {
      form: {
        email: {
          required,
          email
        },
        username: {
          required,
          minLength: minLength(8)
        },
        password: {
          required,
          minLength: minLength(8)
        }
      }
    }
  }
  </script>
