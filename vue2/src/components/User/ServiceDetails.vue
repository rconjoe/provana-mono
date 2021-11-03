<template>
	<v-row class="detailsRow">
		<v-col class="detailsCol">
			<!-- serviceName -->
			<h1 class="serviceName"> {{ service.serviceName }} </h1>

			<!-- Row image/info -->
			<v-row class="imageRow">
				<!-- 1/2 service Image -->
				<v-col class="serviceImgCol">
					<v-img
						src="../../assets/ProvanaAlphaBadge-02.png"
						max-width="13.736842105263158vw"
						max-height="140"
					/>
				</v-col>
				<!-- 2/2 service info -->
				<v-col class="serviceInfoCol">
					<h1 class="serviceTerms" @click="termsDialog = !termsDialog"> Session Terms </h1>
					<div class="serviceLengthDiv">
						<span class="serviceLength"> {{ service.serviceLength }}min </span>
						<span class="serviceLength"> ${{ service.serviceCost }} </span>
					</div>
					<h1 class="serviceSoftware"> {{ service.software }} </h1>
				</v-col>
			</v-row>
			<!-- Service description -->
			<h1 class="serviceDescription">{{ service.serviceDescrption }} </h1>
		</v-col>

		<!-- Terms Dialog -->
		<v-dialog width="32.63157894736842vw" v-model="termsDialog">
			<v-card class="sessionDialogCard">
				<div class="termsWrapper">
					<v-list class="termsListBox" v-if="service.terms.length !== 0">
						<v-card-text class="pt-0 poppins-120">
							The following conditions have been set by the seller:
						</v-card-text>
						<v-list-item
							v-for="(term, i) in service.terms"
							:key="i"
							no-action
							class=" termsFont pl-1 elevation-3"
						>
							{{ i + 1 }}.<span class="arboria-100 ml-2">{{ term }} </span>
							<v-spacer> </v-spacer>
						</v-list-item>
					</v-list>
					<v-card-text class="poppins-120 pa-12" v-else> No special Terms have been set.</v-card-text>
				</div>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
export default {
	props: ['service'],
	data: () => ({
		termsDialog: false,
	}),
}
</script>

<style scoped>
.termsWrapper {
	min-height: 15.210526315789474vw;
	padding: 1.0526315789473684vw;
	border-radius: 10px;
	background: #1e1e1e;
	overflow-y: auto;
}
.sessionDialogCard {
	padding: 1.5vw;
	min-height: 18.105263157894736vw;
	background-color: #222222;
	border-radius: 10px;
}
.image-row {
	max-width: 25vw;
	overflow: hidden;
}
.serviceDescription {
	margin-top: 1.5789473684210527vw;
	font: normal 500 0.7894736842105263vw Arboria;
	color: #e8e8e8;
}
.serviceSoftware {
	font: normal 500 0.9473684210526315vw Arboria;
	color: #999999;
}
.serviceTerms {
	font: normal 600 1.3157894736842106vw Poppins;
	letter-spacing: -0.07894736842105263vw;
	margin-bottom: 0.5vw;
	color: #e61b5b;
	cursor: pointer;
}
.serviceLength {
	font: normal 600 1.3157894736842106vw Poppins;
	letter-spacing: -0.07894736842105263vw;
	color: white;
	margin-right: 2vw;
}
.serviceName {
	font: normal 600 1.5789473684210527vw Poppins;
	letter-spacing: -0.07894736842105263vw;
	color: white;
	margin-bottom: 1.3157894736842106vw;
}
.detailsRow {
	min-width: 25vw;
}
</style>
