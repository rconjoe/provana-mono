<template>
  <div class="aboutDiv">
    <v-row>
      <v-col class="aboutTitleCol">
        <h1 class="aboutTitle"> About </h1>
      </v-col>
      <v-col>
        <p class="bioText"> {{this.bio}} </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name:'UserAbout',
  props:{
    bio:{
      default:'This user has not set his bio yet. Check back soon...',
      type: String,
    }
  }

}
</script>

<style scoped>
.aboutDiv{
    display:inline-block;
    width:30.208333333333332vw;
    min-height:9.270833333333334vw;
    background-color: #111111;
}
.bioText{
  font: normal 500 0.78125vw Arboria;
  margin-top:1.5vw;

}
.aboutTitleCol{
  max-width: 7.8125vw; 
}
.aboutTitle{
  margin-left: 1.0416666666666667vw;
  margin-top: 1vw; 
  font: normal 600 1.8229166666666667vw Poppins;
  letter-spacing: -0.09114583333333333vw;
  color: #333333;
}

</style>