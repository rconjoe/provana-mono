<template>
  <v-row class="detailsRow">
    <v-col class="detailsCol">
        <!-- serviceName -->
        <h1 class="serviceName"> {{service.serviceName}} </h1>
        <div class="row">
            <v-col cols="6" class="serviceImgCol">
                <v-img src="../../assets/ProvanaAlphaBadge-02.png" max-width="13.736842105263158vw" max-height="140" />
            </v-col>
            <v-col class="serviceInfoCol">  
                <h1 class="serviceTerms"> Session Terms </h1>
                <div class="serviceLengthDiv">
                    <span class="serviceLength"> {{service.serviceLength}}min </span>
                    <span class="serviceLength"> ${{service.serviceCost}} </span>
                </div>
                <h1 class="serviceSoftware"> {{service.software}} </h1>
            </v-col>
        </div>
        <h1 class="serviceDescription">{{service.serviceDescrption}} </h1>
    </v-col>
  </v-row>
</template>

<script>
export default {
    props:['service']

}
</script>

<style scoped>
.serviceDescription{
    margin-top:1.5789473684210527vw;
    font: normal 500 0.7894736842105263vw Arboria;
    color:#E8E8E8;
}
.serviceSoftware{
    font: normal 500 0.9473684210526315vw Arboria;
    color:#999999;

}
.serviceTerms{
    font: normal 600 1.3157894736842106vw Poppins;
    letter-spacing: -0.07894736842105263vw;
    margin-bottom: .5vw;
    color:#E61B5B;

}
.serviceLength{
    font: normal 600 1.3157894736842106vw Poppins;
    letter-spacing: -0.07894736842105263vw;
    color:white;
    margin-right:2vw
}
.serviceName{
    font:normal 600 1.5789473684210527vw Poppins;
    letter-spacing: -0.07894736842105263vw;
    color:white;
    margin-bottom:1.3157894736842106vw;
}
.detailsRow{
    min-width:480px;
}

</style>