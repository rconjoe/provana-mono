<template>
<v-card flat color="#111111" v-click-outside="registerReset">
	<v-row class="registerRow">
		<!-- left section where user selects type of form to fill -->
		<v-col class="my-4">
			<v-card flat color="#111111">
				<v-card-text>
					<v-window v-model="window">
						<v-window-item>
							<!-- creator link -->
							<h1 @click="window = 'creator'" class="creator">Creator</h1>
							<!-- Supporter Link -->
							<h1 @click="window = 'supporter'" class="creator">Supporter</h1>
						</v-window-item>

						<v-window-item value="creator">
							<CreatorRegister @go-back="goBack" @goto-login="gotoLogin" />
						</v-window-item>

						<v-window-item value="supporter">
							<SupporterRegister @go-back="goBack" />
						</v-window-item>
					</v-window>
				</v-card-text>
			</v-card>
		</v-col>
		<!-- <v-col class="registerCol">
			<v-slide-y-reverse-transition mode="out-in">
				<div v-if="selected === 'creator'" class="creatorFormDiv">
					<CreatorRegister />
				</div>
				<div v-if="selected === 'supporter'" class="creatorFormDiv"> 
          		<SupporterRegister />
        </div>
			</v-slide-y-reverse-transition>
		</v-col> -->
	</v-row>
</v-card>
</template>

<script>
	import CreatorRegister from './CreatorRegister.vue'
	import SupporterRegister from './SupporterRegister.vue'

	export default {
		name: 'Register',
		components: { CreatorRegister, SupporterRegister },
		data() {
			return {
				window: 0,
			}
		},

		methods: {
			gotoLogin() {
				this.$emit('goto-login')
			},
			goBack(e) {
				this.window = e
			},
			registerReset(){
				this.window= 0
			}
		},
	}
</script>
<style scoped>
	.v-card__text {
		padding: 0.8333333333333334vw 3.8541666666666665vw 0.8333333333333334vw 3.8541666666666665vw;
	}
	a {
		text-decoration: none;
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
		cursor: pointer;
		text-align: center;
	}
	.creatorDisabled {
		cursor: pointer;
		display: inline-block;
		font: normal bold 2.9761904761904763vw Poppins;
		color: #333333;
		letter-spacing: -0.208vw;
	}
	.usernameInput {
		padding-top: 1%;
	}
	.creatorDiv {
		margin-left: 1.24vw;
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
		margin-left: 1.24vw;
	}
	.creatorTitle {
		font: normal bold 20px Poppins;
		position: relative;
		text-transform: uppercase;
	}
	.creatorFormDiv {
		margin-right: 1.24vw;
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
