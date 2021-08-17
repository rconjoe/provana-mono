<template>
  <v-row class="registerRow">
    <!-- left section where user selects type of form to fill -->
    <v-col cols="6">
      <h3 class="welcomeBack"> Make an account </h3>
      <h5 class="stepCloser">One step closer to awesome experiences.</h5>
      <!-- creator link -->
      <div class="creatorDiv" >
        <h1 @click="selected = 'creator'" :class="selected === 'supporter' ? 'creatorDisabled' : 'creator'">Creator</h1>
        <v-scale-transition>
          <p v-show="selected === 'creator'" class="creatorDetails">
            Start selling personalized servicesfrom a customizable storefront.
          </p>
        </v-scale-transition>
      </div>
      <!-- Supporter Link -->
      <div class="supporterDiv" >
        <h1 @click="selected = 'supporter'" :class="selected === 'creator' ? 'creatorDisabled' : 'creator'">Supporter</h1>
        <v-scale-transition>
          <p v-show="selected === 'supporter'" class="creatorDetails">
            Start looking for once-in-a-lifetime experiences.
          </p>
        </v-scale-transition>
      </div>
    </v-col>
    <!-- right section where the form is displayed based on selection-->
    <v-col class="registerCol">
      <div class="registerDiv">
        <h3 class="dontHaveAccount"> Already have an account?</h3>
        <router-link to="/login"> <h4 class="register">Sign in here!</h4> </router-link>
      </div>
      <img class="eyes" src="../assets/ProvanaEyes_Login.png" />
      <v-slide-y-reverse-transition mode="out-in">
        <!-- Creator form -->
        <div v-if="selected === 'creator'" class="creatorFormDiv">
          <CreatorRegister />
        </div>
        <!-- Supporter form -->
        <div v-else-if="selected === 'supporter'" class="creatorFormDiv">
          <v-form v-model="valid">

            <h3 class="label"> Username </h3>
            <v-text-field
              single-line
              class="usernameInput"
              color="white"
              :rules="usernameRules"
              :success="!!username"
              error-count="4"
              v-model="username"
            ></v-text-field>

            <h3 class="label"> Password </h3>
            <v-text-field
              single-line
              color="white"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
              @click:append="showPassword = !showPassword"
              :rules="passwordRules"
              :success="!!password"
            ></v-text-field>

            <h3 class="label"> Confirm Password </h3>
            <v-text-field
              single-line
              color="white"
              v-model="matchPassword"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
              @click:append="showPassword = !showPassword"
              error-count="4"
              :rules="[(v) => v === password || 'Passwords must match.']"
              :success="!!matchPassword"
            ></v-text-field>

            <h3 class="label"> Email </h3>
            <v-text-field
              single-line
              color="white"
              class="usernameInput"
              autocomplete="email"
              error-count="4"
              v-model="email"
              :rules="emailRules"
              :success="!!email"
            ></v-text-field>

            <div class="d-flex flex-row-reverse mt-8">
              <v-icon :disabled="!valid" color="primary" @click="newSupporter">fas fa-paper-plane</v-icon>
            </div>
          </v-form>
        </div>
      </v-slide-y-reverse-transition>
    </v-col>
  </v-row>
</template>

<script>
import { functions } from '../plugins/firebase';
import CreatorRegister from '@/components/Register/CreatorRegister.vue';

export default {
  name: 'Register',
  components: { CreatorRegister },
  data() {
    return {
      valid: false,
      selected: '',
      email: '',
      username: '',
      password: '',
      matchPassword: '',
      tagline: '',
      stripe: '',
      showPassword: false,
      usernameRules: [
        (v) => !!v || 'Username is required',
        (v) => (v && v.length <= 20) || 'Username must be less than 20 characters',
        (v) => (v && v.length >= 4) || 'Username must be longer than 3 characters',
        (v) => /(^(\d|\w)+$)/.test(v) || ' Username must not contain special characters',
      ],
      passwordRules: [
        (v) => (v && v.length >= 6) || 'Password must be longer than 6 characters',
        (v) => /(?=.*[A-Z])/.test(v) || 'Password must contain a Capital letter',
        (v) => /(?=.*\d)/.test(v) || 'Password must contain at least one number',
      ],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'Please enter a valid E-mail',
        (v) => (v && v.length >= 4) || 'Email must be longer than 4 characters',
      ],
    };
  },
  methods: {
    async newSupporter() {
      const registerSupporter = functions.httpsCallable('registerSupporter')
      await registerSupporter({
        email: this.email,
        password: this.password,
        username: this.username
      })
      this.$router.push('/login')
    },
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
.registerRow {
  padding-top: 7.5%;
  padding-right: 8.2%;
  background-image: url('../assets/VerticalCamoBG1.png');
  background-size: cover;
  min-height: 100vh;
  min-width: 100vw;
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
.creator {
  font: normal bold 2.9761904761904763vw Poppins;
  letter-spacing: -0.26vw;
  display:inline-block;
  cursor: pointer;
}
.creatorDisabled {
  cursor:pointer;
  display:inline-block;
  font: normal bold 2.9761904761904763vw Poppins;
  color: #333333;
  letter-spacing: -0.208vw;
}
.usernameInput {
  padding-top: 1%;
}
.creatorDiv {
  margin-left: 9vw;
  margin-top: 10%;
  min-height: 130px;
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
.registerDiv {
  padding-top: 1.2vw;
  padding-left: 28%;
}
.eyes {
  z-index: 0;
  margin-top: 8.7%;
  width: 600px;
  height: auto;
  position: absolute;
  transform: rotate(10deg);
}
.label {
  padding-top: 3%;
  font: normal bold 20px Poppins;
}
.passwordLabel {
  font: normal bold 20px Poppins;
}
.creatorDetails {
  font: normal 500 0.78125vw Poppins;
  color: #969696;
}
.supporterDiv {
  height: 170px;
  cursor: pointer;
  margin-left: 9vw;
}
.creatorTitle {
  font: normal bold 20px Poppins;
  position: relative;
  text-transform: uppercase;
}
.creatorFormDiv {
  width: 450px;
  position: relative;
  margin-top: 15%;
  z-index: 1;
}
.supporterFormDiv {
  width: 450px;
  position: relative;
  margin-top: 42%;
  z-index: 1;
}
>>> .v-text-field input {
  font: normal 500 20px Arboria;
}
>>> .v-input {
  padding-top: 0;
  margin-top: 0;
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
