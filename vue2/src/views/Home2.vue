<template>
	<div>
		<section class="heroContainer">
			<v-img src="../assets/Provana_Lockup.png" class="logoImg" contain></v-img>
			<div class="heroText">
				<h1 class="heroH1"> Start selling any engagement. </h1>
				<h2 class="heroH2"> In literally 5 minutes, for free… </h2>
			</div>
			<v-img src="../assets/MVP_storefront_1.png" contain class="heroImg"> </v-img>
			<v-btn class="btnCTA homeBtn" color="primary" @click="makeAnAccount"> Make a free account </v-btn>
		</section>
		<section class="serviceHomeContainer">
			<div class="serviceText">
				<h2> Let us handle the legwork. </h2>
				<p>
					Schedule, sell, and chat from within our purpose built dashboards and let our system take care of
					the rest.
				</p>
			</div>
			<v-img src="../assets/MVP_service_1.png" contain position="center top" class="serviceImg"> </v-img>
		</section>
	</div>
</template>

<script>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
export default {
	methods: {
		makeAnAccount() {
			this.$store.dispatch('auth/setLoginOverlay', { showLogin: !this.showLogin, loginTab: 'register' })
		},
		scrollbarAnimate() {
			this.tl
				.fromTo(
					'.navLogo',
					{
						opacity: 0,
						y: 10,
					},
					{
						opacity: 1,
						y: 0,
						ease: 'power1',
					}
				)
				.from(
					'.appBar',
					{
						backgroundColor: 'transparent',
						boxShadow: 'none',
						ease: 'power1',
					},
					0
				)
		},
	},
	mounted() {
		;(this.tl = gsap.timeline({
			scrollTrigger: {
				id: 'homeScroll',
				trigger: '.logoImg',
				start: ' -170px',
				end: ' -200px',
				markers: true,
				scrub: 0.3,
			},
		})),
			this.scrollbarAnimate()
	},

	beforeDestroy() {
		this.tl.kill()
	},
}
</script>

