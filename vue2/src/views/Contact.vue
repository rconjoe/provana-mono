<template>
  <v-row class="contactRow">
    <v-col cols="8">
      <v-icon color="primary" size="2.864vw"> fas fa-bullhorn </v-icon>
      <h2 class="contactTitle"> Contact </h2>
      <p class="contactDetails">Make sure to log in before inquiring about account related information.</p>
      <div class="linksDiv">
        <h1 class="link">Looking to reach out to our support staff?</h1> <br/>
        <h1 class="link">Looking to verify an account?</h1> <br/>
        <h1 class="link">Looking to just chat for a bit?</h1> <br/>
        <h1 class="link">Looking to register for an Org or Agency account?</h1> <br/>
        <h1 class="link">Looking to find out more information about partnerships?</h1> <br/>
      </div>
    </v-col>
    <v-col class="eyesCol">
      <v-img class="eyes" width="32.3vw" src="../assets/ProvanaEyes_Login.png"></v-img>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style scoped>
.contactRow {
  padding-top: 7.5%;
  padding-left: 7.29vw;
  min-height: 50.468vw;
  background-image: url('../assets/_DashboardBG1.png');
  background-size: cover;
}
.contactTitle {
  font: normal bold 2.605vw Poppins;
  display: inline-block;
  vertical-align: middle;
  padding-left: 2vw;
}
.contactDetails {
  padding-left: 5vw;
  font: normal normal 0.78vw Poppins;
  color: #969696;  
}
.linksDiv {
  padding-left: 11.405vw;
  padding-top: 2vw;
}
.link{
    padding-bottom: 1.09375vw;
    font: normal 500 1.25vw Poppins;
    cursor: pointer;
    letter-spacing: -0.078125vw;
    display:inline-block;
}
.link:hover{
    color:#D4145A;
}
.eyesCol {
  position: relative;
}
.eyes {
  position: absolute;
  margin-top: 9vw;
  margin-left:-12vw;
}
</style>
