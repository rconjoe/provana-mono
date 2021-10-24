<template>
    <v-row class="serviceRow">
      
       
      <v-col class="serviceCol" @click="serviceClicked(service)">
        <!-- Tittle row -->
        <div class="serviceTitleDiv">
          <h1 class="serviceTitle"> {{service.serviceName}} </h1>
        </div>
        <!-- Image row -->
        <div class="serviceImageDiv">
          
          <!-- price/length div -->
          <div class="serviceInfoDiv">
            <span class="serviceInfo"> ${{service.serviceCost}}</span>
            <span class="serviceInfo"> {{service.serviceLength}}min</span>
          </div>
        </div>

        <!-- Details Row -->
        <div class="serviceDetailsDiv mt-2">
          <v-icon v-if="service.attendees > 1" class="mx-2"> fas fa-users </v-icon>
          <span class="serviceDetails" > {{service.software}} </span>
          
        </div>
      </v-col>  
    </v-row>
</template>

<script>
import { db } from '../../plugins/firebase'
import gsap from 'gsap'
 
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
.description{
  font: normal 500 .78125vw Arboria;
  height:100%;
  color:white;
}
.descriptionDiv{
  background-color: #11111194;
  height: 7.45vw;
}
.serviceDetails{
  font: normal 500 1.052vw Arboria;
  color:#717171;
  margin: 0 0.631578947368421vw;
}
.serviceDetailsDiv{
  text-align: end;
 
}
.serviceCol:hover .serviceTitleDiv{
  width:100%;
  transition-duration: .5s;
  transition-timing-function: ease;
  
}
.serviceInfo{
  display:inline-block;
  margin-top: .5vw;
  margin-left:.5vw;
  color:white;
  font: normal 600 1.3020833333333333vw Poppins;
}
.serviceInfo:first-child{
  padding-right:.5vw;
  border-right: 1px solid #707070;
}
.serviceInfoDiv{
  margin-left:auto;
  max-width:183px;
  min-height:56px;
  background-color: #111111;
  border-radius: 0 0 0 25px;
}
.serviceImageDiv{
  margin-top:1.09375vw;
  background-position-x: center;
  min-height:10.416666666666666vw;
  background-image: url('../../assets/ProvanaAlphaBadge-02.png');
  background-color: #f5f5f5;
  background-size:contain;
}
.serviceRow{
  margin-right:3.90625vw;
  min-width:19.791666666666668vw;
  min-height:10.416666666666666vw;
  display: inline-block;
}
.serviceTitleDiv{
  border-radius: 0 10px 0 10px;
  background-color: #E61B5B;
  width:15px;
  transition-duration: .3s;

}
.serviceTitle{
  font: normal 600 1.5625vw Poppins;
  letter-spacing: -0.078125vw;
  margin-left:1.0416666666666667vw;
  width:16.791666666666668vw;
}
</style>