<style scoped lang="scss">
.serviceHomeContainer {
	min-height: 100vh;
	padding-top: 30%;
	background-image: url(../assets/Aboutbg3.png);
	background-size: cover;
	grid-template-columns: 6fr 4fr;
	grid-template-rows: auto;
	grid-template-areas:
		'serviceText'
		'serviceImg';
	.serviceImg {
		grid-area: serviceImg;
		min-height: 200px;
	}

	.serviceText {
		grid-area: serviceText;
		max-width: 620px;
		margin: 0 auto;
	}
	h2 {
		font: normal 600 60px/60px Poppins;
		text-align: left;
		letter-spacing: -4px;
		margin-left: 10%;
	}
	p {
		margin-top: 2rem;
		margin-left: 10%;
		margin-right: auto;
		font: normal 500 18px Arboria;
		text-align: left;
		max-width: 400px;
	}
}
.heroContainer {
	margin-top: -60px;
	margin-left: auto;
	margin-right: auto;
	padding-top: 5%;
	padding-bottom: 5%;
	display: grid;
	grid-template-columns: auto;
	grid-template-rows: auto;
	grid-template-areas:
		' . provana .'
		'. h1 .'
		'. img .'
		'. btn .';
	background-image: url(../assets/Mainbg_1.png);
	background: transparent linear-gradient(180deg, #111111 0%, #03030300 100%) url(../assets/Mainbg_1.png);
	background-size: cover;
	background-position: left;
	min-height: 100vh;
}
h1 {
	font: normal 600 54px/50px Poppins;
	letter-spacing: -4px;
	color: #e61b5b;
	text-align: center;
	padding-bottom: 30px;
}
h2 {
	font: normal 600 45px/45px Poppins;
	letter-spacing: -2.7px;
	width: auto;
	display: block;
	text-align: center;
}
.logoImg {
	grid-area: provana;
	max-width: 300px;
	margin: 0 auto;
}
.heroText {
	grid-area: h1;
	z-index: 2;
}
.heroImg {
	grid-area: img;
}

.homeBtn {
	margin: 0 3%;
	grid-column: 2;
}

@media (min-width: 1800px) {
	.heroContainer {
		padding-left: 4%;
		padding-top: 0;
		display: grid;
		grid-template-columns: auto auto auto auto;
		grid-template-rows: provana 280px btn 300px;
		grid-template-areas:
			' provana . . .'
			' h1 h1 img img'
			'.   . .  btn';
		background: linear-gradient(0deg, #111111 0%, #03030300 100%), url(../assets/Mainbg_1.png);
		background-size: cover;
		background-position: left;
		min-height: 100vh;
		h1 {
			font: normal 600 120px/120px Poppins;
			letter-spacing: -6px;
			color: #e61b5b;
			width: 960px;
		}
		.logoImg {
			grid-area: provana;
			max-width: 300px;
			margin: none;
		}
		.heroText {
			margin-top: 5%;
			grid-row: h1;
			grid-column: h1-start / h1-end;
			z-index: 2;
		}
		.heroImg {
			max-width: 1150px;
			margin-top: 18%;
			justify-self: flex-end;
			grid-row: provana / img;
			grid-column: h1-end / img-end;
		}
		h2 {
			font: normal 600 54px Poppins;
			letter-spacing: -2.7px;
			margin-left: 15%;
		}
		.homeBtn {
			margin-bottom: 200px;
			grid-row: btn;
			grid-column: btn;
			margin-right: 300px;
			align-self: flex-start;
		}
	}
	//
	// Service Section
	.serviceHomeContainer {
		padding-top: 10%;
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		grid-template-areas: 'serviceImg serviceImg serviceImg serviceText serviceText';
		.serviceImg {
			grid-area: serviceImg;
			grid-column: 1 / span 6;
			object-fit: contain;
			background-position: top;
		}
		.serviceText {
			margin: none;
			grid-area: serviceText;
			grid-row: serviceText;
			grid-column: 6 / span 4;
			z-index: 1;
		}
		h2 {
			max-width: 570px;
			margin-left: 0;
		}
		p {
			margin-left: 100px;
		}
	}
}

@media screen and (min-width: 1530px) and (max-width: 1800px) {
	//
	//  Herosection
	.heroContainer {
		padding-left: 4%;
		padding-top: 0;
		display: grid;
		grid-template-rows: [provana] 280px [h1] 300px;
		grid-template-areas:
			' provana . . .'
			' h1 h1 img img'
			' .   .    . btn';
		background: linear-gradient(0deg, #111111 0%, #03030300 100%), url(../assets/Mainbg_1.png);

		background-size: cover;
		background-position: left;
		min-height: 100vh;
		h1 {
			font: normal 600 120px/90px Poppins;
			letter-spacing: -6px;
			color: #e61b5b;
			width: 890px;
			text-align: left;
		}
		.logoImg {
			grid-area: provana;
			max-width: 300px;
			margin: none;
		}
		.heroText {
			grid-row: h1;
			grid-column: h1-start / h1-end;
			z-index: 2;
		}
		.heroImg {
			max-width: 840px;
			margin-top: 20%;
			justify-self: flex-end;
			grid-row: provana / img;
			grid-column: h1-end / img-end;
		}
		h2 {
			font: normal 600 54px Poppins;
			letter-spacing: -2.7px;
			margin-left: 15%;
			text-align: left;
		}
		.homeBtn {
			grid-row: btn;
			grid-column: btn;
			margin-right: 200px;
			align-self: flex-start;
			justify-items: center;
		}
	}
	//
	// service section
	.serviceHomeContainer {
		padding-top: 10%;
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		grid-template-areas: 'serviceImg serviceImg serviceImg serviceText serviceText';
		.serviceImg {
			grid-area: serviceImg;
			grid-column: 1 / span 6;
			object-fit: contain;
			background-position: top;
		}
		.serviceText {
			grid-area: serviceText;
			grid-row: serviceText;
			grid-column: 6 / span 4;
			z-index: 1;
		}
		h2 {
			max-width: 400px;
		}
		p {
			margin-left: 150px;
		}
	}
}
@media screen and (min-width: 925px) and (max-width: 1530px) {
	//
	//  Hero section
	.heroContainer {
		margin-left: auto;
		margin-right: auto;
		padding-top: 5%;
		padding-bottom: 5%;
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: auto;
		grid-template-areas:
			' . provana .'
			'. h1 .'
			'. img .'
			'. btn .';
		background-image: url(../assets/Mainbg_1.png);
		background: transparent linear-gradient(180deg, #111111 0%, #03030300 100%) url(../assets/Mainbg_1.png);
		background-size: cover;
		background-position: left;
		min-height: 100vh;
	}
	h1 {
		font: normal 600 120px/120px Poppins;
		letter-spacing: -6px;
		color: #e61b5b;
		text-align: center;
	}
	h2 {
		font: normal 600 54px Poppins;
		letter-spacing: -2.7px;
		width: auto;
		display: block;
		text-align: center;
	}
	.logoImg {
		grid-area: provana;
		max-width: 400px;
		margin: none;
	}
	.heroText {
		grid-area: h1;
		z-index: 2;
	}
	.heroImg {
		grid-area: img;
	}

	.btnCTA.homeBtn {
		margin: 0 20%;
		font: normal 600 2rem Poppins;
		grid-column: 2;
	}
	//
	//  Service Section
	.serviceHomeContainer {
		.serviceText {
			align-items: center;
		}
		h2 {
			text-align: left;
			margin: 0 auto;
		}
	}
}
</style>
