<template>
  <v-window v-model="window">
    <v-window-item>
      <h3 class="label"> Alpha Partner Code </h3>
      <v-text-field
        :error-messages="codeError"
        single-line
        class="usernameInput"
        color="white"
        v-model="alphaCode"
        required
      ></v-text-field>
      <div class="d-flex flex-row-reverse mt-8">
        <v-btn class="nextBtn" color="primary" @click="allowAlphaPartner" text>
          Next <v-icon> fas fa-chevron-right </v-icon>
        </v-btn>
      </div>
    </v-window-item>
    <v-window-item>
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
          class="passwordInput"
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
          class="passwordInput"
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
          <v-icon :disabled="!valid" color="primary" @click="newCreator">fas fa-paper-plane</v-icon>
        </div>
      </v-form>
    </v-window-item>
  </v-window>
</template>

<script>
import { functions } from '../../plugins/firebase';

export default {
  data() {
    return {
      showPassword: false,
      valid: false,
      codeError: '',
      alphaCode: '',
      username: '',
      email: '',
      password: '',
      matchPassword: '',
      window: 0,
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
    newCreator() {
      this.$store.commit('loading/SET_LOADING', true)
      const newSeller = functions.httpsCallable('registerCreator');
      const seller = { email: this.email, password: this.password, code: this.alphaCode, username: this.username };
      newSeller(seller).then(() => {
        this.$router.push('/login')
        this.$store.commit('loading/SET_LOADING', false)
      });
    },
    async allowAlphaPartner() {
      this.$store.commit('loading/SET_LOADING', true)
      const validateInvitation = functions.httpsCallable('validateInvitation')
      await validateInvitation({code: this.alphaCode})
      .then((resp) => {
        console.log(resp.data)
        if (resp.data === false) {
          return this.$store.commit('error/SET_ERROR', {
            show: true,
            message: 'Invalid registration code.',
            color: 'primary',
            icon: 'fas fa-exclamation'
          })
        } else if (resp.data === true) {
          return this.window = 1
        } else {
          return this.$store.commit('error/SET_ERROR', "unknown error", resp.data)
        }
      })
      this.$store.commit('loading/SET_LOADING', false)
    },
  },
};
</script>

<style scoped>
.label {
  padding-top: 3%;
  font: normal bold 20px Poppins;
}
.usernameInput {
  padding-top: 1%;
}
.nextBtn {
  align-self: flex-end;
}
</style>
