<template>
	<!-- Container -->
	<v-row class="containerRow" :style="cssVars">
		<v-col>
			<!-- Header Row -->
			<v-row class="userHeaderRow">
				<v-col class="userHeaderCol">
					<UserHeader :profile="profile" />
				</v-col>
			</v-row>

			<!-- Services row-->
			<v-row class="servicesRow">
				<v-col v-if="services" class=" servicesCol pr-0  ">
					<v-slide-x-transition hide-on-leave>
						<div v-if="servicesVisible" class="servicesDiv" key="services">
							<div class="servicesLeftBarDiv">
								<h1 class="chooseSession"> Choose a session!</h1>
							</div>
							<UserService
								@service-clicked="serviceClicked"
								v-for="service in this.services"
								:key="service.title"
								:service="service"
							/>
						</div>

						<!--Service Selected-->
						<div v-else key="selectedService">
							<UserServiceSelected @show-services="showServices" :service="selectedService" :profile="profile" />
						</div>
					</v-slide-x-transition>
				</v-col>
				<v-col v-else class="servicesCol pr-0 ">
					<p> This User is currently not offering any services.</p>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script>
	import UserHeader from '@/components/User/UserHeader/UserHeader.vue'
	import UserService from '@/components/User/UserService.vue'
	import UserServiceSelected from '@/components/User/UserServiceSelected/UserServiceSelected.vue'
	import { db, storage } from '../plugins/firebase'
	export default {
		name: 'User',
		components: {
			UserHeader,
			UserService,
			UserServiceSelected,
		},
		data: () => ({
			avatarUrl: null,
			servicesVisible: true,
			selectedService: '',
			services: [],
			reviews:[],
			loading: false,
			postData: '',
			profile: {},
			userPostArray: [],
			serviceArray: null,
			sessions: null,
			uid: '',
		}),
		computed: {
			cssVars() {
				return {
					'--bannerUrl': 'url(' + this.profile.banner + ')',
				}
			},
		},
		async mounted() {
			// set profile
			this.profile = this.$store.state.auth.currentUser

			// fetch services
			db.collection('services')
				.where('uid', '==', this.$user.uid)
				.onSnapshot((snap) => {
					snap.forEach((doc) => this.services.push(doc.data()))
				})
		},

		methods: {
			
			showServices() {
				this.servicesVisible = true
			},
			serviceClicked(service) {
				this.servicesVisible = false
				this.selectedService = service
			},
		},
	}
</script>

<style scoped>
	.servicesDiv {
		display: inline-block;
	}
	.chooseSession {
		font: normal 600 1.3020833333333333vw/1.5625vw Poppins;
		letter-spacing: -0.06510416666666667vw;
		color: #333333;
		margin-top: 0.9375vw;
	}
	.servicesRow {
		padding-top: 1.8229166666666667vw;
	}
	.servicesLeftBarDiv {
		max-width: 200px;
		display: inline-block;
		vertical-align: top;
	}
	.avatarBorder {
		border: 3px solid #fa4b6b;
		background-color: #1e1e1ece;
		position: absolute;
		left: 19.7vw;
		top: -7vw;
	}
	.containerRow {
		background-image: linear-gradient(to right, #111111 10%, #11111100 100%),
			linear-gradient(to top, #111111 10%, #11111100 100%), var(--bannerUrl);
		background-size: contain;
		min-height: 50.46875vw;
		background-color: #cccccc;
	}

	.userHeaderRow {
		padding-left: 10.416666666666666vw;
		padding-top: 6.770833333333333vw;
		background-color: transparent;
	}
	.servicesCol {
		margin-right: 10.416666666666666vw;
		margin-left: 10.416666666666666vw;
		height: 22.760416666666668vw;
		background-image: linear-gradient(to left, #11111154 0%, #111111 100%);
	}
	.sellerRow {
		margin-top: 10.520833333333334vw;
	}
	.feedCol {
		max-width: 28.645833333333332vw;
	}
	.reviewsCol {
		padding-top: 100px;
	}
	.slide-enter-active {
		transition: all 0.3s ease;
	}
	.slide-leave-active {
		transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
	}
	.slide-enter, .slide-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
		transform: translateX(10px);
		opacity: 0;
	}

	/* Review Styles */
</style>
