<template>
	<div v-if="selectedEvent">
		<!-- Session Details Header -->
		<h3 class="sessionDetailsHeader"> Session Details</h3>
		<!-- Card Wrapper -->

		<v-card class="sessionDetailsCard">
			<v-card-text>
				<!-- Session Title -->
				<h3 class="sessionTitle"> {{ selectedEvent.session.name }}</h3>
				<!-- TimeDate Row -->
				<div class="flexDiv">
					<div>
						<h3 class="label">Time and Date:</h3>
						<h2 class="dateTime">
							{{ formatTime(selectedEvent.session.start) }} - {{ formatTime(selectedEvent.session.end) }},
							{{ formatDate(selectedEvent.session.start) }}
						</h2>
					</div>
					<h3 @click="openTerms" class="link"> Session Terms</h3>
				</div>
				<!-- Chatroom Name Row -->
				<div class="flexDiv">
					<div>
						<h3 class="label">Chatroom Name:</h3>
						<h2 class="dateTime"> Custom Chat Name </h2>
					</div>
					<h3 @click="openDescription" class="link"> Session Description</h3>
				</div>
				<!-- Mandatory Fill Row-->
				<div class="mb-6 flexDiv">
					<!-- Participants -->
					<div>
						<h3 class="label">Participants:</h3>
						<h2 class="dateTime" style="color:#F4D969">
							{{ this.selectedEvent.bookedSlots }}/{{ this.selectedEvent.session.slots }}
						</h2>
						<v-tooltip right content-class="mandatoryTooltip">
							<template v-slot:activator="{ on, attrs }">
								<v-icon
									size="1vw"
									v-bind="attrs"
									v-on="on"
									class="ml-2"
									color="#F4D969"
									v-if="selectedEvent.mandatoryFill === true"
								>
									fas fa-exclamation-triangle
								</v-icon>
							</template>
							<span class="mandatoryTip">
								This session must have all the spots filled.
							</span>
						</v-tooltip>
					</div>
					<!-- Dispute Link v-if="this.$user.uid !== selectedEvent.seller.uid" -->
					<h3 class="link" @click="disputeDialog = true"> Dispute Session</h3>
				</div>
				<!-- Avatar Box -->
				<div class="avatarDiv">
					<!-- Seller -->
					<h1 class="sellerLabel">seller:</h1>
					<v-avatar size="56" class="mr-5" id="seller" @click="profileClick($event, selectedEvent.seller)">
						<v-img :src="selectedEvent.seller.avatar"></v-img>
					</v-avatar>
					<!-- Buyers -->
					<h1 class="sellerLabel">Buyers:</h1>
					<v-avatar
						v-for="buyer in selectedEvent.buyers"
						:key="buyer.id"
						:id="buyer.id"
						color="primary"
						size="56"
						@click="profileClick($event, buyer)"
					>
						<v-img :src="buyer.avatar"> </v-img>
					</v-avatar>
				</div>
				<!-- Buyer/seller profile Tooltip -->
				<!-- Menu is opened on avatar click and is positioned based on mouse location -->
				<v-menu v-model="profileTooltip" :close-on-content-click="false" :position-x="x" :position-y="y" offset-y flat>
					<v-card class="profileCard" v-if="selectedProfile">
						<!-- Top banner - no padding -->
						<div class="profileBannerDiv">
							<v-img :src="selectedProfile.banner" v-if="selectedProfile.banner" max-height="3.1578947368421053vw">
							</v-img>
						</div>
						<v-card-text class="pt-0">
							<!-- Avatar is overlapping the top border using negative margin  -->
							<v-avatar size="3.1578947368421053vw" class="avatarBorder">
								<v-img :src="selectedProfile.avatar"></v-img>
							</v-avatar>
							<!-- Username is link to storefront -->
							<router-link class="profileUsernameLink" :to="'/user/' + selectedProfile.username">
								<h3 class="profileUsername text-truncate"> {{ selectedProfile.username }}</h3>
							</router-link>
							<!-- Tagline -->
							<h3 class="profileTagline"> {{ selectedProfile.tagline }}</h3>
							<!-- Socials -->
							<div class="profileSocialsDiv">
								<!-- Twitter -->
								<a
									class="profileSocial"
									:href="`https://twitter.com/${selectedProfile.twitter}`"
									target="_blank"
									v-if="selectedProfile.twitter"
								>
									<v-icon>
										fab fa-twitter
									</v-icon>
								</a>
								<!-- Facebook -->
								<a
									class="profileSocial"
									:href="`https://facebook.com/${selectedProfile.facebook}`"
									target="_blank"
									v-if="selectedProfile.facebook"
								>
									<v-icon>
										fab fa-facebook
									</v-icon>
								</a>
								<!-- Youtube -->
								<a
									class="profileSocial"
									:href="`https://youtube.com//${selectedProfile.youtube}`"
									target="_blank"
									v-if="selectedProfile.youtube"
								>
									<v-icon>
										fab fa-youtube
									</v-icon>
								</a>
								<!-- Twitch -->
								<a
									class="profileSocial"
									:href="`https://twitch.tv/${selectedProfile.twitch}`"
									target="_blank"
									v-if="selectedProfile.twitch"
								>
									<v-icon>
										fab fa-twitch
									</v-icon>
								</a>
							</div>
						</v-card-text>
					</v-card>
				</v-menu>
				<!-- Delete Button -->

				<div class="flexDiv">
					<v-icon color="#D4145A" class="trashBtn" size="0.9vw" @click="deleteDialog = true"> fas fa-trash </v-icon>
				</div>
			</v-card-text>
		</v-card>

		<!-- Deletion Dialog -->
		<v-dialog v-model="deleteDialog" width="500">
			<v-card>
				<v-card-title class="text-h5 dark">
					Cancel Session?
					<br />
					{{ selectedEvent.session.name }} @ {{ formatDate(selectedEvent.session.start) }} -
					{{ formatTime(selectedEvent.session.start) }}?
				</v-card-title>

				<v-card-text>
					To confirm you want to delete this session please type the name of the session exactly into the form to enable
					the delete button.
					<v-text-field single-line filled v-model="deleteString"></v-text-field>
					<h3 class="reasonText">Reason:(optional)</h3>
					<v-textarea filled single-line v-model="deleteReason"> </v-textarea>
					<h3>This action is irrevesible!</h3>
				</v-card-text>

				<v-divider></v-divider>

				<v-card-actions>
					<v-btn color="primary" text @click="closeDeleteDialog">
						Close
					</v-btn>
					<v-spacer></v-spacer>
					<v-btn
						color="primary"
						:loading="deleteLoading"
						:disabled="deleteString !== selectedEvent.session.name"
						@click="deleteBooked"
					>
						Delete session
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<!-- Dispute Dialog -->

		<v-dialog v-model="disputeDialog" width="500">
			<v-overlay :value="disputeLoading">
				<v-progress-circular :value="100" indeterminate color="primary"></v-progress-circular>
			</v-overlay>
			<v-card>
				<v-card-title class="text-h5 text-bold text-center font-weight-bold dark justify-center">
					You are about to send a dispute to
					<br />
					{{ selectedEvent.seller.username }}
				</v-card-title>

				<v-card-text class="text-center">
					<h3 class="dateTime font-weight-medium ">
						The seller will review this dispute and if it cannot be resolved Provana.GG staff will determine the result.
					</h3>
					<h3 class="dateTime font-weight-bold grey--text darken-3 mt-2">
						if you did this by mistake, <span class="link" @click="closeDisputeDialog"> Go back. </span>
					</h3>
					<h3 class="reasonText text-left mt-3 mb-1">Reason:</h3>
					<v-select
						:items="complaintList"
						single-line
						background-color="#111111"
						color="primary"
						class="ml-2"
						v-model="disputeComplaint"
					>
					</v-select>
				</v-card-text>

				<v-card-actions>
					<v-btn color="#717171" class="btnCTA" @click="closeDisputeDialog">
						Close
					</v-btn>
					<v-spacer></v-spacer>
					<v-btn
						color="primary"
						class="btnCTA"
						:loading="deleteLoading"
						:disabled="disputeComplaint == ''"
						@click="disputeSession"
					>
						dispute session
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<!-- Session Terms / Session Description Dialog   -->
		<v-dialog width="32.63157894736842vw" v-model="sessionDialog">
			<!-- Card Wrapper -->
			<v-card class="sessionDialogCard">
				<h3 class="sessionTitle">{{ selectedEvent.session.name }}</h3>
				<v-tabs v-model="tabs" vertical hide-slider>
					<v-tab href="#description"> Description</v-tab>
					<v-tab href="#terms"> Terms </v-tab>
					<v-tab-item value="description" id="description">
						<h1 class="tabItemText"> Description</h1>
					</v-tab-item>
					<v-tab-item value="terms" id="terms">
						<h1 class="tabItemText"> Terms</h1>
					</v-tab-item>
				</v-tabs>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
	import dayjs from 'dayjs'
	import { db } from '../../plugins/firebase'
	import { mapState } from 'vuex'
	import { functions } from '../../plugins/firebase'
	export default {
		name:'Session Details',
		data: () => ({
			x: 0,
			y: 0,
			disputeLoading: false,
			profileTooltip: false,
			session: null,
			parentSession: null,
			buyerProfiles: [],
			selectedProfile: null,
			deleteDialog: false,
			disputeDialog: false,
			disputeComplaint: '',
			deleteReason: '',
			deleteString: '',
			deleteLoading: false,
			sessionDialog: false,
			tabs: 'terms',
			selectedElement: null,
			complaintList: [
				'I have something better to do.',
				"I won't make it in time",
				'I booked this by accident',
				'I just want my money back',
			],
		}),
		computed: {
			...mapState({
				selectedEvent: (state) => state.dashboard.home.selected,
				claims: (state) => state.auth.claims,
			}),
		},
		methods: {
			async deleteBooked() {
				this.deleteLoading = true
				if (this.selectedEvent.seller.uid === this.$user.uid) {
					const cancel = functions.httpsCallable('callableSellerCancelBooked')
					await cancel({
						session: this.selectedEvent.session.id,
						uid: this.$user.uid,
						slots: this.selectedEvent.session.slots,
					}).catch((err) => {
						console.error(err)
					})
				} else {
					const cancel = functions.httpsCallable('callableBuyerCancelBooked')
					await cancel({
						session: this.selectedEvent.session.id,
						uid: this.$user.uid,
						slots: this.selectedEvent.session.slots,
					}).catch((err) => {
						console.error(err)
					})
				}
				this.deleteLoading = false
				// this has to be done to refresh the list of upcoming sessions 2 components away
				// could be fixed with snapshot bind, but that requires 2 queries for each (service.ts)
				window.location.reload()
			},
			async disputeSession() {
				this.disputeLoading = true
				const filedAt = dayjs(Date.now()).unix()
				const session = this.selectedEvent.session.id
				const status = 'filed'
				const sellerUid = this.selectedEvent.session.sellerUid
				const filedBy = this.$user.uid
				const complaint = this.disputeComplaint
				const group = 'none'
				const fileComplaint = functions.httpsCallable('callableFileDispute')

				if (this.selectedEvent.session.slots > 1) {
					const group = this.selectedEvent.session.id
					const q = await db.collection('sessions')
						.doc(group)
						.collection('slots')
						.where('buyerUid', '==', this.$user.uid)
						.get()
					const slot = q.docs[0].id
					await fileComplaint({
						filedBy: filedBy,
						filedAt: filedAt,
						session: slot,
						status: status,
						sellerUid: sellerUid,
						complaint: complaint,
						group: group
					})
				} else {
					await fileComplaint({
						filedBy: filedBy,
						filedAt: filedAt,
						session: session,
						status: status,
						sellerUid: sellerUid,
						complaint: complaint,
						group: group
					})
				}
				this.disputeLoading = false
				this.disputeDialog = false
				this.disputeComplaint = ''
			},
			closeDeleteDialog() {
				this.deleteString = ''
				this.deleteReason = ''
				this.deleteDialog = false
			},
			closeDisputeDialog() {
				this.disputeReason = ''
				this.disputeDialog = false
			},
			profileClick(event, profile) {
				event.preventDefault()
				this.profileTooltip = false
				this.x = event.clientX - 40
				this.y = event.clientY - 250
				this.selectedProfile = profile
				this.$nextTick(() => {
					this.profileTooltip = true
				})
			},
			openTerms() {
				this.tabs = 'terms'
				this.sessionDialog = true
			},
			openDescription() {
				this.tabs = 'description'
				this.sessionDialog = true
			},
			formatTime(e) {
				return dayjs(e).format('h:mm a')
			},
			formatDate(e) {
				return dayjs(e).format('MM/DD/YY')
			},
		},
	}
