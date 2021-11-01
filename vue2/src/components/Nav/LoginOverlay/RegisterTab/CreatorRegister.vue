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
			<div class="d-flex justify-space-between mt-8">
				<v-btn text class="registerBtn" @click="goBack(0)">
					<v-icon size="1vw" class="mr-2"> fas fa-chevron-left </v-icon> Back
				</v-btn>

				<v-btn text class="registerBtn" @click="allowAlphaPartner" :disabled="alphaCode == ''">
					Next
					<v-icon size="1vw" class="ml-2"> fas fa-chevron-right </v-icon>
				</v-btn>
			</div>
		</v-window-item>
		<v-window-item>
			<v-form v-model="valid" @submit.prevent="newCreator">
				<v-text-field
					class="usernameInput mt-3"
					color="white"
					:rules="usernameRules"
					:success="!!username"
					v-model="username"
					label="Username"
				></v-text-field>
				<!-- Password -->
				<v-text-field
					color="white"
					v-model="password"
					:type="showPassword ? 'text' : 'password'"
					:append-icon="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
					@click:append="showPassword = !showPassword"
					:rules="passwordRules"
					:success="!!password"
					class="usernameInput"
					label="Password"
				></v-text-field>
				<!-- Confirm password -->
				<v-text-field
					color="white"
					v-model="matchPassword"
					:type="showPassword ? 'text' : 'password'"
					:append-icon="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
					@click:append="showPassword = !showPassword"
					:rules="[(v) => v === password || 'Passwords must match.']"
					:success="!!matchPassword"
					class="usernameInput"
					label="Confirm password"
				></v-text-field>
				<!-- E-mail -->
				<v-text-field
					label="E-mail"
					color="white"
					class="usernameInput"
					autocomplete="email"
					v-model="email"
					:rules="emailRules"
					:success="!!email"
				></v-text-field>
				<div class="d-flex justify-space-between mt-8">
					<v-btn text class="registerBtn" @click="goBack(0)">
						<v-icon size="1vw" class="mr-2"> fas fa-chevron-left </v-icon> Back
					</v-btn>

					<v-btn text class="registerBtn" type="submit">
						Register
					</v-btn>
				</div>
			</v-form>
		</v-window-item>
	</v-window>
</template>

<script>
	import { functions } from '../../../../plugins/firebase'

	export default {
		name: 'CreatorRegister',
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
			}
		},
		methods: {
			goBack() {
				this.$emit('go-back', 0)
			},
			newCreator() {
				this.$store.commit('loading/SET_LOADING', true)
				const newSeller = functions.httpsCallable('registerCreator')
				const seller = { email: this.email, password: this.password, code: this.alphaCode, username: this.username }
				newSeller(seller).then(() => {
					this.$router.push('/login')
					this.$store.commit('loading/SET_LOADING', false)
				})
				this.$store.dispatch('auth/setLoginOverlay', { loginTab: 'login' })
				this.$store.dispatch('error/setError',{color:'success',message:'You have successfully registered. Please login',icon:'fas fa-check',show:true})
			},
			gotoLoginTab() {
				this.$emit('goto-login')
			},
			async allowAlphaPartner() {
				this.$store.commit('loading/SET_LOADING', true)
				const validateInvitation = functions.httpsCallable('validateInvitation')
				await validateInvitation({ code: this.alphaCode }).then((resp) => {
					if (resp.data === false) {
						return this.$store.state.error.commit('error/SET_ERROR', {
							show: true,
							message: 'Invalid registration code.',
							color: 'primary',
							icon: 'fas fa-exclamation',
						})
					} else if (resp.data === true) {
						return (this.window = 1)
					} else if (resp.data === 'NOTFOUND') {
						return this.setError(
							true,
							'Invalid registration code.',
							'primary',
							'fas fa-exclamation',
			      )
					}
				})
				this.$store.commit('loading/SET_LOADING', false)
			},
		},
	}
</script>

<style scoped>
	.label {
		padding-top: 3%;
		font: normal bold 20px Poppins;
	}
	.usernameInput {
		padding-top: 1%;
		margin-bottom: 1vw;
	}
	.nextBtn {
		align-self: flex-end;
	}
	.registerBtn {
		font: normal 600 1.25vw Poppins;
		text-transform: none;
		color: #e61b5b;
		align-self: center;
	}
	.registerBtn:hover {
		color: white;
	}
</style>
