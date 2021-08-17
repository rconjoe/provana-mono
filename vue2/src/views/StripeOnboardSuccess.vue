<template>
<v-row class="onboardRow" >
    <v-col class="completedCol">
        <div class="completedDiv">
            <h2 class="completed">All done!</h2>
            <h3 class="smallText"> Thanks for connecting Stripe. </h3>
        </div>
        <div class="unlockedDiv">
            <h2 class="unlocked"> Now that you’ve connected a Stripe Account, you just unlocked:</h2>
            <br/>
            <br/>
            <h3 class="unlockedItem"> -Payments </h3>
            <br/>
            <br/>
            <h3 class="unlockedItem"> -Services </h3>
            <br/>
            <br/>
            <h3 class="unlockedItem"> -Very new and shiny storefront.</h3>
        </div>
    </v-col>

    <v-col class="eyesCol">
        <v-img class="eyes" src="../assets/ProvanaEyes_Login.png"> </v-img>
        <h4 class="btnText"> Let’s goooooooo…</h4>
        <v-btn color="primary" class="stripeBtn">Check them out</v-btn>
    </v-col>
</v-row>
</template>

<script>
import { functions } from '../plugins/firebase'
// TODO: change this whole onboarding call so:
// 1. onboard isn't a claim, if at all, as much as it is a DB entry
// 2. when you land on this page we should check your stripe account THEN onboard, just like payment flow
//    if this gets shipped like this imagine if someone ends up on this page by mistake
export default {
    name: "StripeOnboardSuccess",

    data: () => ({
    }),
    mounted() {
        this.completeOnboard()
    },

    methods: {
        async completeOnboard() {
            let fun = functions.httpsCallable('callableCompleteOnboard');
            await fun({uid: this.$user.uid})
            .then(function() {
                console.log("Write operation successful");
                    })
            .catch(function(error) {
                console.error("Error writing document: ", error);
                    });
            return this.$router.push("/dashboard");
        }
    },

}

</script>

<style scoped>
.onboardRow{
    padding-top:3vw;
    min-height: 100vh;
    background-image: url('../assets/VerticalCamoBG1.png');
    background-size: cover;
}
.eyes{
    width:22.395833333333332vw;
    position:absolute;
    margin-top:10vw;
}
.completedCol{
    margin-top:120px;
    margin-left:17.75vw;
    max-width:35vw;
}
.completedDiv{
    margin-bottom:3.125vw;
}
.completed{
    font: normal bold 2.6vw Poppins;
    display: inline-block;
    letter-spacing: -0.13020833333333334vw;
}
.smallText{
    font:normal 500 1.0416666666666667vw Arboria;
    color:#717171;
}
.unlockedDiv{
    max-width:26.197916666666668vw
}
.unlocked{
    font: normal bold 1.5625vw/1.6vw Poppins;
    letter-spacing: -0.078125vw;

}
.unlockedItem{
    font: normal bold 1.3020833333333333vw Poppins;
    letter-spacing: -0.078125vw;
    }
.check{
    vertical-align: top;
    margin-top:.5vw;
}
.eyeCol{
    position:relative;
}

.stripeBtn:hover{
color:#D4145A;
}
.stripeBtn.v-btn:hover:before{
  color:#F5F5F5;
  opacity:1;
}
.stripeBtn{
    min-height:2.6041666666666665vw ;
    font: normal 600 1vw Arboria;
}
.btnText{
    font:normal bold 1.3020833333333333vw Arboria;
    letter-spacing: -0.078125vw;
    margin-bottom: .6vw;
    margin-top: 26vw;
    color:#717171;

}

</style>
