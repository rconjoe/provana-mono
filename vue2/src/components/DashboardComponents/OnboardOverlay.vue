<template>
<div>
  <LoadingOverlay v-if="onboarded === false && redirectLoading === true" message="Please wait while you are redirected."/>
  <h1>Get paid up to 15 days faster with Stripe and Provana.GG</h1>
  <h3>
    Wish your customers could pay you on the spot? We’ve teamed up with Stripe so you can accept online invoice payments via credit card, debit card, or Apple Pay, to get the cash flowing in without having to go to great lengths
  </h3>
  <v-btn class="btnCTA mt-4" color="primary" @click="generateLink" :loading="redirectLoading"> Get Started </v-btn>
</div>
</template>

<script>
import { functions } from '../../plugins/firebase'
import LoadingOverlay from '../LoadingOverlay.vue'
export default {
  name: 'OnboardOverlay',
  components: {
    LoadingOverlay
  },

  data: () => ({
    redirectLoading: false
  }),

  methods: {
    async generateLink() {
      this.redirectLoading = true
      const stripeAccountOnboard = functions.httpsCallable('stripeAccountOnboard')
      const response = await stripeAccountOnboard({ uid: this.$user.uid })
        window.location = response.data.url
    }
  }

}
</script>

<style>

</style>