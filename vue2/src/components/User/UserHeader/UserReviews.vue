<template>
  <v-row class="reviewRow">
    <v-col>
      <!-- iterate through reviews as card elements -->
      <div v-if="reviews.length > 0">
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
          <!-- review message-->
          <v-col class="pa-0">
            <p class="reviewDescription">
              {{ review.message }}
            </p>
          </v-col>
          <!-- review date / serviceName -->
          <span class="reviewDate mr-4"> {{ review.date }}</span>
          <span class="reviewDate"> {{ review.service }} </span>
        </v-card>
      </div>

      <!-- user has no reviews yet -->
      <div v-else>
        <v-card color="transparent">
          <h2 class="reviewTitle "> This user has no reviews submited yet </h2>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { functions } from '../../../plugins/firebase'

export default {
  props: ['reviews'],
  
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
