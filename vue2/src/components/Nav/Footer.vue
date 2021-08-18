<template>
  <v-footer app absolute color="#1E1E1E" dark padless> 
      <v-row class="footerRow">
        <v-col class="footerCol d-flex felx-column align-center">
            <div class="footerDiv">
                <div class="eyesDiv">
                    <v-img class="eyes" width="13.65vw" src="../../assets/ProvanaEyes_Footer.png"></v-img>
                    <p class="copyright">© Provana Inc. 2021. Provana and ProvanaGG are registered trademarks of Provana Inc.</p>
                    <p class="trademark">All other trademarks, service marks, names, and copyrights are property of their respective owners.</p>
                    
                </div>
                <div class="aboutUsDiv">
                    <router-link class="link" to="/"> About us</router-link>
                    <router-link class="link" to="/"> Press</router-link>
                    <router-link class="link" to="/"> Media Kit</router-link>
                </div>
                <div class="aboutUsDiv">
                    <router-link class="link" to="/"> Alpha Program</router-link>
                    <router-link class="link" to="/"> Partnerships</router-link>
                    <router-link class="link" to="/"> Content Assets</router-link>
                    <router-link class="link" to="/"> Agencies and Orgs</router-link>
                </div>
                 <div class="aboutUsDiv">
                    <router-link class="link" to="/"> Terms of Service</router-link>
                    <router-link class="link" to="/"> Community Guidelines</router-link>
                    <router-link class="link" to="/"> Ethics Policy</router-link>
                </div>
                 <div class="lastDiv">
                    <router-link class="link" to="/"> Create an Account</router-link>
                    <router-link class="link" to="/"> Contact Us</router-link>
                    <router-link class="link" to="/"> Support</router-link>
                </div>
            </div>
        </v-col>
      </v-row>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data: () => ({
  })
};
</script>

<style scoped>
div {
    float:left;
}
a{
    text-decoration:none;
}
a:hover{
    color:white;
}
.footerRow{
    height:24.0625vw;
}
.eyes{
    margin-left:14.0625vw;
    position:absolute;
}
.eyesDiv{
    display: inline-block;
    position: relative;
    width:34.9vw;
    border-right: 1px solid #333333;
    height: 5.47vw;
}
.footerDiv{
    flex-direction: column;
    align-content: center;
    height:5.47vw;
}
.aboutUsDiv{
    display: inline-block;
    height:5.47vw;
    width:13.75vw;
    border-right:1px solid #333333;
    padding-left:1.302vw;
}
.lastDiv{
    display: inline-block;
    height:5.47vw;
    width:13.75vw;
    padding-left:1.302vw;
}
.link{
    display: block;
    width: 100%;
    font: normal 500 .7812vw Arboria;
    color:#717171;
    padding-bottom:.42vw;
}
.copyright{
    margin-top: 6.4vw;
    margin-left:14.0625vw;
    position:absolute;
    width:16.51vw;
    font: normal 500 .78134vw Arboria;
    color: #717171;
}
.trademark{
    margin-top: 9vw;
    margin-left:14.0625vw;
    position:absolute;
    width:16.51vw;
    font: normal 500 .78134vw/.8vw Arboria;
    color: #717171;

}
</style>
