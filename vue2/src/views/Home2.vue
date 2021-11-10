<template>
	<section class="heroContainer">
		<v-img src="../assets/Provana_Lockup.png" class="logoImg" contain></v-img>
		<div class="heroText">
			<h1 class="heroH1"> Start selling any engagement. </h1>
			<h2 class="heroH2"> In literally 5 minutes, for free… </h2>
		</div>
		<v-img src="../assets/MVP_storefront_1.png" contain class="heroImg"> </v-img>
		<v-btn class="btnCTA homeBtn" color="primary" @click="makeAnAccount"> Make a free account </v-btn>
	</section>
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
}

@media screen and (min-width: 1530px) and (max-width: 1800px) {
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
}
@media screen and (min-width: 925px) and (max-width: 1530px) {
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
}
</style>
