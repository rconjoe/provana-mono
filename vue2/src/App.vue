<template>
  <v-app>
    <!-- global navbar -->

    <CustomAppBar />

    <!-- router content -->
    <v-main>
      <v-container fluid>
        <v-progress-linear
          color="grey lighten-5"
          background-color="grey darken-1"
          rounded
          indeterminate
          :active="loading"
        >
        </v-progress-linear>
        <v-alert
          class="errorMessage"
          dismissible
          id="error"
          outlined
          type="warning"
          :icon="error.icon"
          :color="error.color"
          v-model="error.show"
        >
          {{error.message}}
        </v-alert>
        <router-view />
      </v-container>
    </v-main>
    <!-- footer -->
    <Footer v-if="!$vuetify.breakpoint.mobile" />
  </v-app>
</template>

<script>
import CustomAppBar from '@/components/Nav/CustomAppBar.vue'
import Footer from '@/components/Nav/Footer.vue'
import { mapState } from 'vuex'

export default {
  name: 'App',
  appNavDrawer: false,
  components: {CustomAppBar, Footer},
  data: () => ({
    scrollTop: 1,
  }),
  computed: mapState({
    error: state => state.error.data,
    loading: state => state.loading.show
  }),
};
</script>
<style>
.errorMessage {
  position: fixed !important;
  width: 50vw;
  left: 25vw;
  z-index: 5;
  background-color: black !important;
}
.v-alert__content {
  text-transform: uppercase;
}
#error {
  background: #1e1e1eee !important;
  opacity: 1;
}
#error .v-icon {
  color: #fa4b6b;
}
html {
  scroll-behavior: smooth;
}
/* Global btn style */

.btnCTA.v-btn{
  min-width:2.6041666666666665vw;
  font: normal 700 0.78215vw Poppins;
		letter-spacing: 0px;
		border-radius: 8px;
}
  .btnCTA:hover {
		color: #fa4b6b ;
	}
  .btnCTA.v-btn:hover::before{
		color: #f5f5f5;
		opacity: 1;
	}
  .btnCTA.v-btn:hover{
		color: #fa4b6b;
  }
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
