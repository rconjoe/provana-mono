<template>
  <!-- Reviews col must be 6 to fit inside parent row aside Seller Feed -->
  <v-row class="reviewRow">
    <!-- Review Header -->
    <v-col>
      <!-- iterate through reviews as card elements -->
      <div v-if="Object.keys(reviews).length > 0">
        <v-card v-for="review in reviews" :key="review.date" color="transparent" flat class="pt-4 mb-3">
          <!-- review tittle row -->
          <v-col cols="12" class="d-flex justify-space-between py-0 px-0">
            <h2 class="reviewTitle"> {{ review.username }} </h2>
            <!-- Review rating -->
            <h3 class="reviewRating">
              {{ review.rating }}
              <v-icon small class="mb-1">fas fa-star</v-icon>
            </h3>
          </v-col>
          <!-- review message and date -->
          <v-col class="pa-0">
            <p class="reviewDescription">
              {{ review.message }}
            </p>
          </v-col>
          <span class="reviewDate mr-4"> {{ review.date }}</span>
          <span class="reviewDate"> {{ review.service }} </span>
        </v-card>
      </div>
      <div v-else>
        <v-card color="transparent">
          <h2 class="reviewTitle "> This user has no reviews submited yet </h2>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ['uid'],
  data: () => ({
    reviews: {
      1: {
        username: 'MR@NDERSON',
        rating: 4.9,
        date: 'Aug 30th 2020',
        service: 'Session 2',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
      },
      2: {
        username: 'MR@NDERSON',
        rating: 4.9,
        date: 'Sept 30th 2020',
        service: 'Session 1',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
      },
      3: {
        username: 'MR@NDERSON',
        rating: 4.9,
        date: 'Oct 30th 2020',
        service: 'Session 3',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
      },
      4: {
        username: 'MR@NDERSON',
        rating: 4.9,
        date: 'Nov 30th 2020',
        service: 'Session 1',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
      },
      5: {
        username: 'MR@NDERSON',
        rating: 4.9,
        date: 'Nov 30th 2020',
        service: 'Session 1',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
      },
      6: {
        username: 'MR@NDERSON',
        rating: 4.9,
        date: 'Nov 30th 2020',
        service: 'Session 1',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
      },
    },
  }),
};
</script>

<style scoped>
.reviewRow {
  max-width: 100%;
  max-height:500px;
  margin-left: 1.8421052631578947vw;
  margin-right: 1.8421052631578947vw;
  overflow-x: scroll;

}
.reviewTitle {
  font: normal 600 1.3157894736842106vw Poppins;
  color:#666666;
  display: inline-block;
}
.reviewRating {
  align-self: flex-end;
  display: inline-block;
  font: normal 700 1.0417vw Poppins;
}
.reviewDescription {
  display: inline-block;
  font: normal 500 1.0526315789473684vw Arboria;
  color: #FFFFFF;
  width: 21.157894736842106vw;
  margin-bottom: 0;
}
.reviewDate {
  display: inline-block;
  font: normal 500 0.78125vw Arboria;
  color: #666666;
  align-self: flex-start;
  text-align: right;
}
.reviewHeader {
  font: normal 700 2.6041vw Poppins;
  color: #333;
}
.reviewCol {
  min-width: 27.083333333333332vw;
  padding-bottom: 5.208333333333333vw;
  margin-right: 10%;
}
</style>
