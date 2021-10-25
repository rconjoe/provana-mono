<template>
	<!-- Container -->
	<v-row>
		<v-col class="pa-0 transparentBG">
			<div class="card1 snap">
				<v-row class="servicesUnleashedRow">
					<!-- AboutUs / Reachout Col -->
					<v-col class="videoCol">
						<v-img src="../assets/home_asset1.png"  max-width="50.526315789473685vw"> </v-img>
					</v-col>
					<!-- Check this out col -->
					<v-col class="servicesUnleashedCol">
						<h3 class="servicesUnleashedTitle"> Services Unleashed.</h3>
						<h3 class="serviceUnleashedText">
							Turn your incentives and services into streamlined, forecastable revenue in as little as 5 minutes.
							<br />
							<br />

							Provana.GG is the only no cost, immediate solution that allows you to sell customized, fan-tailored
							engagement through a storefront designed with fans in mind.
							<br />
							<br />

							Just make an account, create a service, and start selling one-of-a-kind stuff through your existing
							channels. :D
						</h3>
						<v-row>
							<v-col @mouseleave="showAboutProvana = false">
								<v-icon class="mr-3"> {{ showAboutProvana ? 'fas fa-minus' : 'fas fa-plus' }}</v-icon>
								<h3
									:class="!showAboutProvana ? 'serviceUnleashedMenu' : 'serviceUnleashedMenuActive'"
									@mouseenter="showAboutProvana = true"
								>
									About provanaGG
								</h3>
								<v-expand-transition>
									<div v-if="showAboutProvana" class="aboutProvanaList">
										<a href="#weDifferent">
											<h3 class="aboutProvanaItem">
												How We're Different
											</h3>
										</a>
										<a href="#storefront">
											<h3 class="aboutProvanaItem">
												Our Platform
											</h3>
										</a>
										<!-- <h3 class="aboutProvanaItem">
											Alpha Partners
										</h3> -->
									</div>
								</v-expand-transition>
							</v-col>
							<v-col @mouseleave="showReachout = false">
								<v-icon class="mr-3"> {{ showReachout ? 'fas fa-minus' : 'fas fa-plus' }}</v-icon>
								<h3
									:class="!showReachout ? 'serviceUnleashedMenu' : 'serviceUnleashedMenuActive'"
									@mouseenter="showReachout = true"
								>
									Reach out
								</h3>
								<v-expand-transition>
									<div v-if="showReachout" class="aboutProvanaList">
										<a>
											<h3 class="aboutProvanaItem">
												Contact
											</h3>
										</a>
										<h3 class="aboutProvanaItem">
											Partnerships
										</h3>
									</div>
								</v-expand-transition>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</div>

			<!-- What is provanaGG -->
			<div id="whatIsProvana" class="sectionDiv snap">
				<v-row class="whiteSectionDiv ma-0">
					<!-- col 1/2 What is PROVANAGG TITLE -->
					<v-col class="whatIsProvanaCol">
						<h1 class="whatIsProvanaHeader"> Why Provana.GG? </h1>
						<!-- Provana list -->
						<ul class="whatIsProvanaList">
								<li class="WhatIsLi">No Waiting.</li>
								<li class="WhatIsLi">No Limitations.</li>
								<li class="WhatIsLi">No Cost.</li>
								<li class="WhatIsLi">Same-Day Payment</li>
						</ul>
					</v-col>
					<!-- col 2/2 Image -->
					<v-col class="whatIsProvanaImageCol">
						<div class="whatIsProvanaImage">
							<v-carousel cycle hide-delimiter height="400">
								<v-carousel-item v-for="(demo, i) in demoPics" :key="i">
									<img :src="demo.src" style="width:39vw;height:auto;" />
								</v-carousel-item>
							</v-carousel>
						</div>
						<h3 class="imageText">Start turning incentives into experiences.</h3>
						<v-btn class="btnCTA" color="primary" @click="makeAccount()"> Make an account</v-btn>
					</v-col>
				</v-row>
			</div>

			<!-- What makes us different? -->
			<!-- <div id="weDifferent" class="card1">
				<div class="weDifferentHeader">
					<h3 class="weDifferentHeaderText">
						There's more to provana.GG than coaching.
					</h3>
					<h3 class="weDifferentHeaderSubText">
						even though we do that better too, lol.
					</h3>
				</div>
				<v-row>
					<v-col>
						<div class="weDifferentImage">
						</div>
					</v-col>
					<v-col>
						<div class="weDifferentListWrapper">
							<h2 class="weDifferentListHeader">
								Create anything you can think of by customizing:
							</h2>
							<ul class="weDifferentList">
								<li>
									Length
								</li>
								<li>
									Amount of buyers
								</li>
								<li>
									Pricing
								</li>
								<li>
									Availability
								</li>
								<li>
									Session Terms
								</li>
								<li>
									Pretty much everything, lol...
								</li>
							</ul>
						</div>
					</v-col>
				</v-row>
			</div> -->

			<!-- Dashboard screenshot -->
			<div id="storefront" class="card1">
				<v-row>
					<!-- col 1/2 dashboard screenshot -->
					<v-col class="dashboardScreenshotCol">
						<v-img class="dashImgArrow" src="../assets/DashArrow-1.png" max-width="105" contain></v-img>
						<h2 class="dashImgTitle">Meet <span class="primary--text">Quaid</span>. He’s a monster.</h2>
						<v-img class="dashImg" src="../assets/ScreenShot_Dashboard.png" max-width="46.145833333333336vw"> </v-img>
						<p class="dashImgParagraph ">
							* site designs may not represent final product.
							<br />
							they are just getting more kick*$$.
						</p>
					</v-col>
					<v-col class="dashboardTitleCol">
						<h1 class="dashboardTitle">
							A dashboard <br />
							for Pro's with
						</h1>
						<h1 class="packedSched">
							packed schedules.
						</h1>
						<div class="dashPinkLine"></div>
						<div class="dashWhiteLine"></div>
						<p class="dashParagraph">
							Managing consultations, sessions, lessons, and fan engagement all from an easy to use dashboard focused on
							optimizing and organizing.
							<br />
							<br />
							Easily interact with buyers through onsite chat, even for sessions with multiple participants.
						</p>
					</v-col>
				</v-row>
			</div>

			<!-- Storefront -->
			<div class="card1">
				<v-row class="storefrontRow">
					<!-- Col 1/2 storefront title -->
					<v-col class="storefrontTitleCol">
						<div class="dedicatedWhiteLine"></div>
						<div class="dedicatedPinkLine"></div>
						<h1 class="storefrontTitle">
							Dedicated <br />
							storefronts for
						</h1>
						<span class="storefrontTitle2"> dedicated fans.</span>
						<p class="storefrontDetails">
							A professional, trusted spot for services. A storefront that allows professionals to get rid of the hustle
							and engage more.
							<br />
							<br />
							Our custom payments solution removes the risk and speeds things up with same day payouts.</p
						>
					</v-col>
					<v-col class="storefrontImgCol">
						<h3 class="storefrontImgText">Focused, Frictionless</h3>
						<v-img
							class="storefrontImg"
							src="../assets/ScreenShot_Storefront.png"
							max-width="46.145833333333336vw"
							contain
						>
						</v-img>
					</v-col>
				</v-row>
			</div>

			<!-- Services Row -->
			<div class="card1">
				<v-row class="storefrontRow">
					<!-- 1/2 Col services image -->
					<v-col class="serviceImageCol">
						<h3 class="serviceImgText">Infinite Possibilities</h3>
						<v-img src="../assets/About-Hexs 32.png" class="serviceHex" max-width="13.020833333333334vw"></v-img>
						<v-img src="../assets/ScreenShot_Services.png" max-width="850" class="serviceImg" contain></v-img>
					</v-col>
					<!-- 2/2 Col services Text -->
					<v-col>
						<h2 class="serviceText"
							>Craft the right incentives <br />
							for <span class="white--text">any audience.</span></h2
						>
						<p class="serviceDetails">
							Customizable sessions allow sellers to create any type of service and keep track of booked sessions.
							<br />
							<br />
							Thought about teaching? One-on-one that sh**talker in chat? Have a group lesson on building rocketships?
							Our storefronts make it easy to sell and engage in creative ways.</p
						>
					</v-col>
				</v-row>
			</div>

			<!-- Alpha Perks -->
			<div class="card2" id="alphaPerks">
				<v-row class="storefrontRow">
					<!-- Col 1/2 alphaPerksText -->
					<v-col>
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
					</v-col>
					<!-- Col 2/2 alphaPerksList -->
					<v-col class="alphaPerksListCol">
						<ul class="alphaPerksList">
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
										class="mt-4 ml-2"
										src="../assets/ProvanaAlphaBadge-02.png"
										max-width="1.0416666666666667vw"
										contain
									></v-img>
								</div>
							</li>
						</ul>
						<div class="alphaPerksLineWhite"></div>
						<div class="alphaPerksLinePink"></div>
					</v-col>
				</v-row>
			</div>
		</v-col>
	</v-row>
