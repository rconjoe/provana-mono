<template>
	<div>
		<LoadingOverlay v-if="checkoutLoading" message="Please wait while we redirect you for payment." />
		<v-row class="serviceSelectedRow">
			<!-- col 1/3 back button -->
			<v-col class="backBtnCol">
				<v-btn class="backBtn pa-1  " @click="showServices" small color="#333333" text> &#60; Back </v-btn>
			</v-col>

			<!-- Col 2/3 is the service details -->
			<v-col class="detailsCol">
				<ServiceDetails :service="service" />
			</v-col>

			<!-- Col 3/3 Calendar -->
			<v-col class="scheduleCol">
				<h1 class="header"> Pick the right spot</h1>
				<div class="sessionDayDiv" v-for="(day, i) in days" :key="i">
					<SessionDay :date="day" :service="service" @show-slots="showEvent" />
				</div>
				<v-menu v-model="sessionToolTip" :close-on-content-click="false" :position-x="x" :position-y="y" offset-x elevation="0">
					<v-card class="toolTip pa-2" min-width="350px" max-width="450px" elvation="0">
						<v-window v-model="toolTipWindow">
							<!-- Window 0
								Booking view -->
							<v-window-item>
								<BookSessionWindow
									:serviceName="selectedEvent.name"
									:slots="slots"
									:startTime="formatTime(selectedEvent.start)"
									:startDate="formatDate(selectedEvent.start)"
									:mandatory="service.mandatoryFill"
									@prebook-slot="prebookSlot"
								/>
							</v-window-item>

							<!-- window 1 Confirm Checkout -->
							<v-window-item>
								<CheckoutSessionWindow
									:serviceName="selectedEvent.name"
									:startTime="formatTime(selectedEvent.start)"
									:startDate="formatDate(selectedEvent.start)"
									@checkout="checkout"
									@back="back"
								/>
							</v-window-item>
						</v-window>
					</v-card>
				</v-menu>
				<!-- actual Calendar -->
				<!-- <v-sheet v-if="sessions" height="400" color="transparent" class="calendarContainer">
					<v-calendar
						ref="calendar"
						v-model="focus"
						type="week"
						:events="sessions"
						@click:event="showEvent"
						:day-format="weekdayFormat"
						:weekday-format="dateFormat"
					>
						<template v-slot:event="{ event, start }">
							<div v-if="start" class="eventCard">
								<h3 class="pt-0 white--text text-truncate eventName">
									{{ event.name }}
								</h3>
							</div>
						</template>
					</v-calendar>

					tooltip window
					<v-menu
						v-model="sessionToolTip"
						:close-on-content-click="false"
						:activator="selectedElement"
						offset-x
						elevation="0"
					>
						<v-card class="toolTip pa-2" min-width="350px" max-width="450px" elvation="0">
							<v-window v-model="toolTipWindow">
								Window 0
								Booking view
								<v-window-item>
									<BookSessionWindow
										:serviceName="selectedEvent.name"
										:slots="slots"
										:startTime="formatTime(selectedEvent.start)"
										:startDate="formatDate(selectedEvent.start)"
										:mandatory="service.mandatoryFill"
										@prebook-slot="prebookSlot"
									/>
								</v-window-item>

								window 1 Confirm Checkout
								<v-window-item>
									<CheckoutSessionWindow
										:serviceName="selectedEvent.name"
										:startTime="formatTime(selectedEvent.start)"
										:startDate="formatDate(selectedEvent.start)"
										@checkout="checkout"
										@back="back"
									/>
								</v-window-item>
							</v-window>
						</v-card>
					</v-menu>
				</v-sheet> -->

				<p v-if="!sessions"> There are no openings for this service check back tomorrow.</p>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	import { functions, db } from '../../../plugins/firebase'
	import dayjs from 'dayjs'
	import { formatter } from '../../../plugins/sessionFormatter'
	import LoadingOverlay from '../../LoadingOverlay.vue'
	import ServiceDetails from '@/components/User/ServiceDetails.vue'
	import BookSessionWindow from '../UserServiceSelected/BookSessionWindow.vue'
	import CheckoutSessionWindow from '../UserServiceSelected/CheckoutSessionWindow.vue'
	import CalHeader from '../UserServiceSelected/CalHeader.vue'
	import SessionDay from './SessionDay.vue'
	var stripe = Stripe(
		'pk_test_51HJUgfGoIl5NLNcQKTXPu3CKuckXq6vbUXxASrRZvrXgwtODSI9wFNWdZoo37LY3YXrrfMx2N7Nas1MWbWn7ddu100RWAa63mC'
	)
	export default {
		components: {
			CalHeader,
			BookSessionWindow,
			CheckoutSessionWindow,
			LoadingOverlay,
			ServiceDetails,
			SessionDay,
		},
		data: () => ({
			x:0,
			y:0,
			days: [],
			selectedSlot: '',
			focus: '',
			sessions: [],
			mySessions: [],
			slots: [],
			selectedEvent: '',
			sessionToolTip: false,
			checkoutLoading: false,
			toolTipWindow: 0,
		}),
		props: ['service', 'profile'],
		mounted() {
			db
				.collection('sessions')
				.where('serviceDocId', '==', this.service.id)
				.where('status', '==', 'published')
				.onSnapshot((querySnapshot) => {
					this.sessions = []
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
						this.sessions.push(session)
					})
				})
			this.$watch('selectedEvent', () => {
				this.bindSlots()
				console.log('working')
			})

			this.days = [
				dayjs(),
				dayjs().add(1, 'day'),
				dayjs().add(2, 'day'),
				dayjs().add(3, 'day'),
				dayjs().add(4, 'day'),
				dayjs().add(5, 'day'),
			]
		},
		methods: {
			back() {
				this.toolTipWindow = 0
			},
			formatTime(e) {
				return dayjs(e).format('h:mm a')
			},
			formatDate(e) {
				return dayjs(e).format('MM/DD/YY')
			},
			setToday() {
				this.focus = ''
			},
			showServices() {
				this.$emit('show-services')
			},
			showEvent(e, session) {
				const open = () => {
					this.selectedEvent = session
					this.sessionToolTip = true
					this.toolTipWindow = 0
					this.x = e.clientX,
					this.y = e.clientY
				}
				if (this.sessionToolTip) {
					this.sessionToolTip = false
					this.toolTipWindow = 0
					requestAnimationFrame(() => requestAnimationFrame(() => open()))
				} else {
					open()
				}
			},
			prev() {
				this.$refs.calendar.prev()
			},
			next() {
				this.$refs.calendar.next()
			},
			dateFormat(time) {
				return ''
			},
			weekdayFormat(time) {
				return dayjs(time.date).format('M/DD')
			},
			bindSlots() {
				this.slots = []
				const session = this.selectedEvent
				const slots = db
					.collection('sessions')
					.doc(session.id)
					.collection('slots')
					.orderBy('slot')
				slots.get().then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						const data = doc.data()
						const slot = {
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
			},
			// TODO: [PRV-222] fix this
			prebookCheck() {
				const startOverlap = this.mySessions.some((session) => {
					return dayjs(this.selectedEvent.start).isBetween(session.start, session.end, null, '[]')
				}, this.selectedEvent.start)
				const endOverlap = this.mySessions.some((session) => {
					return dayjs(this.selectedEvent.end).isBetween(session.start, session.end, null, '[]')
				}, this.selectedEvent.end)
				if (startOverlap === false && endOverlap === false) {
					this.toolTipWindow = 1
				} else if (startOverlap === true || endOverlap == true)
					this.$store.commit('error/SET_ERROR', {
						show: true,
						message: 'You already have a session booked during this time slot. Can you be in two places at once? @_@',
						color: 'red',
						icon: 'fas fa-exclamation-circle',
					})
			},
			prebookSlot(e) {
				this.selectedSlot = e
				this.toolTipWindow = 1
			},
			async checkout() {
				this.checkoutLoading = true
				const checkout = functions.httpsCallable('checkout')
				const response = await checkout({
					uid: this.$user.uid,
					username: this.$user.displayName,
					customer: this.$store.state.auth.currentUser.customer,
					account: this.profile.account,
					price: this.service.stripePrice,
					serviceCost: this.service.serviceCost,
					slotId: this.selectedSlot.id,
					sessionId: this.selectedEvent.id,
				})
				console.log(response.data)
				this.checkoutLoading = false
				stripe.redirectToCheckout({ sessionId: response.data })
			},
		},
	}
