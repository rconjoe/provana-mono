<template>
	<!-- Wrapper div. -->
	<div>
		<!-- Notifications drawer -->
		<v-navigation-drawer class="navDrawer" right fixed v-model="iconActive" color="#1e1e1e">
			<v-list>
				<v-list-item v-for="(item, index) in notifications" :key="index">
					<v-card
						class="mb-1"
						color="#333333"
						width="300px"
						@click=";(item.read = true), item.unread == false"
					>
						<v-card-text class="py-1 d-flex align-center">
							<v-avatar v-if="!item.read" color="primary" size="10px" class="mr-2"></v-avatar>
							<v-avatar v-else color="#1e1e1e" size="10px" class="mr-2"></v-avatar>
							<div class="d-flex flex-column notificationContentDiv">
								<h3 aria-label="notification category">
									<u> {{ item.category }} </u>
								</h3>
								<h4 aria-label="notification message"> {{ item.content }} </h4>
								<h4 style="font-size: 12px"> {{ item.time }} </h4>
							</div>
						</v-card-text>
					</v-card>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<!-- Mobile Nav -->
		<v-navigation-drawer v-model="mobileDrawer" id="mobileDrawer" color="#333" fixed left temporary>
			<v-list dense nav id="mobileNavList">
				<v-list-item link v-if="user" active-class="mobileActive" to="/dashboard">
					<v-list-item-title class="mobileNavTitle">Dashboard</v-list-item-title>
				</v-list-item>

				<div v-for="link in links" :key="link.title">
					<v-list-item link active-class="mobileActive" :to="link.url">
						<v-list-item-title class="mobileNavTitle" active-class="mobileActive">{{
							link.label
						}}</v-list-item-title>
					</v-list-item>
				</div>
			</v-list>
		</v-navigation-drawer>

		<!-- App bar -->
		<v-app-bar app color="#1E1E1E" class="appBar">
			<!-- provana Img -->
			<router-link to="/">
				<v-img class="mx-2" src="@/assets/ProvanaHeaderAnimated.png" max-width="9.333rem" contain></v-img>
			</router-link>
			<v-spacer></v-spacer>

			<!-- navbar -->
			<v-btn-toggle v-if="!$vuetify.breakpoint.xs" borderless>
				<v-btn
					color="#333"
					v-if="user"
					active-class="activeBtn"
					min-width="3.905vw"
					ripple
					elevation="0"
					class="font-weight-light"
					to="/dashboard"
					>Dashboard
				</v-btn>
				<v-btn
					color="#333333"
					v-for="link in links"
					:key="`${link.label}-header-link`"
					active-class="activeBtn"
					min-width="3.905vw"
					ripple
					elevation="0"
					class="font-weight-light"
					:to="link.url"
					>{{ link.label }}
				</v-btn>
			</v-btn-toggle>

			<!-- mobile menu btn -->
			<v-icon
				:color="mobileDrawer ? 'primary' : ''"
				@click="mobileDrawer = !mobileDrawer"
				v-if="$vuetify.breakpoint.xs"
				>fas fa-bars</v-icon
			>

			<!-- notificaiton btn -->
			<v-badge color="secondary" overlap left dot :value="read" v-if="user">
				<v-icon class="icon ml-4" :color="iconActive ? 'primary' : ''" @click="iconActive = !iconActive">
					fas fa-bell
				</v-icon>
			</v-badge>

			<!-- Login/logout -->
			<div class="ml-4">
				<template v-if="!user">
					<LoginBtn @open-login="toggleLoginOverlay" />
				</template>
				<template v-if="user">
					<Logout />
				</template>
			</div>
		</v-app-bar>

		<AlphaPartnerAlert />

		<v-overlay :value="showLogin" opacity=".9" color="#111">
			<LoginOverlay @close-login="toggleLoginOverlay" :tab="loginTab" />
		</v-overlay>
		<!-- DisputDialog -->
		<DisputeDialog v-if="topDispute" :dispute="topDispute" />
	</div>
</template>

<script>
import Login from '@/views/Login.vue'
import Overlay from '@/components/ReusableComponents/Overlay.vue'
import LoginBtn from '@/components/Nav/LoginBtn.vue'
import Logout from '@/components/Nav/Logout.vue'
import DisputeDialog from '@/components/Nav/DisputeDialog.vue'
import LoginOverlay from '../Nav/LoginOverlay/LoginOverlay.vue'
import AlphaPartnerAlert from './AlphaPartnerAlert.vue'
import { mapState } from 'vuex'
export default {
	name: 'CustomAppBar',
	components: { LoginBtn, Logout, DisputeDialog, Overlay, Login, LoginOverlay, AlphaPartnerAlert },
	data: () => ({
		appNavDrawer: false,
		mobileDrawer: false,
		iconActive: false,
		disputeDialog: true,
		loginOverlay: false,
		items: [],
		links: [
			{
				label: 'About Provana',
				url: '/about',
			},
			// {
			// 	label: 'Partnerships',
			// 	url: '/partnerships',
			// },
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
			if (this.notifications.some((e) => e.unread === true && e.read == false)) {
				return true
			} else {
				return false
			}
		},
		topDispute() {
			if (this.$store.state.notifications.disputes.length !== 0) {
				return this.$store.state.notifications.disputes[0]
			} else {
				return ''
			}
		},
		...mapState({
			notifications: (state) => state.notifications.notifications,
			user: (state) => state.auth.currentUser,
			loading: (state) => state.loading.show,
			showLogin: (state) => state.auth.showLogin,
			loginTab: (state) => state.auth.loginTab,
		}),
	},
	mounted() {
		this.$store.dispatch('notifications/bindNotifs')
	},
	methods: {
		toggleLoginOverlay() {
			this.$store.dispatch('auth/setLoginOverlay', { showLogin: !this.showLogin, loginTab: 'register' })
		},
	},
}
</script>

<style scoped>
.mobileActive .v-list-item__title {
	color: #fa4b6b;
}
.mobileNavTitle {
	text-align: right !important;
	font: normal normal 500 1.3rem Arboria !important;
}
.notificationContentDiv {
	max-width: 100%;
	padding-right: 15px;
}
.navDrawer {
	margin-top: 3.3vw;
	z-index: 10;
}
.appBar {
	background-image: url('../../assets/_HeaderHexagons1.png');
}

.v-btn {
	text-transform: none;
	letter-spacing: 0;
}
#navBtnDiv {
	background-color: #333333;
	border-radius: 10px;
}
.notificationIcon {
	margin-right: 1.5vw;
}
.activeBtn {
	color: #fa4b6b !important;
}
::v-deep .v-ripple__container {
	color: white !important;
}
</style>
