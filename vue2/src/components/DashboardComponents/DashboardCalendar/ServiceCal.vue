<template>
	<div class="scheduleContainer">
		<div class="hint">
			<HintButton>
				Select a service and then click anywhere on the calendar to populate your availability!
				<br />
				<br />

				Don’t forget to click SAVE AVAILABILITY once you’re done setting your schedule! Read up on what we
				consider best practice for building the perfect services here!
			</HintButton>
		</div>
		<h2 class="storefrontTitle"> Storefront</h2>
		<h1 class="dashHeader" v-if="!$vuetify.breakpoint.mobile"> Storefront </h1>
		<div class="accordion">
			<ServiceAccordion @pass-service="setSelectedService" />
		</div>
		<v-date-picker color="secondary" width="100%" v-model="focus" class="datepicker mt-4"></v-date-picker>
		<v-btn class="btnCTA saveBtn " color="primary" @click="saveAvailability" :loading="potentialLoading">
			save availability
		</v-btn>
		<v-sheet class="calSheet" height="100%" color="transparent">
			<v-calendar
				id="proCal"
				:interval-height="$vuetify.breakpoint.width <= 1400 ? '30px' : '15px'"
				:interval-format="intervalFormat"
				interval-minutes="15"
				interval-count="96"
				ref="calendar"
				v-model="focus"
				:events="event"
				:type="$vuetify.breakpoint.width <= 950 ? 'day' : $vuetify.breakpoint.width <= 1400 ? '4day' : 'week'"
				color="secondary"
				:event-color="getEventColor"
				@click:event="showEvent"
				@click:more="viewDay"
				@click:date="viewDay"
				@click:time="createPotentialSession"
				@click:day="viewDay"
				:day-format="weekdayFormat"
				:weekday-format="dateFormat"
				:style="cssVars"
			>
				<template v-slot:event="{ event, start }">
					<div v-if="start" class="eventCard">
						<h3 class="pt-0 white--text text-truncate eventName">
							{{ event.name }}
						</h3>
						<v-icon v-if="event.status == 'booked'" size="15px" color="black" class="bookedIcon">
							fas fa-dollar-sign
						</v-icon>
					</div>
				</template>
			</v-calendar>

			<!--ToolTip -->
			<v-menu v-model="sessionTooltip" :close-on-content-click="false" :activator="selectedElement" offset-x flat>
				<v-card class="toolTip" min-width="250px" elvation="0">
					<v-window v-model="toolTipWindow">
						<v-window-item>
							<!-- tooltip  Content-->
							<div>
								<h3 class="toolTipTitle">
									{{ selectedEvent.name }}
								</h3>
								<!-- Delete icon if booked opens dialog -->
								<v-icon
									v-if="selectedEvent.status === 'booked'"
									color="#272727"
									icon
									@click="deleteDialog = true"
									size="20px"
									class="bookedIcon"
								>
									fas fa-trash
								</v-icon>
								<v-icon
									v-else
									color="#272727"
									icon
									@click="toolTipWindow = 1"
									size="20px"
									class="bookedIcon"
								>
									fas fa-trash
								</v-icon>
								<br />
								<h3 class="toolTipTime"> {{ startDate }}</h3>
								<h3 class="toolTipTime">{{ startTime }} - {{ endTime }} </h3>
								<v-card-actions class="pl-0">
									<v-btn class="pl-0" text color="secondary" @click="sessionTooltip = false">
										Close
									</v-btn>
								</v-card-actions>
							</div>
						</v-window-item>
						<!-- window 1 deletion window -->
						<v-window-item>
							<v-card-title class="text-h5 dark">
								Are you sure?
							</v-card-title>
							<v-card-actions>
								<v-btn @click="toolTipWindow = 0" color="secondary" text>
									Back
								</v-btn>
								<v-spacer></v-spacer>
								<v-btn @click="deleteSession" :loading="deleteUnbookedLoading" color="warning" text>
									Delete
								</v-btn>
							</v-card-actions>
						</v-window-item>
					</v-window>
				</v-card>
			</v-menu>
			<!-- Deletion Dialog -->
			<v-dialog v-model="deleteDialog" width="500">
				<v-card>
					<v-card-title class="text-h5 dark">
						Delete Session?
						<br />
						{{ selectedEvent.name }} {{ startDate }} @ {{ startTime }} - {{ endTime }}?
					</v-card-title>
					<v-card-text>
						To confirm you want to delete this session please type the name of the session exactly into the
						form to enable the delete button.
						<v-text-field single-line v-model="deleteString"></v-text-field>
						<h3>This action is irrevesible!</h3>
					</v-card-text>
					<v-divider></v-divider>
					<v-card-actions>
						<v-btn color="primary" text @click="closeDeleteDialog">
							Close
						</v-btn>
						<v-spacer></v-spacer>
						<v-btn color="primary" :disabled="deleteString !== selectedEvent.name" @click="deleteBooked">
							Delete
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-sheet>
	</div>
