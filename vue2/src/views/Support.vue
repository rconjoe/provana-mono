<template>
  <v-row class="supportRow">
      <v-col cols="8">
          <v-icon color="primary" size="2.864vw"> fas fa-plus </v-icon>
          <h2 class="supportTitle"> Support </h2>
          <div class="helpDiv">
            <h2 class="howCanWeHelp"> How can we help?</h2>
            <p class="helpDetails"> For quick answers on common questions we always <br/> recommend viewing our FAQ. </p>
            <div class="faqDiv">
                <v-icon size="1.771vw"> fas fa-plus</v-icon> <span class="faq"> FAQ </span>
            </div>
            <div class="faqDiv">
                <v-icon size="1.771vw"> fas fa-plus</v-icon> <span class="faq"> Contact </span>
            </div>
          </div>    
      </v-col>
      <v-col class="eyesCol">
          <v-img class="eyes" width="32.3vw" src="../assets/ProvanaEyes_Login.png"></v-img>
      </v-col>
  </v-row>
</template>

<script>
export default {

}
</script>

<style scoped>
.supportRow{
    padding-top: 7.5%;
    padding-left:7.29vw;
    min-height: 50.468vw;
    background-image: url('../assets/Aboutbg3.png');
    background-size: cover;
}
.supportTitle{
    font:normal bold 2.605vw Poppins;
    display: inline-block;
    vertical-align: middle;
    padding-left:2vw;
}
.howCanWeHelp{
    font: normal 500 2.605vw Arboria;
    color: #B5B0B0;
}
.helpDetails{
    padding-top: 1.46vw;
    width:27.604vw;
    font: normal 300 1.042vw Poppins;
    color:#B5B0B0;
    letter-spacing: -0.0521vw;
}
.helpDiv{
    padding-left: 11.405vw;
    padding-top: 2vw;
}
.faq{
    font: normal 800 1.5625vw Poppins;
    vertical-align: middle;

}
.faqDiv{
    margin-top: 3.9vw;

}
.eyesCol{
    position:relative;
}
.eyes{
    margin-top: 9vw;
    margin-left:-12vw;
    position: absolute;

}
</style>