<template>
	<div>
		<v-row class="homeRow ">
			<v-col>
				<!-- Header Row -->
				<v-row>
					<!-- Col 1/2 About Provana Text/links -->
					<v-col cols="6">
						<div class="engageDiv ">
							<h1 class="engage">Find out what you can do with Provana.GG</h1>
						</div>
						<div class="createAccountDiv">
							<p class="createAccountText">
								Create a free account and start listing one-of-a-kind services and incentives in less that 5 minutes.
							</p>
						</div>
						<div class="whatIsDiv">
							<a class="white--text" href="#whatIsProvana"> <p class="whatIsProvana"> About ProvanaGG</p> </a>
							<br />
							<a class="white--text" href="#alphaPerks"> <p class="whatIsProvana"> Alpha Perks</p> </a>
							<br />
							<router-link class="white--text" to="/contact"> <p class="whatIsProvana"> Contact us</p> </router-link>
						</div>
					</v-col>
					<!-- Col 2/2  Rocket League image -->
					<v-col cols="6">
						<v-row class="heroImageRow">
							<v-col class="heroImageCol">
								<div class="heroImageDiv">
									<v-img size="28vw" color="primary" src="../assets/HomeSplash1.png"> </v-img>
								</div>
								<div class="heroTextDiv">
									<h2 class="heroText1"> 1v1 The Rocket League Gods at </h2>
									<h2 class="heroText2"> PRIDESTARK GAMING </h2>
									<v-btn class="homeBtn btnCTA" color="primary" @click="makeAnAccount()"> Make an account</v-btn>
								</div>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
		<AboutPage />
	</div>
</template>

<script>
	import AboutPage from '@/views/About.vue'

	export default {
		components: { AboutPage },

		methods: {
			makeAnAccount() {
				this.$store.dispatch('auth/setLoginOverlay',
					{showLogin: !this.showLogin,
					loginTab:'register'}
				) 
			},
		}
	}
</script>

<style scoped>
	a {
		text-decoration: none;
	}
	.homeRow {
		background-image: linear-gradient(0deg, #111111 0%, #11111181 31%, #11111100 100%), url('../assets/_HomeBG1.png');
		background-size: cover;
		min-height: 100vh;
		width: 100vw;
		padding-left: 11.979166666666666vw;
		padding-right: 11.979166666666666vw;
	}
	.heroImageRow {
		background-color: transparent;
		background-size: contain;
		background-position: center;
		margin-top: 0;
		flex-wrap: nowrap;
	}
	.heroImageDiv {
		width: 32.526315789473685vw;
	}
	.heroTextDiv {
		width: 32.526315789473685vw;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.heroText1 {
		text-align: center;
		font: normal 500 1.0526315789473684vw Arboria;
		letter-spacing: -0.05263157894736842vw;
	}
	.heroText2 {
		text-align: center;
		font: normal bold 1.0526315789473684vw Arboria;
		letter-spacing: -0.05263157894736842vw;
	}
	.publicAlpha {
		font: normal 500 1.3vw Poppins;
	}
	.soonish {
		color: #d4145a;
		font: normal 500 1.3vw Poppins;
	}
	.justifySelfEnd {
		margin-left: auto;
	}
	.publicAlphaDiv {
		padding-top: 3.2291666666666665vw;
	}
	.createAccountDiv {
		max-width: 24.94736842105263vw;
	}
	.containerSnap {
		scroll-snap-type: y proximity;
	}
	.snap {
		scroll-snap-align: start;
	}
	.engageDiv {
		padding-top: 9.67vw;
	}
	.createAccountText {
		font: normal normal 1.0526315789473684vw Arboria;
		color: #969696;
	}
	.engage {
		font: normal 600 4.2105263157894735vw/4.2105263157894735vw Poppins;
		letter-spacing: -0.21052631578947367vw;
		width: 32.473684210526315vw;
		color: white;
	}
	.whatIsDiv {
		padding-top: 3.2291666666666665vw;
	}
	.whatIsProvana {
		font: normal 500 1.56vw Poppins;
		display: inline-block;
	}
	.whatIsProvana:hover {
		color: #fa4b6b;
	}
	.sell {
		overflow: visible;
		letter-spacing: -2.5px;
		white-space: nowrap;
		font: normal bold 2.6vw Poppins;
		letter-spacing: 0px;
	}
	>>> .v-btn__content {
		margin-top: -5px;
	}
	.homeBtn {
		margin-top: 1vw;
		margin-right: auto;
		margin-left: auto;

		border-radius: 5px;
	}
	>>> .v-btn__content {
		margin-top: 0;
	}

	.sellCol {
		margin-top: 8.6vw;
	}
	.business {
	}
	.businessCol {
		margin-top: 12.7vw;
	}
</style>