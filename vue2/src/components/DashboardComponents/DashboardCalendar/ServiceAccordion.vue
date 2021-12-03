<template>
	<div>
		<v-expansion-panels accordion class="panels" dense>
			<v-expansion-panel
				v-for="(service, i) in services"
				@change="serviceSelect(service)"
				:key="i"
				active-class="activeItem"
				:style="cssVars"
			>
				<v-expansion-panel-header class="serviceHeader" :style="'color:' + service.color">
					{{ service.serviceName }}
				</v-expansion-panel-header>
				<v-expansion-panel-content class="serviceContent">
					<div>
						<span class="label"> Cost: </span>
						<span class="serviceText> "> ${{ service.serviceCost }} </span>
					</div>
					<div>
						<span class="label"> Length: </span>
						<span class="serviceText> "> {{ service.serviceLength }} min </span>
					</div>
					<div>
						<span class="label"> Attendees:</span>
						<span class="serviceText"> {{ service.attendees }} </span>
					</div>
					<div>
						<span class="label"> Description:</span>
						<span class="serviceText"> {{ service.serviceDescription }} </span>
					</div>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
	</div>
</template>

<script>
import { db } from '../../../plugins/firebase'
export default {
	data: () => ({
		services: [],
		selectedService: '',
	}),
	methods: {
		serviceSelect(service) {
			if (this.selectedService !== service) {
				this.selectedService = service
				this.$emit('pass-service', this.selectedService)
			} else {
				this.selectedService = ''
				this.$emit('pass-service', this.selectedService)
			}
		},
	},
	computed: {
		cssVars() {
			return {
				'--tabColor': this.selectedService.color,
			}
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
.label {
	font: normal normal 500 15px Arboria;
	color: #888888;
	margin-right: 10px;
}
.serviceText {
	font: normal noraml 600 15px Arboria;
}
.panels {
	z-index: 0;
	max-height: auto;
}
.serviceHeader {
	font: normal 600 18px Poppins;
	letter-spacing: -0.9px;
	max-height: 50px;
	box-sizing: border-box;
}
.serviceContent {
	border: 3px solid var(--tabColor);
	border-right: none;
	border-top: none;
}
.v-expansion-panel-header--active {
	max-height: 50px;
}
.activeItem .serviceHeader {
	border: 3px solid var(--tabColor);
	border-right: none;
	border-bottom: none;
	border-top-right-radius: 0;
}
@media screen and (max-width: 750px) {
	.activeItem .serviceHeader {
		border-right: 3px solid var(--tabColor);
	}
}
</style>