</script>

<style scoped>
	.profileSocial {
		text-decoration: none;
		margin-right: 0.6842105263157895vw;
	}
	.profileSocial:hover {
		color: #b5b0b0;
	}
	.profileTagline {
		font: normal 500 0.7894736842105263vw Arboria;
		margin-bottom: 1.5789473684210527vw;
	}
	.profileUsernameLink {
		color: white;
		text-decoration: none;
		font: normal 600 0.9473684210526315vw Poppins;
		display: inline-block;
		width: 8vw;
	}
	.profileUsernameLink:hover {
		color: #b5b0b0;
	}
	.avatarBorder {
		border: 3px solid #e61b5b;
		background-color: #1e1e1e;
	}
	.profileBannerDiv {
		min-height: 2.736842105263158vw;
		max-height: 2.736842105263158vw;
		height: 2.736842105263158vw;
		background-color: #111111;
		margin-bottom: -1.5789473684210527vw;
	}
	.profileCard {
		height: 11.789473684210526vw;
		width: 9.368421052631579vw;
		border-radius: 10px;
	}
	.exitBtn {
		margin-left: auto;
		margin-right: 5vw;
	}
	/* tabs Background removal */
	>>> .theme--dark.v-tabs > .v-tabs-bar {
		background-color: transparent;
	}
	/* Active List Item highlight removal */
	.theme--dark.v-list-item--active:hover::before,
	.theme--dark.v-list-item--active::before {
		opacity: 0;
	}
	/* Tab Hover highlight removal */
	.theme--dark.v-tabs .v-tab--active:hover::before,
	.theme--dark.v-tabs .v-tab--active::before {
		opacity: 0;
	}
	.theme--dark.v-tabs .v-tab:hover::before {
		opacity: 0;
	}
	/* background to tab items removal */
	.v-tabs-items {
		background-color: transparent;
	}
	/* tabItem window */
	>>> .theme--dark.v-tabs-items {
		height: 9.210526315789474vw;
		padding: 1.0526315789473684vw;
		border-radius: 10px;
	}
	.tabItemText {
		font: normal 600 0.9473684210526315vw Arboria;
	}
	.exitDiv {
		width: 14.473684210526315vw;
	}
	.tabItemCard {
		width: 14.473684210526315vw;
		height: 9.210526315789474vw;
	}
	.v-tab {
		color: #fa4b6b;
		margin-right: 10px;
		width: 8.315789473684211vw;
		text-transform: none;
		justify-content: right;
		font: normal 500 1.0526315789473684vw Poppins;
	}
	.sessionDialogCard {
		padding: 1.5vw;
		min-height: 18.105263157894736vw;
		background-color: #222222;
		border-radius: 10px;
	}
	.trashBtn {
		cursor: pointer;
		margin-top: 1.3157894736842106vw;
		margin-left: auto;
	}
	.sellerLabel {
		align-self: flex-start;
		font: normal 500 1.0526315789473684vw Arboria;
		letter-spacing: 0.05263157894736842vw;
		margin-right: 1.3157894736842106vw;
	}
	.avatarDiv {
		align-items: center;
		height: 6.157894736842105vw;
		width: 100%;
		background-color: #111111;
		display: flex;
		padding: 10px;
		overflow-x: scroll;
	}
	.mandatoryTip {
		color: #f4d969;
		font: normal 500 0.9473684210526315vw Arboria;
	}
	.mandatoryTooltip {
		opacity: 0.08;
		background-color: #333333;
		border-radius: 5px;
	}
	.label {
		display: inline-block;
		width: 7.684210526315789vw;
		font: normal 500 0.9473684210526315vw Arboria;
		color: #666666;
		margin-right: 1.1578947368421053vw;
		text-align: bottom;
	}
	.flexDiv {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.8421052631578947vw;
	}
	.link {
		color: #fa4b6b;
		display: inline-block;
	}
	.link:hover {
		color: white;
		cursor: pointer;
	}
	.dateTime {
		display: inline-block;
		font: normal bold 0.9473684210526315vw Arboria;
		color: white;
	}
	.sessionTitle {
		font: normal 600 1.3157894736842106vw Poppins;
		letter-spacing: 0.06578947368421052vw;
		color: white;
		margin-bottom: 1.1578947368421053vw;
	}
	.sessionDetailsHeader {
		font: normal 600 1.3157894736842106vw Arboria;
		margin-bottom: 3.1578947368421053vw;
		margin-top: 1.0526315789473684vw;
	}
	.sessionDetailsCard {
		width: 40.89473684210526vw;
		min-height: 21.473684210526315vw;
		height: 21.473684210526315vw;
	}
</style>