</template>

<script>
import { functions, db } from '@/plugins/firebase'
import { formatter } from '../../../plugins/sessionFormatter'
import ServiceAccordion from './ServiceAccordion.vue'
import HintButton from '../HintButton.vue'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

export default {
	name: 'ServiceCal',
	components: { ServiceAccordion, HintButton },
	data: function() {
		return {
			selectedService: '',
			popupState: false,
			serviceList: [],
			dataLoaded: false,
			name: 'ServiceCal',
			sellerUid: '',
			value: '',
			focus: '',
			selectedEvent: {},
			selectedElement: null,
			sessionTooltip: false,
			event: [],
			slots: [],
			availableSessionArr: [],
			bookedSessionArr: [],
			potentialSessions: [],
			potentialLoading: false,
			deleteBookedCheckbox: false,
			deleteUnbookedLoading: false,
			toolTipWindow: 0,
			deleteDialog: false,
			deleteString: '',
			overlapChk: false,
		}
	},
	computed: {
		startTime() {
			const start = this.selectedEvent.start
			let time = dayjs(start).format('h:mma')
			return time
		},
		endTime() {
			const start = this.selectedEvent.end
			let time = dayjs(start).format('h:mma')
			return time
		},
		startDate() {
			const start = this.selectedEvent.end
			let time = dayjs(start).format('MM/YY')
			return time
		},
		cssVars() {
			if (this.selectedService) {
				return {
					'--serviceColor': this.selectedService.color,
				}
			} else {
				return { '--serviceColor': 'transparent' }
			}
		},
	},
	async mounted() {
		const query = db.collection('sessions').where('sellerUid', '==', this.$user.uid)
		query.onSnapshot((querySnapshot) => {
			this.event = []
			querySnapshot.forEach((doc) => {
				const data = doc.data()
				const session = {
					name: data.name,
					color: data.color,
					serviceColor: data.serviceColor,
					start: formatter(data.start),
					end: formatter(data.end),
					status: data.status,
					participants: data.participants,
					buyerUid: data.buyerUid,
					slots: data.slots,
					parentSession: data.parentSession,
					sellerUid: data.sellerUid,
					serviceDocId: data.serviceDocId,
					id: data.id,
				}
				this.event.push(session)
			})
			this.potentialSessions.forEach((session) => {
				this.event.push(session)
			})
		})
	},

	methods: {
		setSelectedService(service) {
			this.selectedService = service
		},
		async deleteBooked() {
			const cancelBookedSession = functions.httpsCallable('cancelSession')
			await cancelBookedSession({
				id: this.selectedEvent.id,
			}).catch((err) => {
				this.setError(true, err.message, 'red', 'fas fa-alert')
			})
			this.setError(true, `Session id#${this.selectedEvent.id} successfully cancelled.`, 'green', 'fas fa-check')

			this.deleteString = ''
			this.deleteDialog = false
		},
		closeDeleteDialog() {
			this.deleteString = ''
			this.deleteDialog = false
		},
		intervalFormat(time) {
			const djs = dayjs(`${time.date} ${time.time}`).format('L LT')
			const formatted = dayjs(djs).format('h A')
			return formatted
		},
		dateFormat(time) {
			return dayjs(time.date).format('M/DD - ddd')
		},
		weekdayFormat(time) {
			return ''
		},
		viewDay({ date }) {
			this.focus = date
			this.type = 'week'
		},
		getEventColor(event) {
			return event.color
		},
		setToday() {
			this.focus = ''
		},
		prev() {
			this.$refs.calendar.prev()
		},
		next() {
			this.$refs.calendar.next()
		},
		showEvent({ nativeEvent, event }) {
			const open = () => {
				this.toolTipWindow = 0
				this.selectedEvent = event
				this.selectedElement = nativeEvent.target

				requestAnimationFrame(() => requestAnimationFrame(() => (this.sessionTooltip = true)))
			}
			if (this.sessionToolTip === true) {
				this.sessionToolTip = false
				requestAnimationFrame(() => requestAnimationFrame(() => open()))
			} else {
				open()
			}
			nativeEvent.stopPropagation()
		},
		setError(show, message, color, icon) {
			this.$store.commit('error/SET_ERROR', {
				show: show,
				message: message,
				color: color,
				icon: icon,
			})
		},
		async createPotentialSession(time) {
			if (this.selectedService) {
				const startMinute = this.round(time.minute)
				const formattedStartTime = dayjs(
					`${time.year}-${time.month}-${time.day} ${time.hour}:${startMinute}`
				).format('YYYY-MM-DD HH:mm')
				const unixStartTime = dayjs(formattedStartTime).unix()
				const formattedEndTime = dayjs(formattedStartTime)
					.add(this.selectedService.serviceLength, 'minute')
					.format('YYYY-MM-DD HH:mm')
				const unixEndTime = dayjs(formattedEndTime).unix()
				const startOverlap = this.event.some((session) => {
					return dayjs(formattedStartTime).isBetween(session.start, session.end, null, '[]')
				}, formattedStartTime)
				const endOverlap = this.event.some((session) => {
					return dayjs(formattedEndTime).isBetween(session.start, session.end, null, '[]')
				}, formattedEndTime)
				if (startOverlap === true || endOverlap === true) {
					return this.setError(true, 'You cannot book overlapping sessions.', 'warning', 'fas fa-exclamation')
				} else if (dayjs(formattedStartTime).isBefore(dayjs())) {
					return this.setError(
						true,
						'You can not set a session in the past',
						'red',
						'fas fa-exclamation-circle'
					)
				} else if (dayjs(formattedStartTime).isAfter(dayjs().add(6, 'day'))) {
					return this.setError(
						true,
						'You can not set a session more than 6 days in the future',
						'red',
						'fas fa-exclamation-circle'
					)
				} else {
					this.writePotentialSession(unixStartTime, unixEndTime)
				}
			} else {
				return this.setError(true, 'You must select a service first.', 'red', 'fas fa-exclamation-circle')
			}
		},
		async writePotentialSession(unixStartTime, unixEndTime) {
			const newSessionDoc = db.collection('sessions').doc()
			const potentialSession = {
				name: this.selectedService.serviceName,
				slots: this.selectedService.attendees,
				mandatoryFill: this.selectedService.mandatoryFill,
				color: 'grey',
				serviceColor: this.selectedService.color,
				start: unixStartTime,
				end: unixEndTime,
				sellerUid: this.$user.uid,
				serviceDocId: this.selectedService.id,
				status: 'potential',
				id: newSessionDoc.id,
			}
			await newSessionDoc.set({ ...potentialSession })
		},
		async saveAvailability() {
			// TODO: disable the button until this is done doing its thing so you can't double click impatiently
			this.potentialLoading = true
			const publishPotentials = functions.httpsCallable('publishPotential')
			await publishPotentials({ uid: this.$user.uid }).then(() => {
				this.potentialLoading = false
			})
		},
		// rounds to nearest 15 minute FUCK
		round(minute) {
			let rounded
			if (minute >= 7.5 && minute <= 22.5) {
				rounded = 15
			} else if (minute > 22.5 && minute <= 37.5) {
				rounded = 30
			} else if (minute > 37.5 && minute <= 52.5) {
				rounded = 45
			} else {
				rounded = 0
			}
			return rounded
		},
		getEventColor(event) {
			return event.color
		},

		async deleteSession() {
			this.deleteUnbookedLoading = true
			const ses = await db.collection('sessions').doc(this.selectedEvent.id)
			const slots = await ses.collection('slots').get()
			slots.forEach(async (slot) => await slot.ref.delete())
			await ses.delete().then(() => {
				this.deleteUnbookedLoading = false
				this.sessionTooltip = false
				this.toolTipWindow = 0
				this.selectedEvent = {}
			})
		},
	},
}
</script>

