<template>
	<v-overlay value="true">
		<section id="loginOverlayContainer">
			<v-img src="../../../assets/ProvanaEyes_Footer.png" max-width="266" class="loginEyes" />
			<v-tabs
				v-model="tab"
				hide-slider
				class="mt-10 "
				id="loginTabs"
				:centered="!$vuetify.breakpoint.xs"
				active-class="activeTab"
			>
				<v-tab class="loginTab" href="#login">
					Login
				</v-tab>
				<v-tab class="registerTab" href="#register">Register</v-tab>
				<v-tab class="closeTab pr-0" @click="closeLogin">
					<v-icon size="2rem" color="primary" right> fas fa-times</v-icon>
				</v-tab>
			</v-tabs>
			<v-tabs-items v-model="tab" id="windowRadius">
				<v-tab-item value="login">
					<LoginTab @close-login="closeLogin" />
				</v-tab-item>
				<v-tab-item value="register">
					<RegisterTab @goto-login="gotoLogin" />
				</v-tab-item>
			</v-tabs-items>
		</section>
	</v-overlay>
</template>

<script>
import LoginTab from './LoginTab.vue'
import RegisterTab from './RegisterTab/RegisterTab.vue'
export default {
	components: { LoginTab, RegisterTab },
	props: ['tab'],
	data: () => ({}),
	methods: {
		closeLogin() {
			this.$store.dispatch('auth/setLoginOverlay', { showLogin: false })
		},
		gotoLogin() {
			this.tab = 0
		},
		openLogin() {
			this.$store.dispatch('auth/setLoginOverlay', { showLogin: true, loginTab: 'login' })
		},
		openRegister() {
			this.$store.dispatch('auth/setLoginOverlay', { showLogin: true, loginTab: 'register' })
		},
	},
}
</script>

<style scoped lang="scss">
//
// Deep selector style overides
//
/* v-tabs bar */
::v-deep #loginTabs.theme--dark.v-tabs > .v-tabs-bar {
	background-color: transparent !important;
}
// background-color of tab-item-window
::v-deep .theme--dark.v-tabs-items {
	background-color: transparent;
}

/* v-tab */
.v-tab {
	font: normal 600 2.3rem Poppins;
	letter-spacing: -0.12rem;
	text-transform: none;
}
/* v-window container */
#windowRadius {
	border-radius: 10px;
}
/* v-tab hover */
.theme--dark.v-tabs .v-tab:hover::before {
	opacity: 0;
}
.v-window.item {
	border-radius: 10px;
}
.loginTab {
	background-color: #111111;
	border-top-left-radius: 10px;
}
.activeTab {
	color: #fa4b6b !important;
}
.registerTab {
	border-top-right-radius: 10px;
	background-color: #111111;
	color: #ffffff;
}
.theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) {
	color: #fff;
}
.loginEyes {
	margin-left: auto;
	margin-right: auto;
}

#loginOverlayContainer {
	max-width: min(33.33rem, 100%);
	margin: 10rem auto 0 auto;
}

// XS
@media #{map-get($display-breakpoints, 'xs-only')} {
	/* v-window container */
	#windowRadius {
		border-radius: 0;
	}
	.v-tab {
		font: normal 600 2rem Poppins;
		letter-spacing: -0.12rem;
		text-transform: none;
		padding: 0 8px;
	}
}
</style>
