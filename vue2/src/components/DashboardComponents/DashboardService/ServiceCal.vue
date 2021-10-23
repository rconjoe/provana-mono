<template>
	<v-row class="ma-0">
		<v-col class="datePickerCol">
			<!-- v-sheet container left sidebar -->
			<v-sheet width="250px" height="21.9vw">
				<!-- Date picker -->
					<v-date-picker
						color="secondary"
						width="240px"
						v-model="focus"
						class="datepicker mt-4"
					></v-date-picker>
				<h3 class="selectedServiceText mt-9"> Selected:</h3>
				<div class="selectedServiceBox" :style="selectedService ? { borderColor: selectedService.color } : ''">
					<h3 class="selectedService" v-if="selectedService" :style="{ color: selectedService.color }">
						{{ selectedService.serviceName }}</h3
					>
					<h3 class="selectedService" v-else> None Selected</h3>
				</div>
			</v-sheet>

		</v-col>
		<v-col class="pl-0">
			<!-- <v-sheet height="64" color="transparent">
				<v-toolbar flat color="transparent">

					<v-btn fab text color="grey darken-2" @click="prev">
						<v-icon>
							fas fa-chevron-left
						</v-icon>
					</v-btn>

					<v-toolbar-title class="calTitle mr-2" v-if="$refs.calendar">
						{{ $refs.calendar.title }}
					</v-toolbar-title>

					<v-btn fab text color="grey darken-2" @click="next">
						<v-icon>
							fas fa-chevron-right
						</v-icon>
					</v-btn>


					<v-spacer></v-spacer>
					<h3 class="selectedServiceText"> Selected:</h3>
					<div class="selectedServiceBox" :style="selectedService ? { borderColor: selectedService.color } : ''">
						<h3 class="selectedService" v-if="selectedService" :style="{ color: selectedService.color }">
							{{ selectedService.serviceName }}</h3
						>
						<h3 class="selectedService" v-else> None Selected</h3>
					</div>
					<v-spacer></v-spacer>

					<v-btn class="saveBtn" color="secondary" @click="publishPotentialSessions" :loading="potentialLoading">
						save availability
					</v-btn>
				</v-toolbar>
			</v-sheet> -->
			<v-sheet class="calSheet" height="23.6vw" color="transparent">
				<v-calendar
					id="proCal"
					interval-height="15"
					:interval-format="intervalFormat"
					interval-minutes="15"
					interval-count="96"
					ref="calendar"
					v-model="focus"
					:events="event"
					:type="type"
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
							<v-icon v-if="event.status == 'booked'" size=".7vw" color="black" class="bookedIcon">
								fas fa-dollar-sign
							</v-icon>
						</div>
					</template>
				</v-calendar>

				<!--ToolTip -->
				<v-menu v-model="sessionTooltip" :close-on-content-click="false" :activator="selectedElement" offset-x flat>
					<v-card class="toolTip" min-width="13.020833333333334vw" elvation="0">
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
										size="1vw"
										class="bookedIcon"
									>
										fas fa-trash
									</v-icon>
									<!-- Delete icon if published/potential just deletes -->
									<v-icon v-else color="#272727" icon @click="toolTipWindow = 1" size="1vw" class="bookedIcon">
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
								<v-divider></v-divider>
								<v-card-actions>
									<v-btn @click="toolTipWindow = 0">
										<v-icon class="mr-2" size="1vw"> fas fa-chevron-left</v-icon>
										Back
									</v-btn>
									<v-spacer></v-spacer>
									<v-btn @click="deleteSession" :loading="deleteUnbookedLoading">
										Yes!
										<v-icon class="ml-2" size="1vw"> fas fa-chevron-right</v-icon>
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
							To confirm you want to delete this session please type the name of the session exactly into the form to
							enable the delete button.
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
			<v-btn class="btnCTA float-right mt-2" color="primary" @click="saveAvailability" :loading="potentialLoading">
						save availability
					</v-btn>
		</v-col>

	</v-row>
