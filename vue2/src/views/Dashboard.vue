<template>
	<div>
		<v-row class="pa-0 ma-0">
			<!-- Dashboard nav drawer must sit outside of the column -->
			<!-- Creator and supporter links are set by checking claim then displaying a limited or full list of links -->
			<div cols="1" class=" navDrawerCol">
				<DashboardNavDrawer
					style="height:100%"
					:links="claims.type === 'creators' ? creators : supporters"
					:window="window"
					@update-window="updateWindow"
					:avatar="profile.avatar"
				/>
			</div>
			<!-- Onboard Overlay -->
			<v-overlay :value="this.profile.onboarded !== undefined && this.profile.onboarded === false">
				<OnboardOverlay />
			</v-overlay>

			<!-- Review overlay -->
			<v-overlay :value="reviews.length > 1">
				<Review :review="reviews[0]" />
			</v-overlay>
			<!-- Column wraps all dashboard windows. -->
			<v-col class=" DashCol px-0">
				<!-- Dashboard components are displayed using seperate window-items. We can't loop them because each window has different components. -->
				<v-window v-model="window" v-if="profile !== null" class="dashWindowWrapper">
					<!-- home window-->
					<v-window-item name="DashHomeWindow" class="dashWindow px-0">
						<DashboardHome :profile="profile" @goto-services="updateWindow(2)" />
					</v-window-item>
					<!-- account window -->
					<v-window-item name="DashAccountWindow">
						<DashboardAccount :profile="profile" />
					</v-window-item>

					<!-- storefront window -->
					<v-window-item name="DashServiceWindow" id="services">
						<ServiceCal />
					</v-window-item>

					<!-- services window -->
					<v-window-item name="DashPaymentWindow">
						<DashboardService />
					</v-window-item>

					<!-- contact window -->
					<!-- <v-window-item name="DashContactWindow">
							<dashboard-contact @update-notifications="updateNotifications"></dashboard-contact>
					</v-window-item> -->
				</v-window>
			</v-col>
		</v-row>

		<ChatBox />
	</div>
</template>

<script>
import { db } from '../plugins/firebase'
import { mapState } from 'vuex'
import ChatBox from '@/components/Chat/ChatBox.vue'
import DashboardHome from '../components/DashboardComponents/DashboardHome/DashboardHome.vue'
import DashboardAccount from '@/components/DashboardComponents/DashboardAccount/DashboardAccount.vue'
import ServiceCal from '../components/DashboardComponents/DashboardCalendar/ServiceCal.vue'
import DashboardService from '../components/DashboardComponents/DashboardService/DashboardService.vue'
import DashboardPayments from '@/components/DashboardComponents/DashboardPayments.vue'
import DashboardContact from '@/components/DashboardComponents/DashboardContact.vue'
import DashboardNavDrawer from '@/components/DashboardComponents/DashboardNavDrawer.vue'
import OnboardOverlay from '@/components/DashboardComponents/OnboardOverlay.vue'
import Review from '../components/Review.vue'
import Overlay from '@/components/ReusableComponents/Overlay.vue'

export default {
	name: 'Dashboard',

	components: {
		Review,
		ChatBox,
		DashboardHome,
		DashboardAccount,
		ServiceCal,
		DashboardPayments,
		DashboardContact,
		DashboardNavDrawer,
		OnboardOverlay,
		DashboardService,
		Overlay,
	},

	data: () => ({
		reviews: [],
		drawer: null,
		window: 0,
		onboarded: true,
		id: null,
		supporters: [
			{
				icon: 'fas fa-home',
				text: 'Dashboard',
				value: 0,
			},
			{
				icon: 'fas fa-user',
				text: 'Account',
				value: 1,
			},
			/* { */
			/*   icon: 'fas fa-bell', */
			/*   text: 'Contact', */
			/*   value: 4, */
			/* }, */
		],
		creators: [
			{
				icon: 'fas fa-home',
				text: 'Dashboard',
				value: 0,
			},
			{
				icon: 'fas fa-user',
				text: 'Account',
				value: 1,
			},
			{
				icon: 'far fa-calendar-alt',
				text: 'Schedule',
				value: 2,
			},
			{
				icon: 'fas fa-credit-card',
				text: 'Services',
				value: 3,
			},
			// {
			//   icon: 'fas fa-bell',
			//   text: 'Contact',
			//   value: 4,
			// },
		],
	}),
	computed: {
		notOnboarded() {
			if (this.claims.type === 'creators') {
				if (this.profile.onboarded === false) {
					return true
				}
			} else {
				return false
			}
		},
		...mapState({
			claims: (state) => state.auth.claims,
			profile: (state) => state.auth.currentUser,
		}),
	},
	mounted() {
		db.collection('reviews')
			.where('sellerUid', '==', this.$user.uid)
			.where('rating', '==', null)
			.onSnapshot((querySnapshot) => {
				this.review = []
				querySnapshot.forEach((doc) => {
					const review = {
						reviewDocId: doc.id,
						...doc.data(),
					}
					this.reviews.push(review)
				})
			})
	},
	methods: {
		updateWindow(data) {
			this.window = data
		},
	},
}
</script>

<style scoped>
@media screen and (max-width: 1400px) {
	.dashWindowWrapper {
		padding-left: 12px !important;
	}
}
.dashWindowWrapper {
	background-image: url('../assets/_DashboardBG1.png');
	background-size: cover;
	max-height: auto;
	min-height: 960px;
	box-sizing: border-box;
}
.dashWindow {
	background-color: transparent;
}
.nowrap {
	white-space: nowrap;
}
.mobiNav {
	position: fixed;
	bottom: 10px;
	z-index: 3;
}
.navDrawerCol {
	width: 56px;
}
.dashCol {
	overflow-y: auto;
	min-height: 100vh;
}

.dashCard {
	color: white;
	background-color: transparent;
	min-height: 100vh;
}
.scroll {
	overflow: scroll;
}
</style>
