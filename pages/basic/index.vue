<template>
  <div>
    <BasicQuiz />
  </div>
</template>

<script>
  import BasicQuiz from '~/components/basic/BasicQuiz.vue'
  export default {
    name: 'BasicPage',
    layout: 'withoutFooter',
    components: {
      BasicQuiz
    }
  }
</script>