<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 d-flex justify-content-center flex-column align-items-center mt-8rem">
        <h1 class="mt-3 mb-3">Quiz Name</h1>

        <div class="row mb-3" v-if="isLastQuestion && !isQuizEnded">
          <div class="col-md-12">
            <div class="alert alert-success">Last question! Think carefully before you make a decision!</div>
          </div>
        </div>
        <!-- Question -->
        <div class="card w-75" v-if="!isQuizEnded">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <h5 class="card-title">{{ index }} of {{ statistics.totalNumOfQuestions }} Questions</h5>
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
                <button class="alert alert-dark w-full d-flex" v-for="option in options" :key="option.id" @click="answerTheQuestion(option, questionID, options, question)" :disabled="isAnswered">{{ option.text }}</button>
              </div>
            </div>

            <!-- Resulsts -->
            <div class="row" v-if="isAnswered">
              <div class="col-md-12">
                <!-- Result is correct -->
                <div class="alert alert-success" v-if="correct && !isLastQuestion">Correct answer! Advance to the next question!</div>
                <div class="alert alert-success" v-if="correct && isLastQuestion">Correct answer! You finished the quiz with a correct answer!</div>
                <!-- Result is wrong -->
                <div class="alert alert-danger" v-if="wrong && !isLastQuestion">Wrong answer! Don't get discouraged, you can still get a great score!</div>
                <div class="alert alert-danger" v-if="wrong && isLastQuestion">Wrong answer! Unfortunately you finished the quiz with a wrong answer.</div>
                <!-- Time out -->
                <div class="alert alert-warning" v-if="isTimeOut && !isAnswered">Time's up. Unfortunately, you couldn't answer this question. Skip to the next question.</div>
              </div>
              <div class="col-md-12 d-flex justify-content-end">
                <button class="btn btn-primary" @click="nextQuestion()">Next Question</button>
              </div>
            </div>
          </div>
        </div>
        <!-- Quiz Ended -->
        <div class="card w-75" v-else>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <h5 class="card-title">Congratulations! You finished the quiz with. Click to see your scores.</h5>
                <hr />
              </div>
              <!-- See the correct answers -->
              <div class="row mb-3" v-if="answerSheet == null">
                <div class="col-md-12 d-flex justify-content-center">
                  <button class="btn btn-info" @click="calculateStatistics(userAnswers)">See the Answer Sheet</button>
                </div>
              </div>
              <!-- Answer sheet -->
              <div class="container" v-if="answerSheet != null">
                <div class="row mb-3">
                  <div class="col-md-4 d-flex justify-content-center">The Question</div>
                  <div class="col-md-4 d-flex justify-content-center">Your Answer</div>
                  <div class="col-md-4 d-flex justify-content-center">The Correct Answer</div>
                </div>

                <div class="row">
                  <div class="col-md-12 d-flex justify-content-center align-items-center mb-3" v-for="item in userAnswers" :key="item.id">
                    <div class="col-md-4 d-flex justify-content-center text-info">{{item.question}}</div>
                    <div class="col-md-4 d-flex justify-content-center" :class="item.answer.isCorrect == 'Correct' ? 'text-success' : 'text-danger'">{{item.answer.text}}</div>
                    <div class="col-md-4 d-flex justify-content-center text-success">{{item.correctAnswer.text}}</div>
                  </div>
                </div>

                <hr />

                <!-- Statistics -->
                <div class="row">
                  <div class="col-md-12 d-flex justify-content-center align-items-center">Statistics</div>
                  <div class="col-md-4 d-flex justify-content-center">Total Number of Questions</div>
                  <div class="col-md-4 d-flex justify-content-center">Total Number of Correct Answers</div>
                  <div class="col-md-4 d-flex justify-content-center">Total Number of Incorrect Answers</div>
                </div>
                <div class="row">
                  <div class="col-md-4 d-flex justify-content-center">{{statistics.totalNumOfQuestions}}</div>
                  <div class="col-md-4 d-flex justify-content-center text-success">{{statistics.totalCorrects}}</div>
                  <div class="col-md-4 d-flex justify-content-center text-danger">{{statistics.totalIncorrects}}</div>
                </div>

                <hr />

                <div class="row mb-3">
                  <div class="col-md-12 d-flex justify-content-center align-items-center">Success Rate</div>
                  <div class="col-md-12 d-flex justify-content-center align-items-center" :class="this.statistics.percentage > 50 ? 'text-success' : 'text-danger'">{{this.statistics.percentage}}%</div>
                </div>
              </div>
              <!-- Homepage or Quizzes -->
              <div class="row">
                <div class="col-md-6 d-flex justify-content-start">
                  <NuxtLink class="btn btn-success w-100" to="/">Go to Homepage</NuxtLink>
                </div>
                <div class="col-md-6 d-flex justify-content-end">
                  <NuxtLink class="btn btn-success w-100" to="/basic-quizzes">See the Other Quizzes</NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'BasicQuizComp',
    data() {
      return {
        question: null,
        questionID: null,
        options: [],
        correctAnswer: null,
        userAnswers: [],
        answerSheet: null,
        correct: false,
        wrong: false,
        isAnswered: false,
        timer: 45,
        isTimeOut: false,
        index: 1,
        isLastQuestion: false,
        isQuizEnded: false,
        statistics: {
          totalNumOfQuestions: null,
          totalCorrects: 0,
          totalIncorrects: 0,
          percentage: 0
        }
      }
    },
    computed: {
      ...mapGetters('basic', ['quiz'])
    },
    methods: {
      ...mapActions('basic', ['setQuiz', 'getQuiz']),
      // Soruyu cevapla
      answerTheQuestion(answer, questionID, options, question) {
        console.log('Answer: ', answer)

        // Eğer soru cevaplandıysa timer'ı durdur
        this.timer = 45;
        this.isTimeOut = false;

        this.isAnswered = true

        if (answer.isCorrect) {
          this.correct = true;
          this.wrong = false;
        } else {
          this.correct = false;
          this.wrong = true;
        }

        // Kullanıcı cevapları arrayinin içerisine; 
        // - Kullanıcının verdiği cevap şıkkının doğru olup olmadığını tutan isCorrect değeri,
        // - Sorunun ID'si (Sıralı gösterebilmek için)
        // - Şıklar
        // - Soru Cümlesi

        // gönderilir. Şıkların içerisinde for döndürülerek doğru cevap şıkkı alınır (Quiz sonunda sonuçları gösterebilmek için)
        for (var i = 0; i < options.length; i++) {
          if (options[i].isCorrect == true) {
            let correctAnswer = options[i]

            this.userAnswers.push({ answer, questionID, correctAnswer, question })
          }
        }

        // Kullanıcının verdiği cevap sayısı toplam soru sayısına eşit ise quiz bitti demektir
        if (this.userAnswers.length == this.statistics.totalNumOfQuestions) {
          this.isQuizEnded = true
        }

        // Eğer quiz bittiyse kullanıcı cevaplarını formatla
        if (this.isQuizEnded) {
          for (var i = 0; i < this.userAnswers.length; i++) {
            // Karışık verilen soruları sıraya diz
            this.userAnswers.sort((a, b) => (a.questionID > b.questionID) ? 1 : ((b.questionID > a.questionID) ? -1 : 0))

            // true ve false değerlerini kullanıcıya gösterilecek hale getir (Correct ve incorrect olarak)
            if (this.userAnswers[i].answer.isCorrect == true) {
              this.userAnswers[i].answer.isCorrect = 'Correct'
            } else {
              this.userAnswers[i].answer.isCorrect = 'Incorrect'
            }
          }
        }
      },
      // Soruları hazırla
      prepareTheQuestions(quiz) {
        if (quiz) {
          // Soruların arasından rastgele birini seç
          let randomQuestion = quiz[Math.floor((Math.random() * quiz.length))]

          // Ekranda gösterilecek soruyu ve şıkları hazırla, sorunun ID'sini tut (Hangi soruya hangi cevabın verildiğini tutabilmek için.)
          this.question = randomQuestion.text
          this.questionID = randomQuestion.id
          this.options = randomQuestion.answers

          // Seçilen sorunun tekrar gelmemesi için listeden soruyu çıkar        
          quiz = quiz.filter(question => question !== randomQuestion)
          this.$store.commit('basic/setQuiz', quiz)

          // Son soruya gelip gelmediğini kontrol et
          if (quiz.length < 1) {
            this.isLastQuestion = true
          }
        }
      },
      // Bir sonraki soruya geç
      nextQuestion() {
        this.index++
        this.correct = false
        this.wrong = false
        this.isAnswered = false
        this.timer = 5
        this.isTimeOut = false
        this.quiz = null
        this.options = null

        this.prepareTheQuestions(this.quiz)
      },
      calculateStatistics(userAnswers) {
        console.log('user answers: ', userAnswers)
        this.answerSheet = true;
        for (var i = 0; i < userAnswers.length; i++) {
          if (userAnswers[i].answer.isCorrect == 'Correct') {
            this.statistics.totalCorrects++
          } else if (userAnswers[i].answer.isCorrect == 'Incorrect') {
            this.statistics.totalIncorrects++
          }
        }

        this.statistics.percentage = (this.statistics.totalCorrects * 100) / this.statistics.totalNumOfQuestions
        this.statistics.percentage = this.statistics.percentage.toFixed(2)
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

            // Eğer verilen süre içerisinde cevap gelmediyse o soru için verilen cevap sıfır kabul edilir ve değerlendirmeye alınmaz
            this.userAnswers.push(0)
          }
        },
        immediate: true
      },
    },
    async mounted() {
      // Sanki API'ya istek atar gibi sembolik bir parametre ile store'daki methoduma istek atıyorum.
      // Method 1 gönderildiğinde questionsı return edecek şekilde hazırlanmış.
      // Sorular döndüğünde store'daki state'i güncelliyorum
      let request = 1
      let quiz = await this.getQuiz(request)
      if (quiz) {
        this.$store.commit('basic/setQuiz', quiz)
      }
      if (this.quiz) {
        // Açılışta soru sayısını elde et
        this.statistics.totalNumOfQuestions = this.quiz.length

        // Sayfa açılırken soruları hazırla
        this.prepareTheQuestions(this.quiz)
      }
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