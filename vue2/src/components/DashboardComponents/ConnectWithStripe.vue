<template>
  <div>
    <LoadingOverlay v-if="onboarded === false && redirectLoading === true" />
    <v-btn @click="generateAccountLink">
      <v-img
        height="50"
        width="175"
        contain
        src='@/assets/blue-on-dark.png'>
      </v-img>
    </v-btn>
  </div>
</template>

<script>
import { functions } from '../../plugins/firebase'
import LoadingOverlay from '../LoadingOverlay.vue'
export default {
    name: "ConnectWithStripe",
    props: ['onboarded'],
    components: {
      LoadingOverlay,
    },

    data: () => ({
      redirectLoading: false
    }),

    methods: {
        async generateAccountLink() {
          this.redirectLoading = true
            let linkFun = functions.httpsCallable('generateAccountLink');

            await linkFun({uid: this.$user.uid}).then((resp) => {
                window.location = resp.data.url;
            })
        }
    },


}
</script>

<style>
</style>