</template>

<script>
	import gsap from 'gsap'
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

    gsap.registerPlugin(ScrollTrigger);

	export default {
		data: () => ({
			demoPics: [
				{
					src: require('@/assets/DemoStorefront-01.png'),
				},
				{
					src: require('@/assets/DemoStorefront-02.png'),
				},
				{
					src: require('@/assets/DemoStorefront-03.png'),
				},
				{
					src: require('@/assets/DemoStorefront-04.png'),
				},
			],
			showReachout: false,
			showAlpha: null,
			showEsportsAlpha: null,
			showAboutProvana: false,
		}),
		mounted(){
			gsap.from('.WhatIsLi', {
					scrollTrigger:{
						trigger:'.WhatIsLi',
						start: 'top 90%',
					},
					duration: 0.5,
					opacity: 0,
					scale: 0,
					y: 200,
					ease: 'power1',
					stagger: 0.1,
				})
		},
		methods: {
			makeAccount(){
				this.$store.dispatch('auth/setLoginOverlay',
					{showLogin: !this.showLogin,
					loginTab:'register'}
				) 
			},
			showPartner(e) {
				this.showAlpha = e
			},
			showEsports(e) {
				this.showEsportsAlpha = e
			},
		},
	}
</script>

<style scoped>
	>>>.v-window__prev,
	>>>.v-window__next {
		background: none !important;
	}
	.dashParagraph {
		margin-top: 3vw;
		max-width: 26.041666666666668vw;
		color: #717171;
		font: normal normal 0.9375vw Arboria;
	}
	.storefrontImgText {
		font: normal bold 2.6041666666666665vw Poppins;
	}
	.dashImgTitle {
		font: normal bold 2.6041666666666665vw/2.6041666666666665vw Poppins;
		letter-spacing: -0.13020833333333334vw;
		color: white;
	}
	.dashImgArrow {
		position: absolute;
		top: 4vw;
		z-index: 3;
		left: 8vw;
	}
	.dashImgParagraph {
		margin-left: 8vw;
		max-width: 26.041666666666668vw;
		color: #717171;
		font: normal normal 0.9375vw Arboria;
	}
	.dashboardTitleCol {
		margin-top: 8vw;
		position: relative;
	}
	.dashboardScreenshotCol {
		margin-left: 11.979166666666666vw;
		position: relative;
	}
	.weDifferentList {
		list-style: none;
	}
	.weDifferentList li {
		font: normal 500 1.3020833333333333vw Arboria;
		color: #e8e8e8;
		margin-bottom: 2vw;
	}
	.weDifferentList li:before {
		content: '-';
		text-indent: -1.6vw;
	}
	.weDifferentList li:first-child {
		margin-top: 2vw;
	}
	.weDifferentListWrapper {
		width: 28.645833333333332vw;
		margin-top: 9vw;
		margin-left: 4.5vw;
	}
	.weDifferentListHeader {
		font: normal bold 1.5625vw/1.5625vw Poppins;
	}
	.weDifferentImage {
		width: 50vw;
		height: 35.677083333333336vw;
		background-color: #1e1e1e;
		z-index: -1;
	}
	.weDifferentHeader {
		width: 72.91666666666667vw;
		margin-left: 13.020833333333334vw;
		margin-bottom: -6vw;
		z-index: 3;
		position: relative;
	}
	.weDifferentHeaderText {
		margin-right: auto;
		font: normal bold 4.166666666666667vw/4.166666666666667vw Poppins;
		letter-spacing: -0.20833333333333334vw;
		display: inline;
		z-index: inherit;
	}
	.weDifferentHeaderSubText {
		display: inline;
		font: normal 600 1.5625vw Poppins;
		color: #333333;
	}
	.btnCTA {
		margin-left: 2vw;
	}
	.btnCTA {
		width: 10.15625vw;
		font: normal 700 0.78215vw Poppins;
		letter-spacing: 0px;
		border-radius: 8px;
	}
	.btnCTA:hover {
		color: #fa4b6b;
	}
	.btnCTA.v-btn:hover:before {
		color: #f5f5f5;
		opacity: 1;
	}
	.imageText {
		font: normal 500 1.5625vw Arboria;
		letter-spacing: -0.078125vw;
		display: inline-block;
		color: #111111;
	}
	.whatIsProvanaImage {
		margin-top: 19vw;
		background-color: #111111;
		width: 38.645833333333336vw;
		min-height: 21.5625vw;
		margin-bottom: 5.8125vw;
	}
	.whatIsProvanaImageCol {
		margin-right: 11.979166666666666vw;
		width: 38.645833333333336vw;
		padding: 0;
	}
	.whatIsProvanaList {
		border-left: solid 1px #707070;
		padding-left: 0;
		padding-top: 1vw;
		padding-bottom: 1vw;
	}
	.whatIsProvanaList li {
		font: normal 600 2.6041666666666665vw Poppins;
		letter-spacing: -0.13020833333333334vw;
		color: #111111;
		margin-left: 0.2vw;
		text-indent: 3vw;
	}
	.whatIsProvanaList li::marker {
		content: url('../assets/About-Dash-2.png');
		display: inline block;
		width: 4px;
		height: 21px;
		font-size: 0.4vw;
	}

	.whatIsProvanaHeader {
		color: #717171;
		margin-bottom: 2vw;
		font: normal 600 1.5625vw Poppins;
	}
	.whatIsProvanaCol {
		padding-top: 16.666666666666668vw;
		padding-left: 11.979166666666666vw;
		width: 30.729166666666668vw;
	}
	.serviceUnleashedMenu {
		cursor: pointer;
		display: inline-block;
		width: 15.0625vw;
		font: normal 500 1.5625vw/1vw Poppins;
		vertical-align: bottom;
	}
	.aboutProvanaItem {
		width: 16.0625vw;
		font: normal 500 1.5625vw/1vw Poppins;
		vertical-align: bottom;
		margin-top: 2vw;
		margin-left: 1.5vw;
		letter-spacing: 0;
	}
	a .aboutProvanaItem {
		text-decoration: none;
		color: white !important;
	}
	a .aboutProvanaItem:hover {
		color: #e61b5b !important;
	}
	.serviceUnleashedMenuActive {
		color: #333333;
		display: inline-block;
		width: 15.0625vw;
		font: normal 500 1.5625vw/1vw Poppins;
		vertical-align: bottom;
		cursor: pointer;
	}
	.servicesUnleashedTitle {
		font: normal bold 4.166666666666667vw/4.166666666666667vw Poppins;
		letter-spacing: -0.20833333333333334vw;
		max-width: 36.197916666666664vw;
		margin-bottom: 1vw;
	}
	.servicesUnleashedCol {
		margin-left: 6.25vw;
	}
	.serviceUnleashedRow {
		padding-top: 4.631578947368421vw;
	}
	.serviceUnleashedText {
		font: normal 500 1.0416666666666667vw Arboria;
		color: #e8e8e8;
		width: 29.6875vw;
		margin-bottom: 6vw;
	}
	a {
		text-decoration: none;
	}

	.platformVideo {
		min-width: 50.526315789473685vw;
		min-height: 32vw;
		background-color: #1e1e1e;
	}
	.sectionDiv {
		background-color: #111111;
	}
	.whiteSectionDiv {
		background: white;
		background-image: linear-gradient(
				0deg,
				rgba(17, 17, 17, 1) 0%,
				rgba(255, 255, 255, 0) 10%,
				rgba(255, 255, 255, 0) 50%,
				rgba(255, 255, 255, 0) 85%,
				rgba(17, 17, 17, 1) 100%
			),
			url('../assets/TransparentCamo.png');
		
		height: 64.58333333333333vw;
	}
	.transparentBG {
		background-color: transparent;
	}
	.card1 {
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-image: linear-gradient(0deg, #111111 0%, #11111100 60%, #11111179 80%, #111111 100%),
			url('../assets/_DashboardBG1.png');
		background-color: #111111;
		padding-top: 5.020833333333334vw;
		padding-bottom: 5vw;
		min-height: 51.041666666666664vw;
	}
	.card2 {
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-image: linear-gradient(0deg, #111111 0%, #11111100 60%, #11111179 80%, #111111 100%);
		background-color: #111111;
		padding-top: 5.020833333333334vw;
		padding-bottom: 5vw;
		min-height: 51.041666666666664vw;
	}
	.dashImg {
		transform: perspective(1000px) rotateY(20deg);
	}
	.packedSched {
		color: white;
		font: normal bold 4vw/4vw Poppins;
		letter-spacing: -0.198vw;
	}
	.dashboardTitle {
		color: #b5b0b0;
		font: normal bold 4vw /4vw Poppins;
		letter-spacing: -0.198vw;
	}
	.serviceImageCol {
		position: relative;
	}
	.serviceHex {
		position: absolute;
		z-index: 2;
		right: 0;
		top: -4vw;
	}
	.serviceText {
		font: normal bold 4.166666666666667vw/4.166666666666667vw Poppins;
		color: #b5b0b0;
		letter-spacing: -0.20833333333333334vw;
		margin-bottom: 3vw;
	}
	.serviceDetails {
		font: normal 500 0.9375vw Arboria;
		color: #717171;
	}
	.storefrontTitleCol {
		background-image: url('../assets/Hexs-2.png');
		background-size: contain;
		height: 43.6vw;
		text-align: center;
		position: relative;
		margin-right: -10vw;
	}
	.storefrontRow {
		padding-left: 11.979166666666666vw;
		padding-right: 11.979166666666666vw;
	}
	.storefrontTitle {
		font: normal bold 4vw/4vw Poppins;
		color: #b5b0b0;
		display: inline-block;
		text-align: left;
		margin-top: 2vw;
		z-index: 2;
		position: relative;
	}
	.storefrontTitle2 {
		font: normal bold 4vw/4vw Poppins;
		color: white;
		display: inline-block;
		text-align: left;
		padding-left: 7%;
		z-index: 2;
		position: relative;
	}
	.storefrontDetails {
		font: normal 500 0.9375vw Arboria;
		width: 28.8vw;
		color: #717171;
		display: inline-block;
		text-align: left;
		padding-top: 3%;
		z-index: 2;
		position: relative;
	}
	.storefrontImgText {
		text-align: right;
		letter-spacing: 0.13020833333333334vw;
		font: normal bold 2.6041666666666665vw Poppins;
		color: #333333;
		margin-bottom: 1vw;
	}
	.storefrontImg {
		align-content: start;
		transform: perspective(1000px) rotateZ(4deg) rotateX(10deg);
		box-shadow: 0px 10px 33px -7px #000000, 5px 25px 5px 5px rgba(0, 0, 0, 0);
	}
	.storefrontImgCol {
		margin-top: 6vw;
	}
	.serviceImg {
		width: 41.67vw;
		transform: perspective(1000px) rotateY(15deg) rotateZ(-5deg);
		margin-bottom: 2.6vw;
		box-shadow: 0px 10px 33px -7px #000000, 5px 25px 5px 5px rgba(0, 0, 0, 0);
	}
	.serviceImgText {
		font: normal bold 2.6041666666666665vw Poppins;
		letter-spacing: -0.13020833333333334vw;
		color: #333333;
		margin-top: 4vw;
		margin-bottom: 3vw;
	}
	.alphaPerksTextTop {
		font: normal bold 2.6041666666666665vw/2.6041666666666665vw Poppins;
		letter-spacing: -0.13020833333333334vw;
		color: #333333;
		width: 28.125vw;
		margin-bottom: 1.4vw;
	}
	.alphaPerksDate {
		font: normal bold 1.3020833333333333vw/1.3020833333333333vw Poppins;
		letter-spacing: -0.06510416666666667vw;
		color: #e61b5b;
		margin-top: 2vw;
	}
	.alphaPerksTitle {
		font: normal bold 4.166666666666667vw/4.166666666666667vw Poppins;
		letter-spacing: -0.20833333333333334vw;
		color: white;
	}
	.alphaPerksSubText {
		margin-left: 3.3vw;
		margin-bottom: 1vw;
		letter-spacing: -0.06510416666666667vw;
		font: normal bold 1.3020833333333333vw/1.3020833333333333vw Arboria;
		color: #717171;
	}
	.alphaPerksList {
		list-style: none;
		padding-left: 0.5vw;
	}
	.alphaPerksDash {
		display: inline-block;
	}
	.alphaPerksListText {
		margin-left: 2.9166666666666665vw;
		vertical-align: middle;
		display: inline-block;
		font: normal 600 2.6041666666666665vw/2.3958333333333335vw Poppins;
		letter-spacing: -0.13020833333333334vw;
	}
	.alphaPerksListDiv {
		display: flex;
		align-content: center;
		height: 2.3958333333333335vw;
		margin-bottom: 3.4895833333333335vw;
	}
	.alphaPerksDetails {
		margin-top: 4vw;
		font: normal 500 1.0416666666666667vw Arboria;
		color: #717171;
		width: 28.125vw;
		letter-spacing: 0;
	}
	.alphaPerksListCol {
		position: relative;
	}
	.alphaPerksLineWhite {
		position: absolute;
		border-left: 2px solid #e8e8e8;
		width: 1px;
		height: 32.8125vw;
		top: 1.2vw;
		z-index: 2;
	}
	.alphaPerksLinePink {
		position: absolute;
		border-left: 2px solid #e61b5b;
		width: 1px;
		height: 32.8125vw;
		top: 0;
		left: 1vw;
		z-index: 2;
	}
	.engageBtn {
		margin-bottom: 1vw;
		display: block;
		min-height: 2.6vw;
		width: 12.2vw;
		font: normal 600 1vw Arboria;
		letter-spacing: 0px;
	}
	.engageBtn:hover {
		color: #d4145a;
		background-color: purple;
	}
	.engageBtn.v-btn:hover:before {
		color: #f5f5f5;
		opacity: 1;
	}
	.dedicatedWhiteLine {
		border-left: 3px solid white;
		height: 20vw;
		width: 1px;
		position: absolute;
		margin-left: 2.3vw;
		margin-top: 3vw;
	}
	.dedicatedPinkLine {
		border-left: 3px solid #d4145a;
		height: 14vw;
		width: 1px;
		position: absolute;
		margin-left: 1.4vw;
		margin-top: 6.6vw;
	}
	.dashPinkLine {
		border-bottom: 3px solid #d4145a;
		height: 1px;
		width: 34.3vw;
		margin-left: 1.9vw;
		position: absolute;
	}
	.dashWhiteLine {
		border-bottom: 3px solid white;
		height: 1px;
		width: 33.3vw;
		padding-top: 0.5vw;
		margin-left: 1.9vw;
		position: absolute;
	}
</style>
