<template>
	<div class="underContainer" :style="cssProps">
		<div class="serviceContainer">
			<h1 :style="cssProps"> {{ service.serviceName }}</h1>
			<!-- service picture -->
			<div class="fieldContainer">
				<div class="mt-1">
					<Tooltip> Picture that is relevant to your service </Tooltip>
				</div>
				<span class="label"> Service Picuture: </span>
				<v-img class="serviceImg" src="../../../assets/DemoStorefront-01.png" ratio="16/9" max-width="174">
				</v-img>
			</div>
			<!-- Color -->
			<div class="fieldContainer">
				<div class="mt-1">
					<Tooltip> Service color that will be represented on your calendar when scheduling. </Tooltip>
				</div>
				<span class="label"> Service Color: </span>
				<div class="colorBox align-self-center" :style="cssProps"> {{ service.color }} </div>
			</div>
			<!-- Price -->
			<div class="fieldContainer">
				<div class="d-flex align-content-center ">
					<Tooltip> Price of your service should be rounded to the nearest dollar. </Tooltip>
				</div>
				<span class="label"> Price: </span>
				<div class="value"> ${{ service.serviceCost }} </div>
			</div>
			<!-- Length -->
			<div class="fieldContainer">
				<div class="d-flex align-content-center ">
					<Tooltip> Duration of the event in minutes. </Tooltip>
				</div>
				<span class="label"> Length: </span>
				<div class="value"> {{ service.serviceLength }} min </div>
			</div>
			<!-- Buyers -->
			<div class="fieldContainer">
				<div class="d-flex align-content-center ">
					<Tooltip> Number of poeple who can purchase the same session. </Tooltip>
				</div>
				<span class="label"> Buyers: </span>
				<div class="value"> {{ service.attendees }} </div>
			</div>
			<!-- Software -->
			<div class="fieldContainer">
				<div class="d-flex align-content-center ">
					<Tooltip> Software neccessary to complete the session. Discord, games ,etc.. </Tooltip>
				</div>
				<span class="label"> Software: </span>
				<div class="value"> {{ service.software }} </div>
			</div>
			<!-- Tags -->
			<div class="fieldContainer">
				<div class="d-flex align-content-center ">
					<Tooltip> Improve your searchability with tags. </Tooltip>
				</div>
				<span class="label"> Tags: </span>
				<div class="value">
					<span v-for="tag in service.tags" :key="tag">{{ tag }}, </span>
				</div>
			</div>
			<!-- Terms -->
			<div class="fieldContainer">
				<div class="d-flex align-content-center ">
					<Tooltip> Terms of agreement for this service. </Tooltip>
				</div>
				<span class="label"> Terms: </span>
				<div class="value">
					<span class="link" @click="termsOverlay = !termsOverlay"> View Terms </span>
				</div>
			</div>
			<!-- Description -->
			<div class="fieldContainer">
				<div class="d-flex align-content-center ">
					<Tooltip> Brief summary of the service for the buyer. </Tooltip>
				</div>
				<span class="label"> Description: </span>
				<div class="value">
					<span class="link" @click="descriptionOverlay = !descriptionOverlay"> View Description </span>
				</div>
			</div>
		</div>
		<!-- Terms overlay -->
		<Overlay :overlay="termsOverlay" @close-overlay="termsOverlay = !termsOverlay">
			<p slot="title"> Terms </p>
			<v-list slot="content" class="termsListBox" v-if="service.terms.length > 0">
				<v-list-item v-for="(term, i) in service.terms" :key="i" no-action class=" termsFont pl-1 elevation-3">
					{{ i + 1 }}.<span class="termsItem ml-2">{{ term }} </span>
				</v-list-item>
			</v-list>
		</Overlay>
		<!-- Description Overlay -->
		<Overlay :overlay="descriptionOverlay" @close-overlay="descriptionOverlay = !descriptionOverlay">
			<p slot="title"> Description </p>
			<p slot="content"> {{ service.serviceDescription }}</p>
		</Overlay>
	</div>
</template>

<script>
import Tooltip from '../../Tooltip.vue'
import Overlay from '../../Overlay.vue'
export default {
	components: { Tooltip, Overlay },
	props: ['service'],
	data: () => ({
		termsOverlay: false,
		descriptionOverlay: false,
	}),
	computed: {
		cssProps() {
			return {
				'--serviceColor': this.service.color,
			}
		},
	},
}
</script>

<style scoped lang="scss">
h1 {
	color: var(--serviceColor);
	font: normal 600 30px/30px Poppins;
	letter-spacing: -1.5px;
}
.label {
	color: #666666;
	margin-right: 10px;
	font: normal 500 15px Arboria;
	min-width: 88px;
	max-width: 88px;
}
.value {
	font: normal 600 15px Arboria;
}
.link {
	color: #fa4b6b;
	font: normal 600 15px Arboria;
	text-decoration: underline;
	cursor: pointer;
}
.link:hover {
	color: white;
}
.colorBox {
	width: 174px;
	height: 25px;
	font: normal 500 15px Arboria;
	text-align: center;
	text-transform: uppercase;
	color: black;
	background-color: var(--serviceColor);
}
.serviceContainer {
	min-height: 650px;
	height: 650px;
	padding: 23px;
	display: flex;
	flex-direction: column;
	align-content: flex-end;
	background-color: #222222;
	box-shadow: 0px 4px 6px #111111c9;
}
.underContainer {
	background-color: var(--serviceColor);
	padding-right: 6px;
	padding-bottom: 7px;
}
.fieldContainer {
	margin-top: auto;
	display: flex;
	min-height: 20px;
}
.serviceImg {
	border-radius: 5px;
}
</style>
