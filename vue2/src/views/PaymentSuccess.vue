<template>
<v-row class="onboardRow" justify="center">
    <v-col class="msgCol">
        <div>
        <h2 class="successMsg"> Payment made!</h2>
        </div>
        <h2 class="message"> Now that you've bought this service you'll be able to:</h2>
        <br/>
        <br/>
        <h2 class="message white--text"> -Chat with the seller from your dashboard.</h2>
        <br/>
        <br/>
        <h2 class="message white--text"> -See this sevice booked on your dashboard calendar :D</h2>
        <br/>
        <br/>
        <h2 class="message white--text"> Make sure to communicate with the buyer to ensure you're ready to conduct the session by the start time!</h2>

        <v-btn to="/dashboard" class="btn" color="primary"> Dashboard<v-icon> </v-icon></v-btn>
    </v-col>
    <v-col class="imgCol">
        <v-img width="26.041666666666668vw" src="../assets/PaySuccess01.svg"></v-img>
    </v-col>
</v-row>
</template>

<script>
import { functions } from '../plugins/firebase'
var stripe = Stripe("pk_test_51HJUgfGoIl5NLNcQKTXPu3CKuckXq6vbUXxASrRZvrXgwtODSI9wFNWdZoo37LY3YXrrfMx2N7Nas1MWbWn7ddu100RWAa63mC")
export default {
    name: "PaymentSuccess",

    // prop of the checkout session ID comes from vue router
    props: ['checkoutSessionId'],

    data: () => ({
    }),

    async mounted() {
        this.retrievePaymentResult()
    },

    methods: {
        async retrievePaymentResult() {
            const checkoutComplete = functions.httpsCallable('checkoutComplete')
            const response = await checkoutComplete({ checkoutId: this.checkoutSessionId })
        }
    }
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
    font: normal 500 1.0416666666666667vw  Arboria;
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
.btn{
    font: normal 500 1.0416666666666667vw  Poppins;
    letter-spacing: -0.052083333333333336vw;
    margin-top: 2vw;
    min-height: 2.62vw;
}
.btn.v-btn:hover:before {
  color: white;
  opacity: 1;
}
</style>