</script>

<style scoped>
	.header {
		font: normal 600 1.5625vw Poppins;
		letter-spacing: -0.078125vw;
	}
	.sessionDayDiv {
		display: inline-flex;
		flex-direction: column;
		width: 100px;
	}
	.serviceSelectedRow {
		max-height: 420px;
		overflow: hidden;
	}
	.detailsCol {
		max-width: 25.526315789473685vw;
		border-right: solid 1px white;
		margin-top: 40px;
	}
	.floatRight {
		display: inline-block;
	}
	.floatLeft {
		float: left;
	}
	.slotListItem:hover {
		background-color: #1e1e1e;
		border-radius: 5px;
	}
	.toolTip {
		padding: 0.25vw;
		position: relative;
		margin-left: 10px;
		background-color: #111111ef;
	}

	.slotItemTime {
		margin-right: 1vw;
		font: normal 600 0.78125vw Poppins;
	}
	.mandatoryFillTitle {
		padding-left: 0.8vw;
		padding-right: 2vw;
		font: normal 700 1.2vw Poppins;
		vertical-align: bottom;
		display: inline-block;
		color: #fb8c00;
	}
	.slotItemText {
		font: normal 500 0.78125vw Arboria;
		display: inline-block;
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
	.calendarContainer {
		margin-right: 230px;
	}
	.serviceTitle {
		font: normal 600 2rem/1rem Poppins;
		display: inline-block;
	}
	.serviceInfo {
		color: #717171;
		font: normal 700 1rem Poppins;
		padding-right: 20px;
		display: inline-block;
		padding-bottom: 0.78125vw;
		margin-top: -20px;
	}
	.serviceDescription {
		color: #717171;
		font: normal 700 1rem Poppins;
		padding-right: 20px;
		display: block;
		margin-top: -10px;
	}
	.availableHeader {
		font: normal 600 1.5vw Poppins;
	}
	.backBtnCol {
		max-width: 4.2105263157894735vw;
	}
	.backBtn {
		font: normal 600 1.2rem/1rem Poppins;
	}
	.backBtn:hover {
		color: #fa4b6b !important;
	}
	.serviceHeader {
		padding-right: 230px;
		padding-left: 0;
		padding-bottom: 0;
	}
	.bookBtn {
		width: 50%;
	}
	.eventCard {
		padding: 5px;
		padding-top: 1px;
		min-height: 100%;
		background-color: #fa4b6b;
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
	/* Day selected */
	>>> .theme--dark.v-btn.v-btn--has-bg {
		background-color: transparent;
	}
	>>> .v-calendar-daily_head-day-label > .v-btn > .v-btn__content {
		font: normal 500 1.0416666666666667vw Poppins;
		letter-spacing: -0.052083333333333336vw;
		color: #666666;
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
