<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 d-flex justify-content-center align-items-center flex-column mt-3">
        <h1>Quiz App</h1>

        <!-- Quiz Questions -->
        <div class="row">
          <div class="col-md-12 d-flex">
            <!-- Option 1 -->
            <div class="card" style="width: 18rem;" v-if="this.optionA != null">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">{{ optionA.name }}</p>
                <a href="#" class="btn btn-primary" @click="selectOption(quizItems, optionA, optionB)">Select</a>
              </div>
            </div>
            <!-- Options 2  -->
            <div class="card" style="width: 18rem;" v-if="this.optionB != null">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">{{ optionB.name }}</p>
                <a href="#" class="btn btn-primary" @click="selectOption(quizItems, optionB, optionA)">Select</a>
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
    name: 'Homepage',
    data() {
      return {
        optionA: null,
        optionB: null,
        selectedOption: null,
        quizItems: [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' },
          { id: 3, name: 'Item 3' },
          { id: 4, name: 'Item 4' },
          { id: 5, name: 'Item 5' },
          { id: 6, name: 'Item 6' },
          { id: 7, name: 'Item 7' },
          { id: 8, name: 'Item 8' },
        ],
        nextRoundItems: [],
      }
    },
    methods: {
      randomizeItems(items) {
        // Seçeneklerin içi önceden dolu ise temizle
        this.optionA = null;
        this.optionB = null;
        console.log('--- RANDOMIZE ITEMS ---')

        // İlk random seçeneği belirle
        var item1 = items[Math.floor((Math.random() * items.length))]
        this.optionA = item1;

        // İkinci random seçeneği belirle
        var item2 = items[Math.floor((Math.random() * items.length))]

        // İkisi aynı olursa ikinciyi değiştir
        if (item1 == item2) {
          var item2 = items[Math.floor((Math.random() * items.length) + 1)]
        } else {
          this.optionB = item2;
        }

        console.log('Option A: ', this.optionA, ' - ', 'Option B: ', this.optionB)
      },
      selectOption(items, selectedOption, otherOption) {
        console.log('--- SELECT OPTION ---')

        let firstLength = items.length;
        console.log('First Length: ', firstLength)

        // Seçileni bir sonraki tura ekle
        this.nextRoundItems.push(selectedOption)

        // Seçilmeyeni listeden kaldır
        items = items.filter(item => item !== otherOption)

        let lastLength = items.length;
        console.log('Last Length: ', lastLength)

        // Eğer seçilmeyen eleman arrayden çıkarıldıysa ondan sonra bu fonksiyon çalışmalı.
        if (firstLength != lastLength) {
          // Ekrana yeniden iki random seçenek getir
          this.randomizeItems(this.quizItems)
        }


        console.log('Selected Option: ', selectedOption)
        console.log('Old Array: ', items)
        console.log('New Array: ', this.nextRoundItems)
      }
    },
    mounted() {
      this.randomizeItems(this.quizItems);
    }
  }
  </script>
  
  <style>
</style>