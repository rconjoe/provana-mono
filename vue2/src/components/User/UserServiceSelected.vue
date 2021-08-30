<template>
	<div>
		<LoadingOverlay v-if='checkoutLoading' />
		<v-col class="d-flex justify-space-between serviceHeader">
			<h1 class="serviceTitle"> {{ service.serviceName }} </h1>
			<v-btn class="backBtn pa-1  " @click="showServices" small color="primary" text> &#60; Back </v-btn>
		</v-col>
		<h3 class="serviceInfo"> {{ service.serviceCost }} </h3>
		<h3 class="serviceInfo"> {{ service.serviceLength }} Min.</h3>
		<h3 class="serviceInfo"> {{ service.platform }} </h3>
		<h3 class="serviceInfo"> {{ service.software }} </h3>
		<h3 class="serviceDescription"> {{service.serviceDescription}} </h3>

		<!-- Calendar start -->
		<v-sheet height="70" color="transparent">
			<v-toolbar flat color="transparent" class="mb-6">
				<h1 class="availableHeader" v-if="sessions"> Choose a spot this week! </h1>
				<h1 class="availableHeader" v-else>Oh No! :(</h1>

				<v-btn fab text color="grey darken-2" @click="prev">
					<v-icon>
						fas fa-chevron-left
					</v-icon>
				</v-btn>

				<h3 class=" mr-2" v-if="$refs.calendar">
					{{ $refs.calendar.title }}
				</h3>

				<v-btn fab text color="grey darken-2" @click="next">
					<v-icon>
						fas fa-chevron-right
					</v-icon>
				</v-btn>
			</v-toolbar>
		</v-sheet>
		<!-- actual Calendar -->
		<v-sheet v-if="sessions" height="400" color="transparent" class="calendarContainer">
			<v-calendar ref="calendar" v-model="focus" type="week" :events="sessions" @click:event="showEvent">
				<template v-slot:event="{ event, start }">
					<div v-if="start" class="eventCard">
						<h3 class="pt-0 white--text text-truncate eventName">
							{{ event.name }}
						</h3>
					</div>
				</template>
			</v-calendar>
			<!-- tooltip window -->
			<!--  -->
			<!--  -->
			<v-menu v-model="sessionToolTip" :close-on-content-click="false" :activator="selectedElement" offset-x elevation="0">
				<v-card class="toolTip pa-2" min-width="350px" max-width="450px" elvation="0">
					<v-window v-model="toolTipWindow">
						<!-- Window 0 -->
						<v-window-item>
							<div>
								<h3 class="toolTipTitle">
									{{ selectedEvent.name }}
								</h3>
								<v-card-text class="pt-0 pl-0 pb-1">
									{{ formatDate(selectedEvent.start) }} @
									{{ formatTime(selectedEvent.start) }}
								</v-card-text>
								<v-divider></v-divider>
								<!-- If the service is mandtory fill display warning to the buyer -->
								<div v-if="service.mandatoryFill">
									<h3 class="mandatoryFillTitle">
										<v-icon color="warning"> fas fa-exclamation-triangle</v-icon> Mandatory Fill
									</h3>
									<h3 class="mandatoryFillText">
										If all slots are not filled before the event start time, All money will be refunded and the session
										will be automatically canceled.
									</h3>
								</div>
								<!-- List the slots available if the slot is booked = disabled -->
								<v-list dense color="transparent">
									<!-- loop through slots creating list item for each -->
									<v-list-item
										v-for="(slot, i) in slots"
										:key="i"
										class="slotListItem"
										:disabled="slot.status === 'booked'"
									>
										<h3 class="slotItemTime"> Slot {{ slot.slot}} of {{slot.slots}}</h3>
										<v-spacer> </v-spacer>
										<v-btn color="primary" class="bookBtn"  :disabled="slot.status != 'published'" @click="prebookSlot(slot)">
											Book it!
										</v-btn>
									</v-list-item>
								</v-list>
							</div>
						</v-window-item>

						<!-- window 1 are you sure -->
						<v-window-item>
							<div>
								<h3 class="toolTipTitle mb-2">
									Are you sure?
								</h3>
								<!-- displaying the sevice  -->
								<v-card-text class="pt-0 pl-0 pb-1">
									booking {{ selectedEvent.name }} <br />
									{{ formatDate(selectedEvent.start) }} @
									{{ formatTime(selectedEvent.start) }}
								</v-card-text>
								<!-- 5 minute warning -->
								<h3 class="mandatoryFillText pb-4 pl-0">
									We will hold your spot for 5 minutes while you are redirected to checkout. If the time expires before
									you complete checkout the session will be removed from holding and republished.
								</h3>
								<!-- Cancel Button -->
								<v-btn @click="toolTipWindow = 0" class="mr-4">
									<v-icon size=".8vw" class="mr-2"> fas fa-chevron-left</v-icon>
									Back
								</v-btn>
								<v-btn @click="purchaseSession(selectedSlot)">
									Checkout Slot!
									<v-icon size=".8vw" class="ml-2"> fas fa-chevron-right</v-icon>
								</v-btn>
							</div>
						</v-window-item>
					</v-window>
				</v-card>
			</v-menu>
		</v-sheet>

		<p v-if="!sessions"> There are no openings for this service check back tomorrow.</p>
	</div>
</template>

<script>
	import { functions, db } from '../../plugins/firebase'
	import dayjs from 'dayjs'
	import { formatter } from '../../plugins/sessionFormatter'
	import LoadingOverlay from '../LoadingOverlay.vue'
	var stripe = Stripe(
		'pk_test_51HJUgfGoIl5NLNcQKTXPu3CKuckXq6vbUXxASrRZvrXgwtODSI9wFNWdZoo37LY3YXrrfMx2N7Nas1MWbWn7ddu100RWAa63mC'
	)
	export default {
		components: {
			LoadingOverlay,
		},
		data: () => ({
			selectedSlot: '',
			focus: '',
			sessions: [],
			mySessions: [],
			slots: [],
			selectedEvent: '',
			selectedElement: null,
			sessionToolTip: false,
			checkoutLoading: false,
			toolTipWindow: 0,
		}),
		props: ['service'],
		mounted() {
			db.collection('sessions')
				.where('serviceDocId', '==', this.service.id)
				.where('status', '==', 'published')
				.onSnapshot((querySnapshot) => {
					this.sessions = []
					querySnapshot.forEach((doc) => {
						const data = doc.data()
						const session = formatter(data)
						this.sessions.push(session)
					})
				})
			this.$watch('selectedEvent', () => {
				this.bindSlots()
			})
		},
		methods: {
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
			showEvent({ nativeEvent, event }) {
				const open = () => {
					this.selectedEvent = event
					this.selectedElement = nativeEvent.target
					requestAnimationFrame(() =>
						requestAnimationFrame(() => {
							this.sessionToolTip = true
						})
					)
				}
				if (this.sessionToolTip) {
					this.sessionToolTip = false
					requestAnimationFrame(() => requestAnimationFrame(() => open()))
				} else {
					open()
				}
				nativeEvent.stopPropagation()
			},
			prev() {
				this.$refs.calendar.prev()
			},
			next() {
				this.$refs.calendar.next()
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
						const slot = formatter(data)
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
			async purchaseSession(session) {
				this.checkoutLoading = true
				const createCheckoutSession = functions.httpsCallable('callableCreateCheckoutSession')
				const checkoutData = {
					uid: this.$user.uid,
					username: this.$user.displayName,
					sellerUid: session.sellerUid,
					price: this.service.stripePrice,
					serviceCost: this.service.serviceCost,
					sessionId: session.id,
					parentSession: session.parentSession,
					slots: session.slots,
				}
				await createCheckoutSession(checkoutData).then((resp) => {
					this.checkoutLoading = false
					stripe.redirectToCheckout({ sessionId: resp.data.id })
				})
			},
		},
	}
</script>

<style scoped>
	.floatRight{
		display: inline-block;
	}
	.floatLeft{
		float:left;
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
	.mandatoryFillText {
		padding-left: 0.7vw;
		font: normal 500 0.78125vw Arboria;
		color: #717171;
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
		padding-bottom: .78125vw;
		margin-top: -20px;
	}
	.serviceDescription {
		color: #717171;
		font: normal 700 1rem Poppins;
		padding-right: 20px;
		display:block;
		margin-top: -10px;
	}
	.availableHeader {
		font: normal 600 1.5vw Poppins;
	}
	.backBtn {
		font: normal 600 1.2rem/1rem Poppins;
	}
	.serviceHeader {
		padding-right: 230px;
		padding-left: 0;
		padding-bottom: 0;
	}
	.bookBtn{
		width:50%;
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
