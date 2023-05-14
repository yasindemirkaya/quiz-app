<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 d-flex justify-content-center align-items-center flex-column mt-15rem">
        <h1>Tournament App</h1>

        <!-- Tournament Items -->
        <div class="row">
          <!-- Round -->
          <div class="col-md-12 d-flex flex-column justify-content-center align-items-center mb-3">
            <div v-if="round < totalNumOfRounds" class="text-danger">Round: {{ round }} / {{ totalNumOfRounds }}</div>
            <div v-else class="text-success">Final Round</div>
          </div>
          <div class="col-md-12 d-flex justify-content-center" v-if="champion == null">
            <div class="row">
              <!-- Option 1 -->
              <div class="col-md-6">
                <div class="card" style="width: 18rem;" v-if="this.optionA != null">
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">{{ optionA.name }}</p>
                    <a href="#" class="btn btn-success" @click="selectOption(tournamentItems, optionA, optionB)">Select</a>
                  </div>
                </div>
              </div>
              <!-- Option 2  -->
              <div class="col-md-6">
                <div class="card" style="width: 18rem;" v-if="this.optionB != null">
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">{{ optionB.name }}</p>
                    <a href="#" class="btn btn-success" @click="selectOption(tournamentItems, optionB, optionA)">Select</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Result -->
          <div class="col-md-12 d-flex justify-content-center align-items-center" v-else>
            <div class="card" style="width: 18rem;">
              <div class="card-body d-flex align-items-center flex-column">
                <h5 class="card-title">The Champion</h5>
                <p class="card-text">{{ champion.name }}</p>
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
    name: 'TournamentComp',
    data() {
      return {
        optionA: null,
        optionB: null,
        selectedOption: null,
        nextRoundItems: [],
        champion: null,
        round: 1,
        totalNumOfRounds: null,
        tournamentLength: null
      }
    },
    computed: {
      ...mapGetters('tournament', ['tournamentItems'])
    },
    methods: {
      ...mapActions('tournament', ['setTournamentItems', 'getTournamentItems', 'clearTournamentItems']),
      randomizeItems(items, num) {
        // Seçeneklerin içi önceden dolu ise temizle
        this.optionA = null;
        this.optionB = null;

        // Tournament itemları arasından rastgele 2 item getir
        if (items.length > 1) {
          const shuffled = [...items].sort(() => 0.5 - Math.random())

          this.optionA = shuffled[0]
          this.optionB = shuffled[1]
        }
      },
      selectOption(items, selectedOption, otherOption) {
        // Seçileni bir sonraki tura ekle
        this.nextRoundItems.push(selectedOption)

        // Seçileni ve seçilmeyeni listeden kaldır
        items = items.filter(item => item !== selectedOption)
        items = items.filter(item => item !== otherOption)
        this.$store.commit('tournament/setTournamentItems', items)

        // // Seçilmeyen eleman listeden çıkarıldıktan sonra bu kontrol yapılmalı. Eğer kalan eleman sayısı 2den büyükse ya da eşitse eşleşmeler devam etmeli
        if (items.length >= 2) {
          // Ekrana yeniden iki random seçenek getir
          this.randomizeItems(this.tournamentItems, 2)
        }
        // Son eşleşme de sonuçlandıysa tournamentItem'ın içinde kalan son elemanı da sil. Ekrandaki son kalan optionları temizle
        else {
          this.$store.commit('tournament/clearTournamentItems')

          // Eğer ilk tur bitti ise tournamentItems listesinin içi boş demektir.
          // Bir sonraki tura gönderdiğimiz elemnanlar ile tekrar tournamentItems listesini dolduruyoruz
          // nextRoundItems listesini boşaltıyorum ki turnuva bitene kadar tekrar doldurup bir sonraki turlara devam edebileyim
          if (items.length == 0) {
            this.$store.commit('tournament/setTournamentItems', this.nextRoundItems)
            items = this.nextRoundItems

            // Roundu arttır
            this.round++;

            // nextRoundItems içerisindekileri tournamentItems'a aktardıktan sonra bu listeyi boşalt. (Tekrar kullanabilmek için)
            this.nextRoundItems = []

            // Seçenekleri temizle
            this.optionA = null
            this.optionB = null

            if (this.tournamentItems.length > 0) {
              this.randomizeItems(this.tournamentItems, 2)
            }
          }
          // Eğer en son bir eleman kaldıysa o eleman son kalan yani şampiyon demektir
          if (items.length == 1) {
            this.champion = items[0]
          }
        }

      }
    },
    async mounted() {
      // Sanki API'ya istek atar gibi sembolik bir parametre ile store'daki methoduma istek atıyorum.
      // Method 1 gönderildiğinde questionsı return edecek şekilde hazırlanmış.
      // Sorular döndüğünde store'daki state'i güncelliyorum
      let request = 1
      let tournamentItems = await this.getTournamentItems(request)
      if (tournamentItems) {
        this.$store.commit('tournament/setTournamentItems', tournamentItems)

        // Quizin başlangıçta kaç elemanlı olduğunu tut
        this.tournamentLength = tournamentItems.length;

        // Toplam kaç tur süreceğini bul
        this.totalNumOfRounds = Math.sqrt(this.tournamentLength);
      }

      this.randomizeItems(this.tournamentItems, 2);
    }
  }
  </script>
  
  <style>
</style>