<template>
	<v-overlay class="overlayContainer" v-model="overlay">
		<!-- Card Wrapper -->
		<v-card class="outerCard">
			<div class="d-flex flex-column">
				<v-icon class="closeIcon" @click="closeOverlay"> fas fa-times </v-icon>
			</div>

			<h3 class="overlayTitle"> <slot name="title"> </slot></h3>
			<div class="innerCard">
				<div class="overlayContentContainer">
					<p class="overlayContent">
						<slot name="content"> </slot>
					</p>
				</div>
			</div>
			<div class="slotButtons">
				<slot name="buttons"></slot>
			</div>
		</v-card>
	</v-overlay>
</template>

<script>
export default {
	props: ['overlay'],
	data: () => ({}),
	methods: {
		closeOverlay() {
			this.$emit('close-overlay')
		},
	},
}
</script>

<style scoped>
.closeIcon {
	color: #707070;
	justify-content: flex-end;
	margin-right: 25px;
	margin-top: 15px;
}
.overlayTitle {
	font: normal 600 30px Poppins;
	letter-spacing: -1.5px;
	color: white;
	margin-left: 55px;
}
.overlayContent {
	font: normal 500 15px Arboria;
	color: white;
}

.outerCard {
	border-radius: 10px;
	color: #222222;
	max-width: 750px;
	padding-bottom: 60px;
}
.innerCard {
	max-height: 445px;
	min-width: 375px;
	overflow-y: auto;
	margin-top: 25px;
	background-color: #111111;
	padding: 20px;
	margin-left: 55px;
	margin-right: 55px;
	border-bottom-left-radius: 0 !important;
	border-bottom-right-radius: 0 !important;
}
.slotButtons {
	margin-right: 55px;
	margin-top: 55px;
}
</style>
