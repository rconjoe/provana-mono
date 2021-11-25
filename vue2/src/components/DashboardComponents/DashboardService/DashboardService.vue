<template>
	<div class="serviceContainer">
		<div class="hint">
			<Tooltip height="100px">
				Here you’ll be able to build out your three best services. We limit sellers to 3 to increase
				discoverability to all our users and ensure everyone’s creating services that are quality experiences
				for fans. You can create and delete services from this page, then navigate to SCHEDULE to place these
				services on your calendar. :D Read up on what we consider best practice for building the perfect
				services here!
			</Tooltip>
		</div>
		<h1 class="dashHeader"> Services </h1>

		<h2 class="servicesTitle"> Services</h2>
		<div class="cardsContainer">
			<NewServiceForm />
			<div class="service" v-for="service in services" :key="service.id">
				<ServiceCard :service="service" />
			</div>
		</div>
	</div>
</template>

<script>
import ServiceCard from './ServiceCard.vue'
import Tooltip from '../HintButton.vue'
import NewServiceForm from './NewServiceForm.vue'
import { functions, db } from '../../../plugins/firebase'

export default {
	name: 'DashboardService',
	components: { ServiceCard, Tooltip, NewServiceForm },
	data: () => ({
		services: [],
	}),
	methods: {},
	mounted() {
		db.collection('services')
			.where('uid', '==', this.$user.uid)
			.where('active', '==', true)
			.onSnapshot((snapshot) => {
				this.services = []
				snapshot.forEach((doc) => {
					this.services.push(doc.data())
				})
			})
	},
}
</script>

<style scoped>
.serviceContainer {
	position: relative;
	padding-top: 75px;
}
.dashHeader {
	transform: rotate(-90deg);
	position: absolute;
	font: normal normal bold 100px Poppins;
	color: #1e1e1e;
	left: 80px;
	top: 80px;
}
.hint {
	position: absolute;
	top: 10px;
	right: 0;
	z-index: 1;
}

.cardsContainer {
	display: flex;
	width: 100%;
	height: 100vh;
	justify-content: space-around;
}
.service {
	max-width: 355px;
}
.calSheet {
	padding-left: 4vw;
}
.headerCol {
	max-width: 16.26vw;
}
.containHeader {
	padding-left: 20vw;
}
.servicesTitle {
	font: normal 600 2.6vw/2.6vw Poppins;
	width: 11.25vw;
	margin-bottom: 1vw;
	letter-spacing: -0.13020833333333334vw;
}
.serviceRow {
	position: relative;
	min-height: 51.041666666666664vw;
	padding-top: 4vw;
	margin-left: 9.114583333333334vw;
}
.calCol {
	margin-left: 5.8vw;
}
.calTitle {
	font: normal bold 1.56vw Poppins;
}
.dashHeader {
	transform: rotate(-90deg);
	position: absolute;
	font: normal bold 5.2vw Poppins;
	color: #1e1e1e;
	margin-left: -14.4vw;
	margin-top: 3vw;
}
</style>