<style scoped lang="scss">
.scheduleContainer {
	display: grid;
	position: relative;
	grid:
		'. a s .' auto
		'. b c .' auto
		'. d c .' 1fr
		'. . . .' 60px
		/ 130px minmax(auto, 300px) auto 100px;
	.storefrontTitle {
		grid-area: a;
		font: normal normal 600 50px Poppins;
		letter-spacing: -2.5px;
		max-width: 300px;
		padding-top: 75px;
	}
	.saveBtn {
		grid-area: s;
		align-self: flex-end;
	}
	.accordion {
		grid-area: b;
		max-width: 300px;
		margin-top: 27px;
	}
	.datepicker {
		grid-area: d;
		align-self: flex-end;
	}
	.calSheet {
		grid-row: 2/3;
		grid-area: c;
	}
}
@media screen and (max-width: 1400px) {
	.scheduleContainer {
		display: grid;
		grid:
			'a s ' auto
			'b c ' auto
			'd c ' 1fr
			' . .' 60px
			/ minmax(auto, 300px) auto;
	}
}
@media screen and (max-width: 750px) {
	.scheduleContainer {
		display: grid;
		grid:
			'a' auto
			'b' auto
			'd' auto
			's' auto
			'c' auto
			'.' 60px
			/ 1fr;
		.saveBtn {
			width: 100% !important;
			margin-top: 30px;
		}
		.accordion {
			max-width: 100%;
		}
	}
}
.saveBtn {
	margin-left: auto;
}
.dashHeader {
	transform: rotate(-90deg);
	position: absolute;
	font: normal normal bold 100px Poppins;
	color: #1e1e1e;
	left: -230px;
	top: 180px;
}
.hint {
	position: absolute;
	top: 0;
	right: 0;
	z-index: 1;
}
::v-deep .v-calendar-daily__intervals-head {
	width: 72px !important;
}
/* Past days bg */
::v-deep #proCal.theme--dark.v-calendar-daily .v-calendar-daily__day.v-past {
	background-color: #111111 !important;
}
::v-deep #proCal.theme--dark.v-calendar-daily .v-calendar-daily__day.v-past .v-calendar-daily__day-interval {
	border-top: 1px solid #111111;
}
/* calendar background removal */
::v-deep #proCal.theme--dark.v-calendar-daily .v-calendar-daily__day {
	background-color: transparent !important;
}
/* calendar scrollable area border */
::v-deep .v-calendar-daily__scroll-area {
	border: 3px solid var(--serviceColor);
}
/* datepicker date outline */
::v-deep .datepicker .v-btn--outlined {
	border: none;
}
/* datepicker background color */
::v-deep .theme--dark.v-picker__body {
	background-color: transparent;
}
::v-deep .datepicker .v-btn__content {
	font: normal normal 15px Arboria;
}
/* datepicker title  */
::v-deep .v-picker__title {
	display: none;
}
::v-deep .datepicker .v-btn.v-btn--active {
	opacity: 0.9;
}
::v-deep .datepicker .v-btn.v-btn--rounded {
	height: 25px;
	width: 25px;
}
.datepicker {
	max-height: 250px;
}
.datePickerCol {
	max-width: 230px;
	margin-top: 30px;
}
/* background color behind time */
::v-deep .v-calendar-daily__intervals-body {
	background-color: #1e1e1e;
	min-width: 70px;
}
/* weekday header text */
::v-deep .v-calendar-daily_head-weekday {
	font: normal 500 15px Poppins;
	letter-spacing: -0.75px;
}
/* Removal of date header row */
::v-deep .v-calendar-daily_head-day-label {
	display: none;
}

