<template>
  <v-card v-if="service" class="elevation-16 mx-auto" width="300">
    <v-card-title class="text-h5">
      Rate your seller!
    </v-card-title>
    <v-card-text>
      We at Provana.GG value your opinion. Leave a rating and a comment to reflect on your expierience with this seller.

      <div class="text-center mt-12">
        <v-rating
          v-model="rating"
          color="primary "
          background-color="grey darken-1"
          empty-icon="$ratingFull"
          hover
          large
        ></v-rating>
      </div>
      <h3 class="mt-3">Comments:</h3>
      <v-textarea
        background-color="#111111"
        data-test="description-input"
        color="white"
        class="pt-2  descriptionText"
        name="description input"
        no-resize
        filled
      ></v-textarea>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="justify-space-between">
      <!-- <v-btn text>
        cancel
      </v-btn> -->
      <v-spacer></v-spacer>
      <v-btn color="secondary" text>
        Rate Now
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['service'],
  data: () => ({
    rating: '',
    serviceID: '',
  }),
};
</script>

<style>
.descriptionText {
  font: normal normal 0.78125vw/0.78125vw Poppins;
}
</style>
