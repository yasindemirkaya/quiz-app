<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 d-flex justify-content-center flex-column align-items-center">
        <h1 class="mt-3 mb-3">Quiz Name</h1>

        <!-- Question -->
        <div class="card" style="width: 50rem;">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <h5 class="card-title">{{ index + 1 }} of {{ totalNumOfQuestions }} Questions</h5>
                <hr />
              </div>
            </div>
            <!-- Timer -->
            <div class="row mt-1 mb-3">
              <div class="col-md-12 d-flex justify-content-center align-items-center" v-if="!isTimeOut && !isAnswered">
                <span class="timer"></span>
                <span class="text-success" :class="timer < 10 ? 'text-danger' : ''">{{ timer }}</span>
              </div>
            </div>

            <!-- Question -->
            <p class="card-text lead">{{ question }}</p>

            <!-- Options -->
            <div class="row">
              <div class="col-md-12 d-flex flex-column justify-content-start">
                <button class="alert alert-dark w-full d-flex" v-for="option in options" :key="option.id" @click="answerTheQuestion(option.isCorrect)" :disabled="isAnswered">{{ option.text }}</button>
              </div>
            </div>

            <!-- Resulsts -->
            <div class="row" v-if="isAnswered">
              <div class="col-md-12">
                <!-- Result is correct -->
                <div class="alert alert-success" v-if="correct">Correct answer! Advance to the next question!</div>
                <!-- Result is wrong -->
                <div class="alert alert-danger" v-if="wrong">Wrong answer! Don't get discouraged, you can still get a great score!</div>
                <!-- Time out -->
                <div class="alert alert-warning" v-if="isTimeOut">Time's up. Unfortunately, you couldn't answer this question. Skip to the next question.</div>
              </div>
              <div class="col-md-12 d-flex justify-content-end">
                <button class="btn btn-primary" @click="nextQuestion()">Next Question</button>
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
    name: 'BasicQuiz',
    data() {
      return {
        questions: [
          {
            id: 1,
            text: 'Question 1 text will be here...',
            answers: [
              { id: 1, text: 'Option A', isCorrect: true },
              { id: 2, text: 'Option B', isCorrect: false },
              { id: 3, text: 'Option C', isCorrect: false },
              { id: 4, text: 'Option D', isCorrect: false },
            ]
          },
          {
            id: 2,
            text: 'Question 2 text will be here...',
            answers: [
              { id: 1, text: 'Option A', isCorrect: false },
              { id: 2, text: 'Option B', isCorrect: false },
              { id: 3, text: 'Option C', isCorrect: true },
              { id: 4, text: 'Option D', isCorrect: false },
            ]
          },
          {
            id: 3,
            text: 'Question 3 text will be here...',
            answers: [
              { id: 1, text: 'Option A', isCorrect: false },
              { id: 2, text: 'Option B', isCorrect: false },
              { id: 3, text: 'Option C', isCorrect: false },
              { id: 4, text: 'Option D', isCorrect: true },
            ]
          }
        ],
        question: null,
        options: [],
        correct: false,
        wrong: false,
        isAnswered: false,
        timer: 45,
        isTimeOut: false,
        index: 0,
        totalNumOfQuestions: null
      }
    },
    methods: {
      answerTheQuestion(answer) {
        this.isAnswered = true
        if (answer) {
          this.correct = true;
          this.wrong = false;
        } else {
          this.correct = false;
          this.wrong = true;
        }
      },
      prepareTheQuestions(questions) {
        // Toplam soru sayısını elde et
        this.totalNumOfQuestions = questions.length

        // Soruların arasından rastgele birini seç
        let randomQuestion = questions[Math.floor((Math.random() * questions.length))]

        // Soruyu ve şıkları hazırla
        this.question = randomQuestion.text
        this.options = randomQuestion.answers

        // Seçilen sorunun tekrar gelmemesi için listeden soruyu çıkar
        questions = questions.filter(question => question !== randomQuestion)

        console.log('Questions: ', questions)

      },
      nextQuestion() {
        this.index++
        this.correct = false
        this.wrong = false
        this.isAnswered = false
        this.timer = 45
        this.isTimeOut = false
        this.question = null
        this.options = null

        this.prepareTheQuestions(this.questions)
      }
    },
    watch: {
      timer: {
        handler(value) {
          if (value > 0) {
            setTimeout(() => {
              this.timer--;
            }, 1000);
          }
          else {
            this.isTimeOut = true;
            this.isAnswered = true;
          }
        },
        immediate: true
      }
    },
    mounted() {
      this.prepareTheQuestions(this.questions)
    }
  }
</script>

<style scoped>
  .alert-dark:hover {
    cursor: pointer;
    background-color: #0b5c70;
    border: 2px solid;
    border-color: #24849c;
  }
  .alert-dark:disabled {
    cursor: not-allowed;
    background-color: #4f5f63;
    border: none;
  }
  .timer {
    display: inline-block;
    background: url(../../assets/icons/clock.svg) no-repeat center;
    height: 25px;
    margin-right: 5px;
    aspect-ratio: 1/1;
  }
</style>