.slotBuyer {
	font: normal 600 15px Poppins;
}
.slotListItem:hover {
	background-color: #1e1e1e;
	border-radius: 5px;
}
.slotItemText {
	font: normal 500 15px Arboria;
	display: inline-block;
}
.slotItemTime {
	margin-right: 20px;
	font: normal 600 15px Poppins;
}
.slotItemTitle {
	font: normal 600 15px Poppins;
}
.v-calendar-daily__pane {
	overflow: none;
}

::v-deep .v-calendar-daily__scroll-area {
	overflow-y: scroll !important;
	top: 300px;
}
/* v-cal Day-view lines
MASSIVE collection of border styles to change line colors seperating days. */
.theme--dark.v-calendar-daily {
	background-color: transparent !important;
}
/* blocks for time labels */
::v-deep .theme--dark.v-calendar-daily .v-calendar-daily__intervals-body {
	border-right: 1px solid #707070;
}

/* outer wrapper around day and times */
.theme--dark.v-calendar-daily {
	border-left: none;
	border-top: none;
}
/* empty block on top of time slots */
::v-deep .theme--dark.v-calendar-daily .v-calendar-daily__intervals-head {
	border: none !important;
}
/* weird :after style applied to bottom border of empty block */
::v-deep .theme--dark.v-calendar-daily .v-calendar-daily__intervals-head::after {
	border-bottom: none;
	border-top: none;
	background: none;
}
/* Day block */
::v-deep .theme--dark.v-calendar-daily .v-calendar-daily_head-day {
	border-right: none;
	border-bottom: 1px solid #333333;
	background-color: transparent !important;
}
::v-deep div .theme--dark.v-calendar-events .v-event-timed {
	border: none !important;
}
/* day block style */
::v-deep .theme--dark.v-calendar-daily .v-calendar-daily__day {
	border-right: 1px solid #717171;
	border-bottom: 3px solid #717171;
	background-color: #1e1e1e !important;
}
::v-deep .theme--dark.v-calendar-daily .v-calendar-daily__day-interval {
	border-top: #333333 1px solid;
	background-color: transparent !important;
}
::v-deep .theme--dark.v-calendar-daily .v-calendar-daily__day-interval:nth-child(4n + 5) {
	border-top: #717171 1px solid !important;
}
/* end of day view lines */
/*  */
/*  */
::v-deep .v-calendar-weekly__week:hover {
	background-color: rgba(255, 255, 255, 0.068);
}

