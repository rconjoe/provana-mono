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

		<section class="alphaPerksContainer">
			<div class="perksSummary">
				<!-- Col 1/2 alphaPerksText -->
				<h1 class="alphaPerksTextTop"> Oh hi… you’re early. Check out these here </h1>
				<h1 class="alphaPerksTitle">Alpha Perks.</h1>
				<p class="alphaPerksDetails"
					>Although what we’re doing hasn’t really been done before, we’re aiming to refine our features like
					they’ve been baking for millions of years under miles of molten rock.
					<br />
					<br />
					Through our Alpha Program, users signing up as sellers are helping us stress-test our support, user
					experience and capabilities and we’d like to pay it forward. :D
				</p>
				<h3 class="alphaPerksDate">Sign up before November 30th</h3>
				<v-btn class="btnCTA mt-12 center" color="primary" @click="makeAccount"> Make an account</v-btn>
			</div>

			<div class="perksList">
				<ul>
					<li>
						<h3 class="alphaPerksSubText">Earn more with</h3>
						<div class="alphaPerksListDiv">
							<v-img src="../assets/About-Dash-1.png" max-width="7" class="alphaPerksDash"></v-img>
							<h3 class="alphaPerksListText">+10% Revenue Share</h3>
						</div>
					</li>
					<li>
						<h3 class="alphaPerksSubText">Stay ahead of the game with</h3>
						<div class="alphaPerksListDiv">
							<v-img src="../assets/About-Dash-1.png" max-width="7" class="alphaPerksDash"></v-img>
							<h3 class="alphaPerksListText">Access to Beta Features</h3>
						</div>
					</li>
					<li>
						<h3 class="alphaPerksSubText">Get more eyes on your services through</h3>
						<div class="alphaPerksListDiv">
							<v-img src="../assets/About-Dash-1.png" max-width="7" class="alphaPerksDash"></v-img>
							<h3 class="alphaPerksListText">Platform Promotion</h3>
						</div>
					</li>
					<li>
						<h3 class="alphaPerksSubText">This bad boy next to your name.</h3>
						<div class="alphaPerksListDiv">
							<v-img src="../assets/About-Dash-1.png" max-width="7" class="alphaPerksDash"></v-img>
							<h3 class="alphaPerksListText">Username</h3>
							<v-img
								class=" ml-2"
								src="../assets/ProvanaAlphaBadge-02.png"
								max-width="1.3rem"
								contain
							></v-img>
						</div>
					</li>
				</ul>
				<div class="alphaPerksLineWhite"></div>
				<div class="alphaPerksLinePink"></div>
			</div>
		</section>
		<section class="footer ">
			<h1> Engage the engaging. </h1>
			<v-btn class="footBtn btnCTA" @click="makeAnAccount"> Make a free account </v-btn>
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
						background: 'transparent',
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
				scrub: 0.3,
			},
		})),
			this.scrollbarAnimate()
	},

	beforeDestroy() {
		this.tl.pause(1).kill()
	},
}
</script>

<style scoped lang="scss">
.heroContainer {
	margin-top: -60px;
	margin-left: auto;
	margin-right: auto;
	padding-top: 5%;
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
		min-height: 50px;
	}
}

