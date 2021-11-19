<template>
	<v-alert dense dismissible fixed id="alphaAlert" color="primary">
		<h1 class="alphaAlertText">We're looking for alpha partners to give feedback! </h1>
		<v-btn dense class="btnCTA" id="discordBtn" href="https://discord.gg/zJh4RaHk" target="_blank" color="#5865F2">
			join our discord
		</v-btn>
	</v-alert>
</template>

<script>
export default {}
</script>

<style scoped>
#discordBtn {
	color: white;
	align-self: center;
	font: normal 600 0.85vw Arboria;
}
#discordBtn:hover {
	color: #5865f2;
}
.alphaAlertText {
	max-width: 100%;
	vertical-align: middle;
	font: normal 600 1.3rem/1.3rem Arboria;
	letter-spacing: -1px;
	text-transform: none;
	text-align: left;
	display: inline-block;
	margin-right: 1rem;
}
#alphaAlert {
	left: 0;
	position: fixed;
	width: 100%;
	z-index: 10;
}
@media (max-width: 680px) {
	#discordBtn {
		margin-top: 0.8rem;
	}
}
</style>
