<template>
	<div v-if="selectedEvent">
		<!-- Card Wrapper -->
		<v-card class="sessionDetailsCard">
			<v-card-text class="pt-2">
				<h3 class="sessionDetails"> session details</h3>
				<!-- Session Title -->
				<h1 class="sessionTitle"> {{ selectedEvent.session.name }}</h1>
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
						<h2 class="dateTime"> {{ selectedEvent.chatroom }} </h2>
					</div>
					<h3 @click="openDescription" class="link"> Session Description</h3>
				</div>
				<!-- Mandatory Fill Row-->
				<div class="mb-6 flexDiv">
					<!-- Participants -->
					<div>
						<h3 class="label">Participants:</h3>
						<h2 class="dateTime" style="color:#F4D969">
							{{ this.selectedEvent.buyers.length }}/{{ this.selectedEvent.session.slots }}
						</h2>
						<v-tooltip right content-class="mandatoryTooltip">
							<template v-slot:activator="{ on, attrs }">
								<v-icon size="15px" v-bind="attrs" v-on="on" class="ml-2 pb-1" color="#F4D969">
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
					<h1 class="sellerLabel">Seller:</h1>
					<v-avatar
						size="56"
						class="mr-3 avatarBorder"
						id="seller"
						@click="profileClick($event, selectedEvent.seller)"
					>
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
						class=" avatarBorder mr-3"
					>
						<v-img :src="buyer.avatar"> </v-img>
					</v-avatar>
				</div>
				<!-- Buyer/seller profile Tooltip -->
				<!-- Menu is opened on avatar click and is positioned based on mouse location -->
				<v-menu
					v-model="profileTooltip"
					:close-on-content-click="false"
					:position-x="x"
					:position-y="y"
					offset-y
					flat
				>
					<v-card class="profileCard" v-if="selectedProfile">
						<!-- Top banner - no padding -->
						<div class="profileBannerDiv">
							<v-img :src="selectedProfile.banner" v-if="selectedProfile.banner" max-height="50px">
							</v-img>
						</div>
						<v-card-text class="pt-0">
							<!-- Avatar is overlapping the top border using negative margin  -->
							<v-avatar size="60px" class="avatarBorder">
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
									:href="`https://twitter.com/${selectedProfile.twitter}`"
									target="_blank"
									v-if="selectedProfile.twitter"
								>
									<v-icon class="profileSocial" size="20px">
										fab fa-twitter
									</v-icon>
								</a>
								<!-- Facebook -->
								<a
									:href="`https://facebook.com/${selectedProfile.facebook}`"
									target="_blank"
									v-if="selectedProfile.facebook"
								>
									<v-icon class="profileSocial" size="20px">
										fab fa-facebook
									</v-icon>
								</a>
								<!-- Youtube -->
								<a
									:href="`https://youtube.com//${selectedProfile.youtube}`"
									target="_blank"
									v-if="selectedProfile.youtube"
								>
									<v-icon class="profileSocial" size="20px">
										fab fa-youtube
									</v-icon>
								</a>
								<!-- Twitch -->
								<a
									:href="`https://twitch.tv/${selectedProfile.twitch}`"
									target="_blank"
									v-if="selectedProfile.twitch"
								>
									<v-icon class="profileSocial" size="20px">
										fab fa-twitch
									</v-icon>
								</a>
							</div>
						</v-card-text>
					</v-card>
				</v-menu>
				<!-- Delete Button -->

				<div class="flexDiv">
					<v-icon color="#D4145A" class="trashBtn" size="18px" @click="deleteDialog = true">
						fas fa-trash
					</v-icon>
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
					To confirm you want to delete this session please type the name of the session exactly into the form
					to enable the delete button.
					<v-text-field single-line filled v-model="deleteString"></v-text-field>
					<h3>This action is irrevesible!</h3>
				</v-card-text>

				<v-divider></v-divider>

				<v-card-actions>
					<v-btn color="primary" :ripple="false" text @click="closeDeleteDialog">
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
				<v-card-title class="disputeTitle dark justify-center">
					You are about to send <br v-if="$vuetify.breakpoint.width <= 400" />
					a dispute to
					<br />
					{{ selectedEvent.seller.username }}
				</v-card-title>

				<v-card-text class="text-center">
					<h3 class="dateTime font-weight-medium ">
						The seller will review this dispute and if it cannot be resolved Provana.GG staff will determine
						the result.
					</h3>
					<h3 class="dateTime font-weight-bold grey--text darken-3 mt-2">
						if you did this by mistake, <span class="link" @click="closeDisputeDialog"> Go back. </span>
					</h3>
					<h3 class="reasonText text-left mt-3 mb-1 text-center">OR</h3>
					<h3 class="dateTime font-weight-medium ">
						If you wish to continue you will be redirected to discord to file your dispute.</h3
					>
				</v-card-text>

				<v-card-actions>
					<v-btn color="#666666" class="link" :ripple="false" text @click="closeDisputeDialog">
						Close
					</v-btn>
					<v-spacer></v-spacer>
					<v-btn
						color="primary"
						:loading="deleteLoading"
						href="https://discord.gg/zJh4RaHk"
						text
						:ripple="false"
						target="_blank"
					>
						Dispute session
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<!-- Session Terms / Session Description Dialog   -->
		<v-dialog :width="$vuetify.breakpoint.mobile ? '100%' : '550px'" v-model="sessionDialog">
			<v-card class="sessionDialogCard">
				<h3 class="sessionTitle">{{ selectedEvent.session.name }}</h3>
				<v-tabs v-model="tabs" :vertical="!$vuetify.breakpoint.mobile" hide-slider>
					<v-tab href="#description"> Description</v-tab>
					<v-tab href="#terms"> Terms </v-tab>
					<v-tab-item value="description" id="description">
						<v-card-text> {{ selectedEvent.service.serviceDescription }} </v-card-text>
					</v-tab-item>
					<v-tab-item value="terms" id="terms">
						<v-list class="termsListBox">
							<v-list-item
								v-for="(term, i) in selectedEvent.service.terms"
								:key="i"
								no-action
								class=" termsFont pl-1 elevation-3"
							>
								{{ i + 1 }}.<span class="termsItem ml-2">{{ term }} </span>
								<v-spacer> </v-spacer>
							</v-list-item>
						</v-list>
					</v-tab-item>
				</v-tabs>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import dayjs from 'dayjs'
