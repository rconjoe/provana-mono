<template>
	<v-row class="homeRow">
		<h1 class="dashHeader"> Dashboard </h1>
		<v-col>
			<!-- Header Row welcome "Username" -->
			<v-row no gutters>
				<v-col class="welcome">
					<span class="welcomeTitle text-left mb-0"> Welcome, </span>
					<p class="userTitle mb-2" :class="$vuetify.breakpoint.mobile ? 'text-center' : 'text-left '">
						{{ profile.username }}
					</p>
					<div v-if="type === 'creators'">
						<span
							class="storefrontLink  secondary--text pr-5"
							:class="$vuetify.breakpoint.mobile ? 'text-center' : 'text-left'"
						>
							<router-link :to="{ name: 'User', params: { username: profile.username } }">
								View Storefront</router-link
							>
						</span>
						<span class="feedbackLink secondary--text text-left">
							<a @click="gotoServices"> Change Availability </a>
						</span>
					</div>
				</v-col>
			</v-row>

			<!-- Content Row with 2 cols side by side components -->
			<v-row class="calRow">
				<!-- col 1/2 Upcoming sessions Component -->
				<v-col class="upcomingSessions">
					<h2 class="upcomingTitle"> Upcoming Sessions</h2>
					<UpcomingSessions />
				</v-col>
			</v-row>
		</v-col>

		<!-- col 2/2 Session Details Component -->
		<v-col class="postContainer d-flex flex-column justify-start">
			<!-- OLD POSTS COMPONENT -->
			<div class="bioBox d-flex flex-column justify start">
				<SessionDetails v-if="selectedEvent.name" />
			</div>
			<!-- <v-card class="postCard" flat color="transparent">
          <v-card-text class="postTitle mx-auto "> Let your customers know what's up! </v-card-text>
          <div>
            <v-card width="550" color="#333333">
              <v-form ref="form" v-model="form">
                <v-textarea
                  v-model="post"
                  label="Any changes to services? How's life?..."
                  counter
                  maxlength="150"
                  height="200"
                  name="input-7-1"
                  solo
                  width="550"
                  background-color="#333333"
                ></v-textarea>
              </v-form>
            </v-card>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="$refs.form.reset()">
              Clear
            </v-btn>
            <v-btn v-if="!postLoading" text :loading="postLoading" @click="uploadPost" class="white--text" depressed>
              Post
            </v-btn>
            <v-progress-circular indeterminate v-else> </v-progress-circular>
          </v-card-actions>
        </v-card> -->
		</v-col>
	</v-row>
</template>

<script>
import { mapState } from 'vuex'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import SessionDetails from './SessionDetails.vue'
import UpcomingSessions from './UpcomingSessions.vue'
dayjs.extend(isBetween)
dayjs.extend(utc)
dayjs.extend(timezone)

export default {
	name: 'DashboardHome',
	components: { SessionDetails, UpcomingSessions },
	props: ['profile'],

	data: () => ({
		info: '',
		url: '',
		viewingUID: '',
		form: false,
		post: '',
		isLoading: false,
		postLoading: false,
		focus: '',
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
	},
}
</script>

<style scoped>
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
a {
	text-decoration: none;
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
	font: normal bold 5.208vw Poppins;
	top: 11.8vw;
	left: -12vw;
	color: #1e1e1e;
}
.upcomingSessions {
	margin-left: 150px;
	max-width: 31.25vw;
}
.contain {
	margin-left: auto;
	margin-right: auto;
}
.welcome {
	padding-left: 7.8125vw;
	margin-top: 5.208vw;
}
.changeAvail {
	font: normal 600 1.0417vw/1.0417vw Poppins;
	padding-top: 1.5625vw;
	text-align: right;
}
.postContainer {
	padding-top: 8.854vw;
	margin-left: 3vw;
	margin-right: 3vw;
}
.supportLink {
	font: normal 600 1.0417vw/1.0417vw Poppins;
	padding-bottom: 1.0417vw;
	width: 28.6458vw;
	text-align: right;
}
.resetLink {
	max-width: 28.6458vw;
	font: normal 600 1.0417vw/1.8417vw Poppins;
	text-align: right;
}
.postCard {
	max-width: 28.33vw;
	float: right;
}
/* Page Content */
.storefrontLink {
	font: normal normal 600 1.042vw Poppins;

	text-align: center;
}
.feedbackLink {
	font: normal normal 600 1.0417vw Poppins;
}

.checkList {
	font: normal normal 21.0417vw Poppins;
	padding-top: 15.625vw;
	position: absolute;
	max-width: 26vw;
}

.bioBox {
	font: normal normal 1.0417vw Poppins;
	align-content: center;
	width: 100%;
	background-color: transparent;
	margin-top: 1.8223vw;
}

.welcomeTitle {
	font: normal normal 1.302vw Poppins;
	color: #9f9f9e;
	text-align: center;
}

.setupTitle {
	font: normal normal 21.302vw sans-serif;
	color: #9f9f9e;
	padding-top: 14.322vw;
}

.postTitle {
	font: normal 1.0417vw Poppins;
	color: #d4145a;
	padding-top: 1.3020833333333333vw;
	display: block;
}

.userTitle {
	font: normal 600 2.6042vw/2.6042vw Poppins;
	text-align: center;
	letter-spacing: -0.1302vw;
	padding-bottom: 0;
}
.upcomingTitle {
	font: normal normal 600 1.3157894736842106vw/1.3157894736842106vw Arboria;
	padding-bottom: 2.08vw;
	letter-spacing: 0.06578947368421052vw;
}
.sessionTitle {
	font: normal normal bold 3vw Poppins;
	padding-left: 7.8125vw;
}
/* v-cal Day-view lines
MASSIVE collection of border styles to change line colors seperating days. */
.theme--dark.v-calendar-daily {
	background-color: transparent !important;
}
/* blocks for time labels */
>>> .theme--dark.v-calendar-daily .v-calendar-daily__intervals-body {
	border-right: 1px solid #707070;
}

/* outer wrapper around day and times */
.theme--dark.v-calendar-daily {
	border-left: none;
	border-top: none;
}
/* empty block on top of time slots */
>>> .theme--dark.v-calendar-daily .v-calendar-daily__intervals-head {
	border: none !important;
}
/* weird :after style applied to bottom border of empty block */
>>> .theme--dark.v-calendar-daily .v-calendar-daily__intervals-head::after {
	border-bottom: none;
	border-top: none;
	background: none;
}
/* Day block */
>>> .theme--dark.v-calendar-daily .v-calendar-daily_head-day {
	border-right: none;
	border-bottom: 1px solid #333333;
	background-color: transparent !important;
}
>>> div .theme--dark.v-calendar-events .v-event-timed {
	border: none !important;
}
/* day block style */
>>> .theme--dark.v-calendar-daily .v-calendar-daily__day {
	border-right: 1px solid #717171;
	border-bottom: 3px solid #717171;
	background-color: #1e1e1e !important;
}
>>> .theme--dark.v-calendar-daily .v-calendar-daily__day-interval {
	border-top: #333333 1px solid;
}
/* end of day view lines */
/*  */
/*  */
</style>
