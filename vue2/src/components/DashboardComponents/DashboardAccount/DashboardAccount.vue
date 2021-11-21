<template>
	<!--Container Row -->
	<div class="accountContainer">
		<h1 class="dashHeader"> Settings </h1>
		<!-- Main Content Row  with 3 columns -->
		<h1 class="accountTitle"> Account </h1>
		<div class="tipCard">
			<TipCard>
				This information is what’s used to fill out your storefront.
				<br />
				<br />
				Let your buyers know about you through your Tagline and Bio.
				<br />
				<br />
				Have your storefront visitors navigate to your other social media profiles through the Socials links :D
			</TipCard>
		</div>
		<!-- Left Column Content -->
		<div class="accountInfo">
			<AccountInfo :profile="profile" />
		</div>
		<!-- Middle Column Content -->
		<div class="accountSocials">
			<!-- Socials -->
			<AccountSocials
				:twitter="profile.twitter"
				:facebook="profile.facebook"
				:twitch="profile.twitch"
				:youtube="profile.youtube"
				:discord="profile.discord"
			/>
			<!-- TimeZone selection -->
		</div>
		<div class="accountUploads">
			<!-- Avatar/ banner uploads -->
			<AccountUploads :profile="profile" />
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import AccountSocials from './AccountSocials.vue'
import AccountTimezone from './AccountTimezone.vue'
import AccountInfo from './AccountInfo.vue'
import AccountUploads from './AccountUploads.vue'
import TipCard from '../TipCard.vue'
export default {
	name: 'DashboardAccount',
	props: ['profile'],
	components: { AccountSocials, AccountTimezone, AccountInfo, AccountUploads, TipCard },
	data: () => ({
		seller: '',
		uid: '',
		closeOnContentClick: false,
	}),

	async mounted() {
		this.uid = this.$user.uid
		this.avatarUrl = this.profile.avatar
		this.bannerUrl = this.profile.banner
	},
}
</script>

<style scoped lang="scss">
.accountContainer {
	padding-left: 175px;
	display: grid;
	grid-template:
		' a . . . ' auto
		' b c d e ' auto
		' . . . . ' auto
		/ 1fr 1fr 1fr 1fr;

	.accountTitle {
		grid-area: a;
		font: normal 600 50px Poppins;
		letter-spacing: -2.5px;
		color: #ffffff;
		padding-top: 80px;
	}
	.accountInfo {
		grid-area: c;
		max-width: 320px;
	}
	.accountSocials {
		grid-area: d;
		max-width: 270px;
	}
	.accountUploads {
		grid-area: e;
	}
	.tipCard {
		grid-area: b;
		height: auto;
		margin-top: 170px;
		max-width: 250px;
	}
}

.dashHeader {
	transform: rotate(-90deg);
	position: absolute;
	font: normal normal bold 100px Poppins;
	letter-spacing: -5px;
	color: #1e1e1e;
	left: -145px;
	top: 145px;
}
@media screen and (max-width: 1400px) {
	.dashHeader {
		display: none;
	}
	.accountContainer {
		padding-left: 10px;
	}
}
@media screen and (max-width: 1150px) {
	.accountContainer {
		padding-bottom: 60px;
		display: grid;
		grid-template:
			'a .'
			'b c'
			'd e';
		justify-content: space-around;
		.accountSocials,
		.accountUploads {
			margin-top: 60px;
		}
		.tipCard {
			margin-top: 80px;
		}
	}
}
@media screen and (max-width: 650px) {
	.accountContainer {
		padding-bottom: 60px;
		display: grid;
		grid-template:
			'a '
			'b'
			'c'
			'd'
			'e';
		justify-content: space-around;
		.accountSocials,
		.accountUploads {
			margin-top: 60px;
		}
		.tipCard {
			margin-top: 30px;
			margin-bottom: 30px;
		}
	}
}
</style>
