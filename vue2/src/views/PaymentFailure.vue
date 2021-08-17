<template>
<v-row class="onboardRow" justify="center">
    <v-col class="msgCol">
        <div>
        <h2 class="successMsg"> Payment cancelled!</h2>
        </div>
        <h2 class="message white--text"> You can try ordering this session again later if it's still available.</h2>
        <br/>
       <v-btn to="/dashboard" class="btn" color="primary"> Dashboard<v-icon> </v-icon></v-btn>
        <br/>
        <br/>
        <h2 class="message white--text"> If you reached this page in error, reach out to ProvanaGG Support.</h2>
        <br/>
        <br/>
        <v-btn text color='secondary' class="failLink pl-0"> DISCORD</v-btn>
        <v-btn text color='secondary' class="failLink"> Email</v-btn>
    </v-col>
    <v-col class="imgCol">
        <v-img width="26.041666666666668vw" src="../assets/PayFail01.svg"></v-img>
    </v-col>
</v-row>
</template>

<script>

//TODO: call accounts api to check for status before allowing onboardComplete to write


export default {
    name: "PaymentSuccess",

    data: () => ({
    }),

}

</script>

<style scoped>
.onboardRow{
    padding-top:7.8125vw;
    min-height: 100vh;
    background-image: url('../assets/VerticalCamoBG1.png');
    background-size: cover;
}
.card{
    background-color: #1e1e1e77;
    padding: 2vw;
    border: 1px solid black;

}
.message{
    font: normal bold 1.0416666666666667vw  Arboria;
    letter-spacing: -0.052083333333333336vw;
    color:#717171;
    max-width:26.197916666666668vw;
}
.successMsg {
    font: normal 500 2.6041666666666665vw Poppins;
    letter-spacing: -0.13020833333333334vw;
    color:#ffffff;
    padding-bottom:2.625vw;

}

.msgCol{
    max-width:35vw;
    margin-right: 8vw;
}
.center {
    text-align: center;
}
.imgCol{
    max-width:30vw;
    padding-top:3vw;
}
.btn:hover{
    color:#D4145A;
}
.failLink{
    font: normal 500 1.0416666666666667vw  Poppins;
    letter-spacing: -0.052083333333333336vw;
    margin-right:1.5625vw;
}

.btn{
    font: normal 500 1.0416666666666667vw  Poppins;
    letter-spacing: -0.052083333333333336vw;
    margin-top: 2vw;
    min-height: 2.62vw;
    margin-bottom:4vw;
}
.btn.v-btn:hover:before {
  color: white;
  opacity: 1;
}
</style>
