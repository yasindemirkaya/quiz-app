<template>
  <div class="position-absolute bottom-0 w-100">
    <footer class="py-1">
      <ul class="nav justify-content-center border-bottom pb-1 mb-2">
        <li class="nav-item" v-for="menu in footerMenu" :key="menu.id">
          <a href="#" class="nav-link px-1 text-muted">{{menu.name}}</a>
        </li>
      </ul>
      <p class="text-center text-muted">© {{new Date().getFullYear()}} All rights reserved, Quiz App Inc.</p>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'Footer',
    data() {
      return {
        footerMenu: [
          { id: 1, name: 'Basic Quizzes', link: '/basic-quizzes' },
          { id: 2, name: 'Tournaments', link: '/tournament-quizzes' },
          { id: 3, name: 'About', link: '/about' },
          { id: 4, name: 'Privacy Policy', link: '/privacy-policy' },
          { id: 5, name: 'Terms Of Use', link: '/terms-of-use' },
        ],
      }
    }
  }
</script>