</template>

<script>
	import { functions, db } from '@/plugins/firebase'
	import { formatter } from '../../../plugins/sessionFormatter'
	import dayjs from 'dayjs'
	export default {
		name: 'ServiceCal',
		props: ['selectedService'],
		data: function() {
			return {
				popupState: false,
				serviceList: [],
				dataLoaded: false,
				name: 'ServiceCal',
				sellerUid: '',
				value: '',
				focus: '',
				type: 'week',
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
				if(this.selectedService){
					return {
						'--serviceColor': this.selectedService.color,
					}
				}
				else{
					return { '--serviceColor':'transparent'}
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
            slot: data.slot,
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
			this.$watch('selectedEvent', () => {
				this.bindSlots()
			})
			await this.getServices()
		},

		methods: {
			async deleteBooked() {
				if (this.selectedEvent.slots == 1) {
					const cancelBookedSession = functions.httpsCallable('callableCancelBookedSession')
					await cancelBookedSession({
						session: this.selectedEvent.id,
						uid: this.$user.uid,
					}).catch((err) => {
						this.setError(true, err.message, 'red', 'fas fa-alert')
					})
					this.setError(true, `Session id#${this.selectedEvent.id} successfully cancelled.`, 'green', 'fas fa-check')
				}
				this.deleteString = ''
				this.deleteDialog = false
			},
			closeDeleteDialog() {
				this.deleteString = ''
				this.deleteDialog = false
			},
			intervalFormat(time) {
				return time.time
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
			bindSlots() {
				this.slots = []
				const session = this.selectedEvent
				if (session.slots > 1) {
					const slots = db
						.collection('sessions')
						.doc(session.id)
						.collection('slots')
					slots.get().then((querySnapshot) => {
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
                slot: data.slot,
                slots: data.slots,
                parentSession: data.parentSession,
                sellerUid: data.sellerUid,
                serviceDocId: data.serviceDocId,
                id: data.id,
              }
							this.slots.push(slot)
						})
					})
				}
			},
			async createPotentialSession(time) {
				if (this.selectedService) {
					const startMinute = this.round(time.minute)
					const formattedStartTime = dayjs(`${time.year}-${time.month}-${time.day} ${time.hour}:${startMinute}`).format(
						'YYYY-MM-DD HH:mm'
					)
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
					}
					else if (dayjs(formattedStartTime).isBefore(dayjs())) {
						return this.setError(true, 'You can not set a session in the past', 'red', 'fas fa-exclamation-circle')
					}
					else if (dayjs(formattedStartTime).isAfter(dayjs().add(6, 'day'))) {
						return this.setError(
							true,
							'You can not set a session more than 6 days in the future',
							'red',
							'fas fa-exclamation-circle'
						)
					}
					else {
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
			async getServices() {
				const getServices = functions.httpsCallable('callableGetServicesByUid')
				await getServices({ uid: this.$user.uid }).then((res) => {
					const services = res.data
					let servicesArr = []
					services.forEach((service) => {
						servicesArr.push(service)
					})
				})
			},

			async deleteSession() {
				this.deleteUnbookedLoading = true
				const ses = await db
					.collection('sessions')
					.doc(this.selectedEvent.id)
				const slots = await ses.collection('slots').get()
				slots.forEach(async slot => await slot.ref.delete())
				await ses.delete()
					.then(() => {
						this.deleteUnbookedLoading = false
						this.sessionTooltip = false
						this.toolTipWindow = 0
						this.selectedEvent = {}
					})
			},
		},

	}
</script>

<style scoped>
	/* calendar background removal */
	>>>#proCal.theme--dark.v-calendar-daily .v-calendar-daily__day{
		background-color:transparent !important;
	}
	/* calendar scrollable area border */
	>>>.v-calendar-daily__scroll-area{
		border: 3px solid var(--serviceColor)
	}
	/* datepicker date outline */
	>>>.datepicker .v-btn--outlined{
		border:none;
	}
	/* datepicker background color */
	>>>.theme--dark.v-picker__body{
		background-color: transparent;
	}
	/* datepicker title  */
	>>>.v-picker__title{
		display:none;
	}
	.datePickerCol {
		max-width: 250px;
		margin-top: 1.56vw;
	}
	/* background color behind time */
	>>> .v-calendar-daily__intervals-body {
		background-color: #1e1e1e;
	}
	/* weekday header text */
	>>> .v-calendar-daily_head-weekday {
		font: normal 500 0.78125vw Poppins;
	}
	/* Removal of date header row */
	>>> .v-calendar-daily_head-day-label {
		display: none;
	}

	.slotBuyer {
		font: normal 600 0.78125vw Poppins;
	}
	.slotListItem:hover {
		background-color: #1e1e1e;
		border-radius: 5px;
	}
	.slotItemText {
		font: normal 500 0.78125vw Arboria;
		display: inline-block;
	}
	.slotItemTime {
		margin-right: 1vw;
		font: normal 600 0.78125vw Poppins;
	}
	.slotItemTitle {
		font: normal 600 0.78125vw Poppins;
	}
	.v-calendar-daily__pane {
		overflow: none;
	}
	>>> .v-calendar-daily__scroll-area::-webkit-scrollbar {
		width: 0.52vw;
		padding-left: 1.0417vw;
	}
	>>> .v-calendar-daily__scroll-area::-webkit-scrollbar-track {
		background: #111111;
	}
	>>> .v-calendar-daily__scroll-area::-webkit-scrollbar-thumb {
		background: #333333;
		border-radius: 7px;
	}
	>>> .v-calendar-daily__scroll-area {
		overflow-y: scroll !important;
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
		background-color:transparent !important;
	}
	>>> .theme--dark.v-calendar-daily .v-calendar-daily__day-interval:nth-child(4n + 5) {
		border-top: #717171 1px solid !important;
	}
	/* end of day view lines */
	/*  */
	/*  */
	>>> .v-calendar-weekly__week:hover {
		background-color: rgba(255, 255, 255, 0.068);
	}

	.eventName {
		max-width: 5.4vw;
		display: inline-block;
	}
	.saveBtn {
		display: block;
		width: 10.15625vw;
		font: normal 700 0.78215vw Poppins;
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
		font: normal bold 1.3020833333333333vw Poppins;
	}
	.selectedServiceText {
		margin-bottom: 0.3vw;
		margin-left: 0.6770833333333334vw;
		font: normal 500 0.78125vw Arboria;
		color: #717171;
	}
	.selectedServiceBox {
		min-width: 10.708333333333334vw;
		max-width: 10.708333333333334vw;
		border-radius: 5px;
		border: solid 1px #717171;
		padding-top: 0.25vw;
		padding-left: 0.625vw;
		padding-bottom: 0.25vw;
		margin-left: 0.6770833333333334vw;
	}
	.selectedService {
		font: normal bold 0.9375vw Poppins;
	}
	>>> div .v-calendar-daily__interval:nth-child(4n + 5) .v-calendar-daily__interval-text {
		color: white !important;
		display: inline;
		font: normal 500 0.9375vw Arboria;
		text-align: center;
		top: -0.5208333333333334vw;
		right: -5px;
	}
	>>> div .v-calendar-daily__interval .v-calendar-daily__interval-text {
		display: none;
	}
	>>> .theme--dark.v-calendar-daily .v-calendar-daily__interval::after {
		border-top: none !important;
		border-bottom: none !important;
	}
	.bookedIcon {
		vertical-align: top;
		margin-top: 0.2vw;
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
		max-height: 31.25vw;
		position: relative;
	}
	.floatLeft {
		float: right;
	}
	.toolTipTitle {
		margin-top: 4px;
		font: normal 500 0.78125vw Arboria;
		display: inline-block;
	}
	.toolTipTime {
		font: normal bold 0.78125vw Arboria;
	}
	.v-menu__content {
		box-shadow: none;
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
