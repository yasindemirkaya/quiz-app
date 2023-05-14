<template>
  <div class="container">
    <div class="row">
      <!-- Header -->
      <div class="col-md-12 d-flex flex-column justify-content-center align-items-center mt-10rem">
        <h1>Log In to Quiz App</h1>
        <p>
          Don't you have an account?
          <NuxtLink to="/register" class="text-decoration-none text-success">Register.</NuxtLink>
        </p>
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
            <!-- Password -->
            <b-form-group id="input-group-3" label-for="input-3">
              <b-form-input id="input-3" v-model="form.password" type="password" placeholder="Password" @input="$v.form.password.$touch()" :class="{ 'is-invalid' : $v.form.password.$error, 'is-valid': !$v.form.password.$invalid}"></b-form-input>
              <div v-if="($v.form.password.required.$invalid || $v.form.password.$error)" class="text-danger mt-1">Password is required.</div>
            </b-form-group>
            <!-- Log In Forgot Password -->
            <div class="row">
              <div class="col-md-6 d-flex justify-content-start align-items-center">
                <nuxt-link to="/forgot-password" class="text-decoration-none text-success">Forgot Password</nuxt-link>
              </div>
              <div class="col-md-6 d-flex justify-content-end">
                <b-button type="submit" variant="success" class="me-1">Log In</b-button>
              </div>
            </div>
          </b-form>
        </b-card>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import { required, email } from 'vuelidate/lib/validators'
  export default {
    name: 'Login',
    data() {
      return {
        form: {
          email: null,
          password: null
        },
        submitted: false
      }
    },
    methods: {
      ...mapActions('user', ['loginUser', 'checkUser', 'setCurrentUser']),
      async onSubmit() {
        this.$v.$touch()
        let result = this.$v.$invalid
        if (!result) {
          this.submitted = true

          // Emailini gönderdiğim kullanıcının kayıtlarda varolup olmadığını kontrol eden servise istek atılıyor
          let request = this.form.email
          let checkUser = await this.checkUser(request)

          // Eğer servisten true döndüyse login işlemini başlatıyoruz
          if (checkUser) {
            let request = this.form
            let loginUser = await this.loginUser(request)

            // Eğer kullanıcı başarılı şekilde login olduysa currentUser olarak içeriye alıp set ediyoruz
            if (loginUser) {
              let payload = {
                email: this.form.email,
              }
              this.$store.commit('user/setCurrentUser', payload)
              this.$toast.success('You have successfully logged in. Redirecting to Homepage...')
              setTimeout(() => {
                this.$router.push('/')
              }, 3000);

            } else {
              this.$toast.error('Email or password is incorrect. Please try again.')
            }
          } else {
            this.$toast.error('No account found matching this email.')
          }
        }
      },
    },
    validations: {
      form: {
        email: {
          required,
          email
        },
        password: {
          required,
        }
      }
    }
  }
  </script>
  
<style>
</style>