.eventName {
	max-width: 103px;
	display: inline-block;
}
.saveBtn {
	display: block;
	width: 195px;
	font: normal 700 15px Poppins;
	letter-spacing: 0px;
	border-radius: 8px;
}
.saveBtn:hover {
	color: #fa4b6b;
}
.saveBtn.v-btn:hover:before {
	color: #f5f5f5;
	opacity: 1;
}
.calTitle {
	font: normal bold 25px Poppins;
}

::v-deep div .v-calendar-daily__interval:nth-child(4n + 5) .v-calendar-daily__interval-text {
	color: white !important;
	display: inline;
	font: normal 500 18px Arboria;
	text-align: center;
	top: -10px;
	right: -5px;
}
::v-deep div .v-calendar-daily__interval .v-calendar-daily__interval-text {
	display: none;
}
::v-deep .theme--dark.v-calendar-daily .v-calendar-daily__interval::after {
	border-top: none !important;
	border-bottom: none !important;
}
.bookedIcon {
	vertical-align: top;
	margin-top: 4px;
	float: right;
}

.eventCard {
	padding: 5px;
	padding-top: 1px;
	min-height: 100%;
}
.deleteAlertCard {
	background-color: #fa4b6bb9;
	min-height: 400px;
}
.calSheet {
	max-height: 650px;
}
.floatLeft {
	float: right;
}
.toolTipTitle {
	margin-top: 4px;
	font: normal 500 15px Arboria;
	display: inline-block;
}
.toolTipTime {
	font: normal bold 15px Arboria;
}
.v-menu__content {
	box-shadow: none;
}
.toolTip {
	padding: 20px;
	position: relative;
	margin-left: 10px;
	background-color: #111111ef;
}
.toolTip::after {
	content: '';
	position: absolute;
	top: 10%;
	right: 100%;
	margin-top: -px;
	border-width: 10px;
	border-style: solid;
	border-color: transparent #111111ef transparent transparent;
}

.v-event-draggable {
	padding-left: 6px;
}

.v-event-timed {
	user-select: none;
	-webkit-user-select: none;
}
</style>
