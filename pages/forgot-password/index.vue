<template>
  <div class="container">
    <div class="row">
      <!-- Header -->
      <div class="col-md-12 d-flex flex-column justify-content-center align-items-center mt-5">
        <h1>Forgot your password?</h1>
        <p>Enter your email address to have a new password.</p>
      </div>
      <!-- Form -->
      <div class="col-md-12 d-flex flex-column justify-content-center align-items-center">
        <b-card class="mt-5 w-50">
          <b-form @submit.prevent="onSubmit">
            <!-- Email -->
            <b-form-group id="input-group-1" label-for="input-1">
              <b-form-input id="input-1" v-model="form.email" type="text" placeholder="Your email" @input="$v.form.email.$touch()" :class="{ 'is-invalid' : $v.form.email.$error, 'is-valid': !$v.form.email.$invalid}"></b-form-input>
              <div v-if="($v.form.email.required.$invalid || $v.form.email.email.$invalid || $v.form.email.$error)" class="text-danger mt-1">Please enter a valid email.</div>
            </b-form-group>
            <!-- Log In Forgot Password -->
            <div class="row">
              <div class="col-md-12 d-flex justify-content-end">
                <b-button type="submit" variant="success" class="me-1">Send E-Mail</b-button>
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
    
  <style>
</style>