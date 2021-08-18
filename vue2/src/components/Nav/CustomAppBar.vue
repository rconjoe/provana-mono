<template>
	<!-- Wrapper div. -->
	<div>
		<!-- Notifications drawer -->
		<v-navigation-drawer
			class="navDrawer"
			right
			fixed
			v-model="iconActive"
			color="#1e1e1e"
			
		>
			<v-list>
				<v-list-item v-for="(item, index) in notifications" :key="index">
					<v-card class="notificationCard mb-1" color="#333333" width="300px" @click="item.read = true">
						<v-card-text class="py-1 d-flex align-center">
							<v-avatar v-if="!item.read" color="primary" size="10px" class="mr-2"></v-avatar>
							<v-avatar v-else color="#1e1e1e" size="10px" class="mr-2"></v-avatar>
							<div class="d-flex flex-column notificationContentDiv">
								<h3> notif </h3>
								<h4>{{ item.content }}</h4>
							</div>
						</v-card-text>
					</v-card>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<!-- App bar -->
		<v-app-bar app color="#1E1E1E" class="appBar">
			<template v-slot:img="{ props }">
				<v-img v-bind="props" max-width="1000" max-height="100"></v-img>
			</template>
			<router-link to="/">
				<v-img class="mx-2" src="@/assets/ProvanaHeaderAnimated.png" max-height="80" max-width="140" contain></v-img>
			</router-link>
			<v-spacer />
			<div class="navBtnDiv">
				<v-btn
					v-for="link in links"
					:key="`${link.label}-header-link`"
					active-class="activeBtn"
					min-width="3.905vw"
					ripple
					elevation="0"
					tile
					text
					plain
					class="font-weight-light"
					small
					:to="link.url"
					>{{ link.label }}
				</v-btn>
			</div>
			<v-badge color="secondary" overlap left dot :value="read">
				<v-icon class="mr-4 included" id="bellIcon" :color="iconActive ? 'primary' : ''" @click="iconActive = !iconActive">
					fas fa-bell
				</v-icon>
			</v-badge>
			<div class="logBtnDiv">
				<template v-if="!user">
					<LoginBtn />
				</template>
				<template v-if="user">
					<Logout />
				</template>
			</div>
		</v-app-bar>

		<!-- DisputDialog -->
		<DisputeDialog v-if="topDispute" :dispute="topDispute" />
	</div>
</template>

<script>
	import LoginBtn from '@/components/Nav/LoginBtn.vue'
	import Logout from '@/components/Nav/Logout.vue'
	import DisputeDialog from '@/components/Nav/DisputeDialog.vue'
	import { mapState } from 'vuex'
	export default {
		name: 'CustomAppBar',
		components: { LoginBtn, Logout, DisputeDialog },
		data: () => ({
			appNavDrawer: false,
			iconActive: false,
			disputeDialog: true,
			items: [],
			links: [
				{
					label: 'Dashboard',
					url: '/dashboard',
				},
				{
					label: 'About Provana',
					url: '/#whatIsProvana',
				},
				{
					label: 'Partnerships',
					url: '/partnerships',
				},
				{
					label: 'TOS',
					url: '/tos',
				},
				{
					label: 'Contact',
					url: '/contact',
				},
			],
		}),
		computed: {
			read() {
				if (this.notifications.some((e) => e.unread === true)) {
					return true
				} else {
					return false
				}
			},
			topDispute() {
				return ''
				// this.$store.state.notifications.disputes[0]
			},
			...mapState({
				notifications: (state) => state.notifications.notifications,
				user: (state) => state.auth.currentUser,
				loading: (state) => state.loading.show,
			}),
		},
		mounted() {
			this.$store.dispatch('notifications/bindNotifs')
		},
		methods: {
		
		},
	}
</script>

<style scoped>
	.notificationContentDiv {
		max-width: 100%;
		padding-right: 15px;
	}
	.navDrawer {
		margin-top: 3.3vw;
		z-index: 5;
	}
	.notificationCard {
		min-height: ;
	}
	>>> .theme--dark.v-icon:focus::after {
		color: red;
		opacity: 0;
	}
	.appBar {
		background-image: url('../../assets/_HeaderHexagons1.png');
	}
	.activeDrawer {
		background-color: #d91b5c;
	}
	>>> .appBar .v-btn__content {
		font: normal 400 0.8333vw Poppins;
	}
	>>> .v-btn::before {
		background-color: transparent;
	}

	.v-btn {
		text-transform: none;
		letter-spacing: 0;
	}
	.navBtnDiv {
		background-color: #333333;
		border-radius: 5px;
		margin-right: 1.35vw;
	}
	.notificationIcon {
		margin-right: 1.5vw;
	}
	.activeBtn {
		color: #fa4b6b !important;
		background-color: transparent !important;
	}
	.btnCTA.v-btn:hover::before {
		background-color: #f5f5f5 !important;
		opacity: 1;
	}
	>>> .v-ripple__container {
		color: white !important;
	}
	.logBtnDiv {
		margin-right: 1.829vw;
	}
</style>