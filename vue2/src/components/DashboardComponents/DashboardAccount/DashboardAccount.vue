<template>
	<!--Container Row -->
	<v-row no gutters class="accountRow">
		<h1 class="dashHeader"> Settings </h1>
		<v-col>
			<!-- Main Content Row  with 3 columns -->
			<h1 class="accountTitle"> Account </h1>
			<v-row class="dashContainer">
				<!-- Left Column Content -->
				<v-col class="leftCol">
					<AccountInfo :profile="profile" />
				</v-col>
				<!-- Middle Column Content -->
				<v-col class="middleCol">
					<!-- Socials -->
					<AccountSocials
						:twitter="profile.twitter"
						:facebook="profile.facebook"
						:twitch="profile.twitch"
						:youtube="profile.youtube"
					/>
					<!-- TimeZone selection -->
					<AccountTimezone :timezoneSelect="this.$store.state.auth.tz" />
				</v-col>
				<v-col class="avatarCol">
					<!-- Avatar/ banner uploads -->
					<AccountUploads :avatar="this.$store.state.auth.currentUser.avatar" :banner="this.$store.state.auth.currentUser.banner"  :avatarUrl="this.$store.state.auth.currentUser.avatar" :bannerUrl="this.$store.state.auth.currentUser.banner" />
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script>
	import AccountSocials from './AccountSocials.vue'
	import AccountTimezone from './AccountTimezone.vue'
	import AccountInfo from './AccountInfo.vue'
	import AccountUploads from './AccountUploads.vue'
	export default {
		name: 'DashboardAccount',
		props: ['profile'],
		components: { AccountSocials, AccountTimezone, AccountInfo, AccountUploads },
		data: () => ({
			seller: '',
			uid: '',
			closeOnContentClick: false,
		}),
		async mounted() {
			this.uid = this.$user.uid
			this.seller = this.avatarUrl = this.profile.avatar
			this.bannerUrl = this.profile.banner
		},
	}
</script>

<style scoped>
	.accountRow {
		display: relative;
		padding-left: 2.5vw;
		padding-top: 5.8vw;
	}

	.dashContainer {
		margin-left: 6vw;
	}
	.contain {
		padding-left: 40%;
	}
	.leftCol {
		margin-right: 2.609375vw;
		max-width: 20.67vw;
	}
	.dashHeader {
		transform: rotate(-90deg);
		position: absolute;
		font: normal normal bold 5.208vw Poppins;
		color: #1e1e1e;
		left: -8.2vw;
		top: 8vw;
	}
	/* Page Content */
	.accountTitle {
		font: normal 600 2.605vw Poppins;
		color: #ffffff;
		padding-left: 4.5vw;
		padding-top: 2.4vw;
	}
	.avatarCol {
		padding-right: 5.208vw;
		padding-left: 5.208vw;
	}
	.middleCol {
		max-width: 19.302vw;
	}
	.edit {
		font: normal normal bold 0.78125vw/0.78125vw Poppins;
		margin-right: 0.9375vw;
		color: #fa4b6b;
		float: right;
	}
</style>
