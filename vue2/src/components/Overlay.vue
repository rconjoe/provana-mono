<template>
	<v-overlay class="dialogContainer" v-model="dialog">
		<!-- Card Wrapper -->
		<v-card class="outerCard">
			<div class="d-flex flex-column">
				<v-icon class="closeIcon" @click="closeDialog"> fas fa-times </v-icon>
			</div>

			<h3 class="dialogTitle"> <slot name="title"> </slot></h3>
			<div class="innerCard">
				<div class="dialogContentContainer">
					<p class="dialogContent">
						<slot name="content"> </slot>
					</p>
				</div>
			</div>
		</v-card>
	</v-overlay>
</template>

<script>
export default {
	props: ['dialog'],
	data: () => ({}),
	methods: {
		closeDialog() {
			this.$emit('close-dialog')
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
.dialogTitle {
	font: normal 600 30px Poppins;
	letter-spacing: -1.5px;
	color: white;
	margin-left: 55px;
}
.dialogContent {
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
</style>
