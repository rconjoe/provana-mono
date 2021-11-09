<template>
	<section class="heroContainer">
		<v-img src="../assets/Provana_Lockup.png" class="logoImg" contain></v-img>
		<div class="heroText">
			<h1 class="heroH1"> Start selling any engagement. </h1>
			<h2 class="heroH2"> In literally 5 minutes, for free… </h2>
		</div>
		<v-img src="../assets/MVP_storefront_1.png" contain class="heroImg"> </v-img>
		<v-btn class="btnCTA homeBtn" color="primary"> Make a free account </v-btn>
	</section>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.heroContainer {
	padding-left: 4%;
	padding-top: 5%;
	display: grid;
	grid-template-rows: [provana] 280px;
	grid-template-areas:
		' provana provana provana provana'
		' h1 h1 img img'
		' .   .  . btn';
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
	width: 960px;
}
.logoImg {
	grid-area: provana;
}
.heroText {
	grid-row: h1;
	grid-column: h1-start / h1-end;
	z-index: 2;
}
.heroImg {
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
	grid-row: h1;
	grid-column: 4;
}
@media (min-width: 1800px) {
	.heroContainer {
		padding-left: 4%;
		padding-top: 5%;
		display: grid;
		grid-template-rows: [provana] 280px;
		grid-template-areas:
			' provana provana provana provana'
			' h1 h1 img img'
			' .   .  . btn';
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
			grid-row: h1;
			grid-column: 4;
			margin-right: 250px;
			margin-bottom: 100px;
			align-self: flex-end;
		}
	}
}

@media screen and (min-width: 1400px) and (max-width: 1800px) {
	.heroContainer {
		padding-left: 4%;
		padding-top: 5%;
		display: grid;
		grid-template-rows: [provana] 280px [h1] 300px;
		grid-template-areas:
			' provana provana provana provana'
			' h1 h1 img img'
			' .   .   btn .';
		background: linear-gradient(0deg, #111111 0%, #03030300 100%), url(../assets/Mainbg_1.png);

		background-size: cover;
		background-position: left;
		min-height: 100vh;
		h1 {
			font: normal 600 100px/90px Poppins;
			letter-spacing: -6px;
			color: #e61b5b;
			width: 960px;
		}
		.logoImg {
			grid-area: provana;
			max-width: 300px;
		}
		.heroText {
			grid-row: h1;
			grid-column: h1-start / h1-end;
			z-index: 2;
		}
		.heroImg {
			max-width: 950px;
			padding-top: 10%;
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
			grid-row: btn;
			grid-column: 3;
			align-self: flex-start;
			justify-items: center;
		}
	}
}
</style>
