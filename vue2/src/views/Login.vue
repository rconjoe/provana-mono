<template>
  <v-row class="loginRow">
    <v-col cols="6">
      <h3 class="welcomeBack"> Welcome back! </h3>
      <h5 class="stepCloser">One step closer to awesome experiences.</h5>
      <div class="loginDiv">
        <h1 class="login">Login</h1>
        <v-form>
            <h3 class="emailLabel">  Email </h3>
          <v-text-field single-line class="usernameInput" autocomplete="email" v-model="email" label="name@domain.com"></v-text-field>
          <h3 class="passwordLabel">  Password </h3>
          <v-text-field
          autocomplete="current-password"
            single-line
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
            @click:append="showPassword = !showPassword"
            class="passwordInput"
            label="Password"
          ></v-text-field>
        </v-form>
        <div class="d-flex flex-row-reverse">
          <v-icon color="primary" @click="signIn">fas fa-paper-plane</v-icon>
        <v-spacer />
        <v-checkbox
          v-model='setCookie'
          label='Remember me'
          class='stepCloser'
          color='red'>
        </v-checkbox>
        </div>
      </div>
    </v-col>
    <v-col class="registerCol">
      <div class="registerDiv">
      <h3 class="dontHaveAccount"> Don't have an account?</h3>
      <router-link to="/register"> <h4 class="register">Register here!</h4> </router-link>
      </div>
      <img class="eyes" src="../assets/ProvanaEyes_Login.png"/>
    </v-col>
  </v-row>
</template>

<script>
import { auth, LOCAL_PERSISTENCE, NO_PERSISTENCE } from '../plugins/firebase';

export default {
  name: 'Login',
  data: () => ({
    password: '',
    email: '',
    showPassword: false,
    setCookie: false,
  }),
  methods: {
    async signIn() {
      this.$store.commit('loading/SET_LOADING', true)
      if(this.setCookie === true) {
        await auth.setPersistence(LOCAL_PERSISTENCE)
        await auth
          .signInWithEmailAndPassword(this.email, this.password)
          .then((resp) => {
          })
          .catch((err) => {
            console.log(err);
            this.$store.commit('loading/SET_LOADING', false);
          })
      }
      else {
        await auth.setPersistence(NO_PERSISTENCE)
        await auth
          .signInWithEmailAndPassword(this.email, this.password)
          .then((resp) => {
          })
          .catch((err) => {
            console.log(err);
            this.$store.commit('loading/SET_LOADING', false);
          })
        }
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.loginRow {
  padding-top: 7.5%;
  padding-right: 8.2%;
  background-image: url('../assets/VerticalCamoBG1.png');
  background-size: cover;
  min-height: 100%;
  min-width: 100%;
  padding-left: 9.2%;
}
.welcomeBack {
  font: normal 500 2.6vw Poppins;
  color: #333333;
  letter-spacing: -2.5px;
}
.stepCloser {
  padding-top: 0.52vw;
  font: normal bold 1.04vw Arboria;
  letter-spacing: -0.052vw;
}
.login {
  font: normal bold 3.71vw Poppins;
  letter-spacing: -0.26vw;
}
.usernameInput {
  padding-top: 1%;
}
.loginDiv {
  margin-left: ;
  margin-top: 10%;
}
.dontHaveAccount {
  font: normal 600 1.56vw Arboria;
  letter-spacing: -0.078vw;
}
.register {
  padding-top: 2.8%;
  font: normal 600 1.56vw Arboria;
  letter-spacing: -0.078vw;
  color: #fa4b6b;
}
.register:hover {
  color: #d4145a;
}
.registerCol {
  margin-left: 5%;
}
.registerDiv{
    padding-top:2%;
    padding-left:28%;
}
.eyes{
    margin-top:24%;
    width:80%;
    height:auto;
    transform: rotate(10deg)
}
.emailLabel{
    padding-top: 5%;
    font: normal bold 20px Poppins;
}
.passwordLabel{

    font: normal bold 20px Poppins;
}
/* webkit auto fill styles */

>>> input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-text-fill-color: white;
  -webkit-box-shadow: 0 0 0px 1000px #131313 inset;
font: normal 500 20px Arboria;
}
</style>
