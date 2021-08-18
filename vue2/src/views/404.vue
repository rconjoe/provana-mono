<template>
  <v-row class="errorRow" align="center">
    <v-col class="d-flex flex-column align-center"> 
        <div class="div">
       <v-icon color="secondary" size="2.2vw" class="pb-3">fas fa-exclamation </v-icon> <span class="whoops"> Whoops </span> <span class="wrong">something went wrong...</span></div>
        <v-img width="60vw" src="../assets/Provana404.png"></v-img>
        <span class="wrong"> lets get you back home </span>
        <v-btn color="secondary" to="/" class="mt-3 btn"> swoosh </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style scoped>
.div{
    align-self: flex-start;
}
.btn{
    font: normal bold 1vw Poppins;
}
.btn.v-btn:hover:before {
  color: white;
  opacity: 1;
}
.btn:hover {
  color: #FA4B6B;
}
.whoops{
    font: normal bold 2.124vw Poppins;
}
.wrong{
    font: normal bold 1vw Poppins;
}
.errorRow{
    min-height: 100vh;
    background-image: url('../assets/Aboutbg3.png');
    background-size: cover;
}
</style>
