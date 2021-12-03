<template>
	<div class="tipContainer">
		<h2 class="tipHeader"> What do I do here? </h2>
		<p class="tipText">
			<slot> </slot>
		</p>
	</div>
</template>

<script>
export default {}
</script>

<style scoped>
.tipContainer {
	height: auto;
	width: 100%;
	background-color: #1e1e1e;
	padding: 30px 24px;
}
.tipHeader {
	font: normal 600 20px Poppins;
	letter-spacing: -1px;
	color: #fa4b6b;
	text-align: center;
	padding-bottom: 15px;
}
.tipText {
	font: normal 500 15px Arboria;
}
</style>
