<template>
  <v-row class="serviceRow">
    <v-col class="serviceCol">
      <v-row>
        <v-col class="headerCol pb-0">
          <h2 class="servicesTitle"> Set your schedule</h2>
          <h1 class="dashHeader"> Services </h1>
        </v-col>
        <v-col class="pb-0">
      
      <!-- Services tab component left col -->
      <ServicesTabs @pass-service="setSelectedService" @service-tabs-reload="serviceTabsReload" :key="tabsKey"/>
        </v-col>
      </v-row>
      <v-row>
        
        <v-col class="calCol">
          <v-sheet class="calSheet ma-2 ml-0 pl-0" height="22.135416666666668vw" width="76.04166666666667vw" color="transparent">
                <ServiceCal :selectedService="selectedService" />
              </v-sheet>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import ServiceCal from './ServiceCal.vue'
import ServicesTabs from './ServicesTabs'

export default {
  name: 'DashboardService',
  components: {
    ServiceCal,
    ServicesTabs,
  },
  data: () => ({
    selectedService:null,
    tabsKey:1,

  }),
  methods: {
    setSelectedService(e){
      this.selectedService = e;
    },
    serviceTabsReload(){
      this.tabsKey = this.tabsKey ;
    }
  },
};
</script>

<style scoped>


.dashHeader {
  transform: rotate(-90deg);
  position: absolute;
  font: normal normal bold 5.208vw Poppins;
  color: #1e1e1e;
  left: -3.6vw;
  top: 5vw;
}

.calSheet{
  padding-left: 4vw;
}
.headerCol{
  max-width:16.26vw;
}
.containHeader {
  padding-left: 20vw;
}
.servicesTitle {
  font: normal 600 2.6vw/2.6vw Poppins;
  width:11.25vw;
  margin-bottom:1vw;
  letter-spacing: -0.13020833333333334vw;
}
.serviceRow {
  position:relative;
  min-height:51.041666666666664vw;
  padding-top:4vw;
  margin-left:9.114583333333334vw;


}
.calCol {
  margin-left: 5.8vw;
}
.calTitle {
  font: normal bold 1.56vw Poppins;
}
.dashHeader {
  transform: rotate(-90deg);
  position: absolute;
  font: normal bold 5.2vw Poppins;
  color: #1e1e1e;
  margin-left:-14.4vw;
  margin-top: 3vw;
}
</style>