import { db } from '../../../plugins/firebase'
import { mapState } from 'vuex'
import { functions } from '../../../plugins/firebase'
export default {
	name: 'SessionDetails',
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
	}),
	computed: {
		...mapState({
			selectedEvent: (state) => state.dashboard.selected,
			claims: (state) => state.auth.claims,
		}),
	},
	methods: {
		async deleteBooked() {
			this.deleteLoading = true
			if (this.selectedEvent.seller.uid === this.$user.uid) {
				const cancel = functions.httpsCallable('cancelSession')
				await cancel({
					id: this.selectedEvent.session.id,
				})
					.then((res) => {
						this.$store.dispatch('dashboard/getSold')
					})
					.catch((err) => {
						console.error(err)
					})
			} else {
				const cancel = functions.httpsCallable('cancelSlot')
				await cancel({
					id: this.selectedEvent.bookedSlots.id,
				})
					.then((res) => {
						this.$store.dispatch('dashboard/getPurchase')
					})
					.catch((err) => {
						console.error(err)
					})
			}
			this.deleteLoading = false
			// this has to be done to refresh the list of upcoming sessions 2 components away
			// could be fixed with snapshot bind, but that requires 2 queries for each (service.ts)
			window.location.reload()
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
		profileClick(nativeEvent, profile) {
			const open = () => {
				this.selectedProfile = profile
				this.selectedElement = nativeEvent.target
				this.x = nativeEvent.clientX - 40
				this.y = nativeEvent.clientY - 200
				requestAnimationFrame(() => requestAnimationFrame(() => (this.profileTooltip = true)))
			}
			if (this.profileTooltip === true) {
				this.profileTooltip = false
				requestAnimationFrame(() => requestAnimationFrame(() => open()))
			} else {
				open()
			}
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
		openTerms() {
			this.tabs = 'terms'
			this.sessionDialog = true
		},
		openDescription() {
			this.tabs = 'description'
			this.sessionDialog = true
		},
		formatTime(e) {
			return dayjs.unix(e).format('h:mm a')
		},
		formatDate(e) {
			return dayjs.unix(e).format('MM/DD/YY')
		},
	},
}
</script>

<style scoped>
.disputeTitle {
	font: normal normal 600 25px Poppins !important;
	letter-spacing: -1.25px;
	text-align: center;
	overflow: normal;
}
.termsDialog {
	max-width: 550px;
}
.profileSocialsDiv {
	text-align: center;
}
.profileSocialsDiv > a {
	text-decoration: none;
}
.mandatoryIcon {
	justify-self: center;
}
.sessionDetails {
	font: normal 600 20px Poppins;
	letter-spacing: -1px;
}
.profileSocial {
	text-decoration: none;
	margin-right: 13px;
	color: white;
}
.profileSocial:hover {
	color: #b5b0b0;
	transform: scale(1.2);
}
.profileTagline {
	font: normal 500 15px/15px Arboria;
	margin-bottom: 25px;
	margin-top: -5px;
}
.profileUsernameLink {
	color: white;
	text-decoration: none;
	font: normal 600 18px Poppins;
	letter-spacing: -0.9px;
	display: inline-block;
	width: 80%;
}
.profileUsernameLink:hover {
	color: #b5b0b0;
}
.avatarBorder {
	border: 2px solid #e61b5b;
	background-color: #1e1e1e;
}
.profileBannerDiv {
	min-height: 100%;
	background-color: #111111;
	margin-bottom: -30px;
}
.profileCard {
	width: 180px;
	border-radius: 10px;
}
.exitBtn {
	margin-left: auto;
	margin-right: 100px;
}
/* tabs Background removal */
::v-deep .theme--dark.v-tabs > .v-tabs-bar {
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
::v-deep .theme--dark.v-tabs-items {
	height: 175px;
	padding: 20px;
	border-radius: 10px;
	overflow-y: scroll;
}
.tabItemText {
	font: normal 600 18px Arboria;
}
.exitDiv {
	width: 278px;
}
.tabItemCard {
	width: 278px;
	height: 176px;
}
.v-tab {
	color: #fa4b6b;
	margin-right: 10px;
	width: 160px;
	text-transform: none;
	justify-content: right;
	font: normal 500 20px Poppins;
}
.sessionDialogCard {
	padding: 25px;
	min-height: 350px;
	background-color: #222222;
	border-radius: 10px;
}
.trashBtn {
	cursor: pointer;
	margin-top: 25px;
	margin-left: auto;
}
.sellerLabel {
	align-self: flex-start;
	font: normal 500 18px Arboria;
	letter-spacing: -0.9px;
}
.avatarDiv {
	align-items: center;
	height: 120px;
	width: 100%;
	background-color: #111111;
	display: flex;
	padding: 10px;
	overflow-x: scroll;
}
.mandatoryTip {
	color: #f4d969;
	font: normal 500 15px Arboria;
}
.mandatoryTooltip {
	opacity: 0.08;
	background-color: #333333;
	border-radius: 5px;
}
.label {
	display: inline-block;
	width: 130px;
	font: normal 600 15px Arboria;
	color: #dbdbdb;
	text-align: bottom;
}
.flexDiv {
	display: flex;
	justify-content: space-between;
	margin-bottom: 15px;
}
.link {
	font: normal normal 600 15px Arboria;
	color: #fa4b6b;
	display: inline-block;
}
.link:hover {
	color: white;
	cursor: pointer;
}
.dateTime {
	display: inline-block;
	font: normal 600 15px Arboria;
	color: #dbdbdb;
}
.sessionTitle {
	font: normal 600 25px Poppins;
	color: white;
	margin-bottom: 23px;
}
.sessionDetailsCard {
	margin-top: 56px;
	max-width: 550px;
	min-height: 423px;
	background-color: #333333;
}
@media screen and (max-width: 1400px) {
	.v-tab {
		color: #fa4b6b;
		margin-right: 10px;
		width: 160px;
		text-transform: none;
		justify-content: right;
		font: normal 500 20px Poppins;
	}
	::v-deep .v-dialog {
		margin: 24px 0;
	}

	.sessionDetailsCard {
		max-width: 100%;
	}
	.link {
		text-align: right;
	}
	.disputeTitle {
		font: normal normal 600 18px Poppins !important;
		letter-spacing: -1.25px;
		text-align: center;
		overflow: normal;
	}
}
</style>
