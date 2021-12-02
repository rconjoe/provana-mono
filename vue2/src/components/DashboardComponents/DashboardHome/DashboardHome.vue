<template>
	<div class="dashHomeContainer">
		<h1 class="dashHeader" v-if="!$vuetify.breakpoint.mobile"> Dashboard </h1>
		<!-- Header Row welcome "Username" -->
		<div class="homeHeader">
			<h3 class="welcomeTitle text-left mb-0"> Welcome, </h3>
			<p class="userTitle mb-2">
				{{ profile.vanity }}
			</p>
			<div v-if="type === 'creators'">
				<h3 class="Link ">
					<router-link class="link" :to="{ name: 'User', params: { username: profile.username } }">
						View Storefront
					</router-link>
				</h3>
				<h3 class="link">
					<a @click="gotoServices"> Change Availability </a>
				</h3>
			</div>
		</div>
		<HelpButton>
			Your Dashboard is a quick glance at what’s coming up. Under Upcoming Sessions, you can see all upcoming and
			underway sessions, the details, and participants.
			<br />
			<br />
			Make sure to keep up with buyers through our onboard chat system, letting them know about what they may need
			to have ready and hype them up :D
		</HelpButton>
		<!-- Content Row with 2 cols side by side components -->
		<!-- col 1/2 Upcoming sessions Component -->
		<div class="upcomingDiv">
			<div class="upcomingSessions">
				<h2 class="upcomingTitle"> Upcoming Sessions</h2>
				<UpcomingSessions />
			</div>
			<transition tag="div" class="sessionDetails" @enter="detailsEnter">
				<div ref="sessionDeets" class="sessionDetails" v-if="selectedEvent.name">
					<SessionDetails />
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { gsap } from 'gsap'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import SessionDetails from './SessionDetails.vue'
import UpcomingSessions from './UpcomingSessions.vue'
import HelpButton from '../HintButton.vue'
dayjs.extend(isBetween)
dayjs.extend(utc)
dayjs.extend(timezone)

export default {
	name: 'DashboardHome',
	components: { SessionDetails, UpcomingSessions, HelpButton },
	props: ['profile'],

	data: () => ({
		isLoading: false,
		postLoading: false,
		sessions: [],
		selectedElement: null,
		sessionToolTip: false,
	}),
	computed: mapState({
		selectedEvent: (state) => state.dashboard.selected.session,
		type: (state) => state.auth.claims.type,
	}),
	methods: {
		gotoServices() {
			this.$emit('goto-services')
		},
		isEmpty(obj) {
			return Object.keys(obj).length === 0
		},
		detailsEnter() {
			gsap.from(this.$refs.sessionDeets, {
				opacity: 0,
				duration: 0.5,
				x: '-700px',
				ease: 'power2',
			})
		},
	},
}
</script>

<style scoped lang="scss">
.dashHomeContainer {
	position: relative;
	display: grid;
	grid-template-columns: 175px 350px 12fr 1fr;
	grid-template-rows: 80px auto auto 1fr;
	grid-template-areas:
		'. . . .'
		'. a b .'
		'. c b .'
		'. . . .';

	// a = header with links
	// b = upcoming sessions
	// c = what do i do here
	.homeHeader {
		grid-area: a;
		grid-column: 2 / 3;
	}
	.upcomingDiv {
		z-index: 1;
		margin-top: 125px;
		display: grid;
		grid-row: 1 / -1;
		grid-template-columns: 1fr 1fr;
		grid-template-areas: 'a1 b1';
		grid-area: b;

		.upcomingTitle {
			font: normal normal 600 30px Arboria;
			padding-bottom: 20px;
			letter-spacing: 1.5px;
			display: inline-block;
			color: #666666;
		}
		.upcomingSessions {
			grid-area: a1;
			z-index: 1;
		}
		.sessionDetails {
			grid-area: b1;
			z-index: 0;
		}
	}
	.tipCard {
		grid-area: c;
		grid-row: 2;
		max-width: 268px;
		margin-right: 10px;
		margin-top: 230px;
	}
}
.toolTip {
	padding: 1vw;
	position: relative;
	margin-left: 10px;
	background-color: #111111ef;
}
.toolTip::after {
	content: '';
	position: absolute;
	top: 10%;
	right: 100%;
	margin-top: -5px;
	border-width: 8px;
	border-style: solid;
	border-color: transparent #111111ef transparent transparent;
}
.calRow {
	padding-left: 2.6vw;
	padding-top: 1.5vw;
}
.link a {
	text-decoration: none;
	color: #ed2970;
	text-align: left;
}
a:hover {
	color: #ffffff;
}
.homeRow {
	position: relative;
}
.text-h5 {
	font-size: 1rem !important;
}

.calPush {
	padding-top: 1.302vw;
}
.dashHeader {
	transform: rotate(-90deg);
	position: absolute;
	font: normal bold 100px Poppins;
	letter-spacing: -5px;
	top: 205px;
	left: -215px;
	color: #1e1e1e;
}
.link {
	font: normal normal 600 20px Poppins;
	letter-spacing: -1px;
	text-align: left;
	text-decoration: none;
	color: #ed2970;
	text-align: left;
}

.welcomeTitle {
	font: normal 300 25px/50px Arboria;
	color: #9f9f9e;
	text-align: left;
}
.userTitle {
	font: normal 600 50px/45px Poppins;
	text-align: left;
}

@media screen and (max-width: 1550px) {
	.dashHomeContainer {
		display: grid;
		grid-template-columns: 150px 250px 12fr 20px;
		grid-template-rows: 80px 1fr 250px;
		grid-template-areas:
			'. . . .'
			'. a b .'
			'. a b .'
			'. c b .'
			'. c b .'
			'. . . .';
	}
}
@media screen and (max-width: 1400px) {
	.dashHomeContainer {
		padding-left: 10px;
		padding-right: 10px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 50px auto auto 1fr;
		column-gap: 20px;
		grid-template-areas:
			'. .'
			'a c '
			'b b'
			'. .';
		.homeHeader {
			justify-self: left;
			grid-column: a;
		}

		.upcomingDiv {
			margin-top: 20px;
			margin-bottom: 50px;
		}
	}
}
@media screen and (max-width: 1055px) {
	.dashHomeContainer {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 40px auto;
		grid-template-areas:
			'. '
			'a'
			'c'
			'b'
			'. ';
		.homeHeader {
			margin-bottom: 20px;
		}

		.upcomingDiv {
			margin-top: 20px;
			grid-template-columns: 1fr;
			grid-template-areas:
				'a1'
				'b1';
		}
	}
}
@media screen and (max-width: 600px) {
	.userTitle {
		font: normal 600 30px/35px Poppins;
		text-align: left;
	}
}
</style>
