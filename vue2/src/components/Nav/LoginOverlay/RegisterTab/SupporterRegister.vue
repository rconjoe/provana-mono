<template>
	<v-form v-model="valid" @submit.prevent="newSupporter" >
		<!-- Username -->
		<v-text-field
			class="usernameInput mt-4"
			color="white"
			label="Username"
			:rules="usernameRules"
			:success="!!username"
			v-model="username"
		></v-text-field>
		<!-- Password -->
		<v-text-field
            class="usernameInput"
			color="white"
			v-model="password"
			:type="showPassword ? 'text' : 'password'"
			:append-icon="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
			@click:append="showPassword = !showPassword"
			:rules="passwordRules"
			:success="!!password"
			label="Password"
		></v-text-field>
		<!-- Confirm password -->
		<v-text-field
            class="usernameInput"
			single-line
			color="white"
			v-model="matchPassword"
			:type="showPassword ? 'text' : 'password'"
			:append-icon="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
			@click:append="showPassword = !showPassword"
			:rules="matchPassword !== password ? ['Passwords must match.'] : []"
			:success="!!matchPassword"
			label="Confirm password"
		></v-text-field>
		<!-- E-mail -->
		<v-text-field
			single-line
			color="white"
			class="usernameInput"
			autocomplete="email"
			v-model="email"
			:rules="emailRules"
			:success="!!email"
			label="E-mail"
		></v-text-field>

		<div class="d-flex justify-space-between mt-8">
			<v-btn text class="registerBtn" @click="goBack">
				<v-icon size="1vw" class="mr-4"> fas fa-chevron-left </v-icon> Back
			</v-btn>
			<v-btn text class="registerBtn" type="submit" :disabled="!valid"> Register</v-btn>
		</div>
	</v-form>
</template>

<script>
	import { functions } from '../../../../plugins/firebase'

	export default {
		data: () => ({
			showPassword: false,
			valid: false,
			username: '',
			email: '',
			password: '',
			matchPassword: '',
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
		}),
		methods: {
			goBack() {
				this.$emit('go-back', 0)
			},
            async newSupporter() {
				const registerSupporter = functions.httpsCallable('registerSupporter')
				await registerSupporter({
					email: this.email,
					password: this.password,
					username: this.username,
				})
				
				this.$store.dispatch('auth/setLoginOverlay', {loginTab:'login'})
				this.$store.dispatch('error/setError',{color:'success',message:'You have successfully registered. Please login',icon:'fas fa-check',show:true})
				this.email = ''
				this.username = ''
				this.password = ''
				this.matchPassword = ''
				this.goBack()
			},
		},
	}
</script>

<style scoped>
	.usernameInput {
		padding-top: 1%;
		margin-bottom: 1vw;
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