.serviceHomeContainer {
	min-height: auto;
	padding-top: 30%;
	padding-bottom: 100px;
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
.alphaPerksContainer {
	min-height: 100vh;
	padding-top: 12%;
	background-image: url(../assets/Aboutbg3.png);
	background-size: cover;
	display: grid;
	grid-template-areas:
		'  perksSum '
		' perksList ';
	.perksSummary {
		grid-area: perksSum;
		padding-bottom: 200px;
		margin: 0 auto;
		max-width: min(100%, 540px);
		padding-left: 10px;
		padding-right: 10px;
	}
	.perksList {
		grid-area: perksList;
		position: relative;
		margin: 0 auto;
		margin-bottom: 200px;
	}
	ul {
		list-style: none;
		padding-left: 10px;
		margin-left: 10px;
	}
	.alphaPerksListDiv {
		display: flex;
		align-content: center;
		height: 45px;
		margin-bottom: 66px;
	}
	.alphaPerksDash {
		display: inline-block;
	}
	.alphaPerksListText {
		margin-left: 25px;
		vertical-align: middle;
		display: inline-block;
		font: normal 600 30px/30px Poppins;
		letter-spacing: -2.5px;
	}
	.alphaPerksDetails {
		margin-top: 76px;
		font: normal 500 20px Arboria;
		color: #717171;
		max-width: min(100%, 540px);
		letter-spacing: 0;
	}
	.alphaPerksSubText {
		margin-left: 25px;
		margin-bottom: 19px;
		letter-spacing: -1.25px;
		font: normal bold 25px/25px Arboria;
		color: #717171;
	}
	.alphaPerksTextTop {
		font: normal bold 50px/50px Poppins;
		letter-spacing: -2.5px;
		color: #333333;
		margin-bottom: 26px;
	}
	.alphaPerksTitle {
		font: normal bold 60px Poppins;
		letter-spacing: -2.5px;
		color: white;
	}
	.alphaPerksDetails {
		margin-top: 56px;
		font: normal 500 20px Arboria;
		color: #717171;
		letter-spacing: 0;
	}
	.alphaPerksDate {
		font: normal bold 25px/25px Poppins;
		letter-spacing: -1.25px;
		color: #e61b5b;
		margin-top: 38px;
	}
	.alphaPerksLineWhite {
		position: absolute;
		border-left: 2px solid #e8e8e8;
		width: 1px;
		height: 630px;
		top: 18px;
		z-index: 1;
	}
	.alphaPerksLinePink {
		position: absolute;
		border-left: 2px solid #e61b5b;
		width: 1px;
		height: 630px;
		top: 0;
		left: 18px;
		z-index: 1;
	}
}
.footer {
	background: linear-gradient(to bottom, #111111 0%, rgb(255, 255, 255) 25%);
	min-height: 480px;
	display: grid;
	align-content: center;
	.footBtn {
		min-height: 50px;
		background-color: #e61b5b;
		font: normal 600 1.2rem Poppins;
		max-width: 210px;
		margin: 0 auto;
		border-radius: 10px;
	}
	h1 {
		margin: 0 auto;
		display: inline-block;
		font: normal normal 600 35px Poppins;
		letter-spacing: -1.5px;
		color: black;
		margin-bottom: 30px;
		text-align: center;
	}
}
@media screen and (min-width: 925px) and (max-width: 1530px) {
	//
	//  Hero section
	.heroContainer {
		margin-left: auto;
		margin-right: auto;
		padding-top: 5%;
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
	//
	// Alpha perks
	.alphaPerksContainer {
		min-height: 100vh;
		padding-top: 12%;
		background-image: url(../assets/Aboutbg3.png);
		background-size: cover;
		display: grid;
		grid-template-areas: '  perksSum perksList';
		.alphaPerksListText {
			margin-left: 25px;
			vertical-align: middle;
			display: inline-block;
			font: normal 600 50px/50px Poppins;
			letter-spacing: -2.5px;
		}
	}
	//
	// Footer
	.footer {
		background: linear-gradient(to bottom, #111111 0%, rgb(255, 255, 255) 25%);
		min-height: 480px;
		display: grid;
		grid-template-areas: ' engage button';
		column-gap: 100px;
		.footBtn {
			grid-area: button;
			justify-self: start;
			margin: 0;
			align-self: center;
			line-height: 50px;
		}
		h1 {
			display: inline-block;
			grid-area: engage;
			font: normal normal 600 50px Poppins;
			letter-spacing: -1.5px;
			color: black;
			margin: 0;
			text-align: right;
			margin-bottom: 0;
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
		padding-top: 100px;
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
			max-width: 500px;
			margin-top: 20%;
			margin-left: 0;
		}
		p {
			margin-left: 50px;
		}
	}
	//
	// Alpha Perks
	.alphaPerksContainer {
		min-height: 100vh;
		padding-top: 12%;
		background-image: url(../assets/Aboutbg3.png);
		background-size: cover;
		display: grid;
		grid-template-columns: 1fr 6fr 4fr 1fr;
		grid-template-areas: ' . perksSum perksList .';
		.alphaPerksTitle {
			font: normal bold 80px Poppins;
			letter-spacing: -2.5px;
			color: white;
		}
		.alphaPerksListText {
			margin-left: 25px;
			vertical-align: middle;
			display: inline-block;
			font: normal 600 50px/50px Poppins;
			letter-spacing: -2.5px;
		}
	}
	//
	// Footer
	.footer {
		display: grid;
		grid-template-areas: ' engage button';
		column-gap: 100px;
		.footBtn {
			grid-area: button;
			justify-self: start;
			margin: 0;
			align-self: center;
			line-height: 50px;
		}
		h1 {
			display: inline-block;
			grid-area: engage;
			font: normal normal 600 50px Poppins;
			letter-spacing: -1.5px;
			color: black;
			margin: 0;
			text-align: right;
			margin-bottom: 0;
		}
	}
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
			width: 550px;
			margin: none;
			grid-area: serviceText;
			grid-row: serviceText;
			grid-column: 6 / span 4;
			z-index: 1;
		}
		h2 {
			margin-top: 30%;
			max-width: 445px;
			margin-left: 0;
		}
		p {
			margin-left: 100px;
		}
	}
	//
	// AlphaPerks
	.alphaPerksContainer {
		min-height: 100vh;
		padding-top: 12%;
		background-image: url(../assets/Aboutbg3.png);
		background-size: cover;
		display: grid;
		grid-template-columns: 1fr 6fr 4fr 1fr;
		grid-template-areas: ' . perksSum perksList .';
		.alphaPerksTitle {
			font: normal bold 80px Poppins;
			letter-spacing: -2.5px;
			color: white;
		}
		.alphaPerksListText {
			margin-left: 25px;
			vertical-align: middle;
			display: inline-block;
			font: normal 600 50px/50px Poppins;
			letter-spacing: -2.5px;
		}
	}
	//
	// Footer
	.footer {
		display: grid;
		grid-template-areas: ' engage button';
		column-gap: 100px;
		.footBtn {
			grid-area: button;
			justify-self: start;
			margin: 0;
			align-self: center;
			line-height: 50px;
		}
		h1 {
			display: inline-block;
			grid-area: engage;
			font: normal normal 600 50px Poppins;
			letter-spacing: -1.5px;
			color: black;
			margin: 0;
			text-align: right;
			margin-bottom: 0;
		}
	}
}
</style>
