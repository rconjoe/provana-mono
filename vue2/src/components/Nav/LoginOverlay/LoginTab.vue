<template>
	<v-card flat color="#111111" class="loginCard">
		<v-card-text>
			<p class="loginText"> Login to purchase, track sessions, and make edits to your storefront and services.</p>
			<v-form @submit.prevent="signIn">
				<v-text-field class="usernameInput" v-model="email" label="E-mail"> </v-text-field>
				<v-text-field
					v-model="password"
					:type="showPassword ? 'text' : 'password'"
					:append-icon="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
					@click:append="showPassword = !showPassword"
					class="passwordInput"
					label="Password"
				>
				</v-text-field>
				<div class="d-flex justify-space-between">
					<v-spacer> </v-spacer>
					<v-btn text id="loginBtn" type="submit"> Login</v-btn>
				</div>
			</v-form>
		</v-card-text>
	</v-card>
</template>

<script>
import { auth, LOCAL_PERSISTENCE, NO_PERSISTENCE } from '../../../plugins/firebase'
import gsap from 'gsap'

export default {
	data: () => ({
		password: '',
		email: '',
		showPassword: false,
		setCookie: true,
	}),
	methods: {
		shake() {
			let tl = gsap.timeline()
			tl.to('.loginCard', { duration: 0.1, x: 20 })
				.to('.loginCard', { duration: 0.1, x: -20 })
				.to('.loginCard', { duration: 0.1, x: 0 })
		},
		closeLogin() {
			this.$store.dispatch('auth/setLoginOverlay', { showLogin: false })
		},
		async signIn() {
			this.$store.commit('loading/SET_LOADING', true)
			if (this.setCookie === true) {
				await auth.setPersistence(LOCAL_PERSISTENCE)
				await auth
					.signInWithEmailAndPassword(this.email, this.password)
					.then((resp) => {
						this.$store.dispatch('error/setError', {
							show: false,
							color: 'green',
							message: 'Success',
							icon: 'fas fa-check',
						})
						this.closeLogin()
						this.$router.push('/dashboard')
					})
					.catch((err) => {
						this.shake()
						this.$store.dispatch('error/setError', {
							show: true,
							color: 'warning',
							message: err,
							icon: 'fas fa-exclamation',
						})
						this.$store.commit('loading/SET_LOADING', false)
					})
			} else {
				await auth.setPersistence(NO_PERSISTENCE)
				await auth
					.signInWithEmailAndPassword(this.email, this.password)
					.then((resp) => {
						this.closeLogin()
					})
					.catch((err) => {
						this.$store.commit('loading/SET_LOADING', false)
					})
			}
		},
	},
}
</script>

<style scoped>
.usernameInput {
	padding-top: 1%;
}

::v-deep #loginBtn .v-btn__content {
	font: normal 600 1.67rem Poppins;
	letter-spacing: -0.083rem;
	text-transform: none;
	align-self: center;
}
#loginBtn {
	color: #e61b5b;
}
#loginBtn:hover {
	color: white;
}
.loginText {
	font: normal normal 1.2rem Arboria;
	max-width: 400px;
	padding-top: 1vw;
	padding-bottom: 1vw;
}
::v-deep input:-webkit-autofill,
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
