<template>
	<v-btn elevation="3" color="#333333" @click="signOut"> Logout </v-btn>
</template>

<script>
import { auth } from '../../plugins/firebase'

export default {
	name: 'Logout',

	methods: {
		signOut() {
			auth.signOut().then(() => {
				// clear cookie to prevent immediate re-login
				this.$store.commit('error/SET_ERROR', { message: 'You have logged out and will be redirected.' })
				this.$store.commit('error/SET_SHOW_ERROR', true)
				window.location = '/'
			})
		},
	},
}
</script>
<style scoped></style>
