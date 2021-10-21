<template>
	<v-alert dense dismissible fixed id="alphaAlert" color="primary" >
		<h1 class="alphaAlertText">we're looking for alpha partners to give feedback! </h1>
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
		font: normal 600 .85vw Arboria;
        height: 1.5vw;
	}
	#discordBtn:hover {
		color: #5865f2;
	}
	.alphaAlertText {
		vertical-align: middle;
		font: normal 600 .85vw Arboria;
		letter-spacing: -0.005125vw;
		text-transform: none;
		display: inline-block;
		margin-right: 2vw;
	}
	#alphaAlert {
		position:fixed ;
		width:100%;
		margin-top: 60px;
		z-index:2;
	}
</style>
