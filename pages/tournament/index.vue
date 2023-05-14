<template>
  <div>
    <TournamentQuiz />
  </div>
</template>
  
  <script>
  import TournamentQuiz from '~/components/tournament/TournamentQuiz.vue'
  export default {
    name: 'TournamentPage',
    layout: 'withoutFooter',
    components: {
      TournamentQuiz
    }
  }
  </script>