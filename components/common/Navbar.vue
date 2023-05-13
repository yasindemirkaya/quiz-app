<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand class="ms-3">
        <NuxtLink to="/" class="text-decoration-none text-light">NavBar</NuxtLink>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <!-- Left aligned nav items -->
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-for="item in leftMenu" :key="item.id">
            <NuxtLink :to="item.link" class="text-decoration-none text-light">{{item.name}}</NuxtLink>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- Languages -->
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item v-for="lang in languages" :key="lang.id">{{lang.abbr}}</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right class="me-3">
            <!-- Using 'button-content' slot -->
            <template #button-content>User</template>
            <b-dropdown-item v-if="isLoggedIn" class="text-light">Profile</b-dropdown-item>
            <b-dropdown-item v-if="!isLoggedIn" class="text-light">
              <nuxt-link to="/login" class="text-decoration-none text-muted">Log In</nuxt-link>
            </b-dropdown-item>
            <b-dropdown-item v-if="!isLoggedIn">
              <nuxt-link to="/register" class="text-decoration-none text-muted">Register</nuxt-link>
            </b-dropdown-item>
            <b-dropdown-item v-if="isLoggedIn" @click="logout()">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Navbar',
    data() {
      return {
        leftMenu: [
          { id: 1, name: 'Basic Quizzes', link: '/basic-quizzes' },
          { id: 2, name: 'Tournaments', link: '/tournament-quizzes' }
        ],
        languages: [
          { id: 1, name: 'Turkish', abbr: 'TR' },
          { id: 2, name: 'English', abbr: 'EN' }
        ]
      }
    },
    computed: {
      ...mapGetters('user', ['currentUser']),
      isLoggedIn() {
        if (this.currentUser.email != null) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      ...mapActions('user', ['clearCurrentUser']),
      logout() {
        this.$store.commit('user/clearCurrentUser')
      }
    }
  }
</script>

<style>
  .navbar-nav .nav-link {
    padding-right: 0;
    padding-left: 15px;
  }
</style>