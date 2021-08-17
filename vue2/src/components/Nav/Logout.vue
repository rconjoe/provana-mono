<template>
    <v-btn
        class="logoutBtn"
        elevation="3"
        small
        color="#333333"
        @click="signOut"

    > Logout </v-btn>
</template>

<script>
import { auth } from '../../plugins/firebase'

export default {
    name: "Logout",

              methods: {
                  signOut() {
                      auth.signOut()
                      .then(() => {
                          // clear cookie to prevent immediate re-login
                          this.$store.commit('error/SET_ERROR','You Have logged out and will be redirected.')
                          this.$store.commit('error/SET_SHOW_ERROR',true)
                          this.$cookie.remove('provanaUID')
                          window.location = '/'
                          
                      })
                  }
              },
}
</script>
<style scoped>
.logoutBtn{
    padding-left:3.75vw;
}
</style>

