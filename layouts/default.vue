<template>
  <div>
    <Navbar />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
  import Navbar from '../components/common/Navbar.vue'
  import Footer from '../components/common/Footer.vue'

  export default {
    name: 'default',
    components: {
      Navbar,
      Footer
    }
  }
</script>
