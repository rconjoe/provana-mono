<template>
  <!-- custom hover effect on card swaps css style with a transition -->
  <v-card @mouseover="hover = true" @mouseleave="hover = false" @click="serviceClicked" class="service1 pa-4 ">
    <!-- Card contents -->
    <v-row class="d-flex align-center">
      <!-- Title column -->
      <v-col cols="8" class="serviceTitleCol">
        <div class="serviceTitle pb-0 text-truncate"> {{ service.serviceName }}</div>
        <!-- Duration and Cost column -->
        <v-col cols="12" class="serviceInfoCol pa-0 d-flex justify-space-between">
          <h1 class="serviceInfo1 text-truncate"> {{ service.serviceLength }} Min.</h1>
          <h1 class="serviceInfo2 text-truncate "> {{ service.serviceCost }}</h1>
        </v-col>
        <!-- platform and software Column -->
        <v-col cols="12" class="serviceInfoCol pa-0 d-flex justify-space-between">
          <div class="serviceInfo1 text-truncate"> {{service.platform}}
          </div>
          <h1 class="serviceInfo2 text-truncate"> {{ service.software }}</h1>
        </v-col>
      </v-col>
      <!-- service description only displays on hover and floats to right of title column. -->
      <div v-if="hover" align-self="center" class="descriptionCol">
        <!-- custom transition fades in text of bio -->
        <p :key="service.title" class="serviceDescription">
          {{ service.serviceDescription }}
        </p>
      </div>
    </v-row>
  </v-card>
</template>

<script>
import { db } from '../../plugins/firebase'

export default {
  props: ['service'],
  data: () => ({
    hover: false,
  }),
  methods: {
    async serviceClicked() {
      this.$emit('service-clicked', this.service);
    },
  },
};
</script>

<style scoped>
/* Services Styles */
.serviceTitle {
  font: normal 600 1.3021vw Poppins;
  display: inline-block;
  width: 18.75vw;
}
.descriptionCol {
  position: absolute;
  padding-left: 18.5vw;
  width: 100%;
  max-height:90px;
  overflow-y:scroll;
  top:.24vw;
}
.serviceInfo1 {
  color: #717171;
  font: normal 500 1.0417vw Arboria;
  display: inline-block;
  max-width: 6.73vw;
  margin-right:0.78125vw;
}
.serviceInfo2 {
  display: inline-block;
  color: #717171;
  font: normal 500 1.0417vw Arboria;
  max-width: 9.73vw;
}
.serviceTitleCol {
  max-width: 15.708333333333332vw;
  padding-top:.5vw;
  padding-bottom: 0;

}
.serviceInfoCol{
  width:14.708333333333332vw;
}
.serviceDescription {
  font: normal normal .9vw Arboria;
  text-align: left;
  color: #505050;
  margin-top: 0.4vw;
  max-width: 27.75vw;
  animation: fadeIn ease 2s;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.service1 {
  max-width:28.64vw;
  transition: width 0.5s ease-in-out;
  height: 6.25vw;
  margin-bottom: 1.3020833333333333vw !important;
  position:relative;
}
.service1:hover {
  max-width:100%;
  margin-right: 0;
  color: #d51458;
  background-color: white;
  border-radius: 0;
  transition: all 0.3s;
}
.fade-enter-active {
  transition: opacity 1s;
}
.fade-enter-to, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
