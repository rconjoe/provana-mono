<template>
	<div class="serviceContainer">
		<HintButton>
			Here you’ll be able to build out your three best services. We limit sellers to 3 to increase discoverability
			to all our users and ensure everyone’s creating services that are quality experiences for fans. You can
			create and delete services from this page, then navigate to SCHEDULE to place these services on your
			calendar. :D Read up on what we consider best practice for building the perfect services here!
		</HintButton>
		<h1 class="dashHeader" v-if="!$vuetify.breakpoint.mobile"> Services </h1>

		<h2 class="servicesTitle"> Services</h2>

		<transition-group tag="div" class="cardsContainer" @enter="enterService">
			<NewServiceForm v-if="services.length < 3" key="addService" />
			<div class="service" v-for="service in services" :key="service.id">
				<ServiceCard :service="service" />
			</div>
		</transition-group>
	</div>
</template>

<script>
import ServiceCard from './ServiceCard.vue'
import HintButton from '../HintButton.vue'
import NewServiceForm from './NewServiceForm.vue'
import { functions, db } from '../../../plugins/firebase'
import { gsap } from 'gsap'

export default {
	name: 'DashboardService',
	components: { ServiceCard, HintButton, NewServiceForm },
	data: () => ({
		services: [],
	}),
	methods: {
		enterService(el) {
			gsap.from(el, {
				duration: 2,
				opacity: 0,
				ease: 'power1',
			})
		},
	},
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

<style scoped lang="scss">
.serviceContainer {
	position: relative;
	display: grid;
	grid:
		'. b .' 150px
		'. . c' auto
		/ 140px auto 1fr;
}
.dashHeader {
	transform: rotate(-90deg);
	position: absolute;
	font: normal normal bold 100px Poppins;
	color: #1e1e1e;
	left: -180px;
	top: 150px;
}
.hint {
	position: fixed;
	top: 80px;
	right: 12px;

	z-index: 1;
}

.cardsContainer {
	margin-right: 50px;
	flex-wrap: wrap;
	grid-area: c;
	display: flex;
	justify-content: space-between;
}
.service {
	max-width: 355px;
	margin-top: 15px;
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
	grid-area: b;
	font: normal 600 50px Poppins;
	letter-spacing: -2.5px;
	text-align: left;
	align-self: flex-end;
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
@media screen and (max-width: 1400px) {
	.serviceContainer {
		position: relative;
		display: grid;
		grid:
			'.' 75px
			'b' auto
			'c' auto
			/ 1fr;
	}
}
@media screen and (max-width: 900px) {
	.serviceContainer {
		margin: 0;
	}
}
@media screen and (max-width: 685px) {
	.cardsContainer {
		justify-content: space-around;
	}
}
</style>
