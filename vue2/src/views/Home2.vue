<template>
	<section class="heroContainer">
		<v-img src="../assets/ProvanaLockup.png" width="300" contain></v-img>
		<h1> Start selling any engagement. </h1>
		<v-img src="../assets/MVP_storefront_1.png" height="560" contain> </v-img>
		<h2> In literally 5 minutes, for free… </h2>
	</section>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.heroContainer {
	display: grid;
	grid-template-areas:
		'provana'
		'h1' 'img'
		'h2';

	background-image: url(../assets/Mainbg_1.png);
	background-size: cover;
	background-attachment: fixed;
	min-height: 100vh;
	h1 {
		font: normal 600 120px/120px Poppins;
		letter-spacing: -6px;
		color: #e61b5b;
		width: 960px;
	}
}
</style>
