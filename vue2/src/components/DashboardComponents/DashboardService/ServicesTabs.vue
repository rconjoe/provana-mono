<template>
	<div class="serviceTabRow">
		<v-card class="serviceWrapperCard" color="transparent" flat>
			<!-- vertical tabs inital element -->
			<v-tabs
				class="serviceTabs"
				v-model="tab"
				background-color="transparent"
				dark
				vertical
				hide-slider
				slider-color="#1e1e1e"
			>
				<!-- invisible starting tab when no service is selected -->
				<v-tab href="#start" class="pa-0 ma-0 startTab" style="display:none"></v-tab>

				<!-- if services array < 3 show this add service tab.  href linked to tabItem with matching id -->
				<v-tab v-if="services.length < 3" active-class="addServiceTab" :ripple="false" href="#addService">
					<!-- if the current selected tab is the addService tab replace the button with an inputfield for the title -->
					<div v-if="tab === 'addService'">
						<v-form v-model="serviceNameValid" ref="serviceNameForm">
							<v-text-field
								v-model="newServiceName"
								@focus="passService(null)"
								:rules="nameRules"
							></v-text-field>
						</v-form>
					</div>
					<!-- else if addService is not selected tab then just show the add button -->
					<div v-else>
						<v-btn text color="primary" class="pa-0 addBtn">
							<v-icon color="primary" size="1vw" class="pr-3"> fas fa-plus </v-icon>
							<h3 class="addBtnText">Add</h3>
						</v-btn>
					</div>
				</v-tab>

				<!-- Loop through services and creat a tab for each service -->
				<v-tab
					v-for="(service, i) in services"
					:key="i"
					class="tab"
					:style="cssVars"
					@click="passService(service)"
				>
					<p class="tabService text-truncate">{{ service.serviceName }}</p>
				</v-tab>

				<!-- tabItems wraps all the tabItem components and shows one tabItem at a time -->
				<v-tabs-items class="serviceTabItemGroup" v-model="tab">
					<!-- create a tabItem for each service in the array -->
					<v-tab-item v-for="(service, i) in services" :key="i">
						<v-card
							class="activeTab pa-5"
							width="48.229166666666664vw"
							height="9vw"
							color="#1E1E1E"
							:style="{ borderColor: service.color }"
							flat
						>
							<!-- services  -->
							<v-row>
								<v-col class="pb-1">
									<!-- Price -->
									<div class="serviceItemDiv">
										<v-tooltip right color="#333333">
											<template v-slot:activator="{ on, attrs }">
												<v-icon
													size="0.78125vw"
													color="#333333"
													class="mr-2"
													v-on="on"
													v-bind="attrs"
													>fas fa-exclamation-circle
												</v-icon>
											</template>
											<span id="toolTip">
												Price of your service should be rounded to the nearest dollar.</span
											>
										</v-tooltip>
										<span class="label">
											Price:
										</span>
										<span class="value"> ${{ service.serviceCost }} </span>
									</div>
									<!-- Length -->
									<div class="serviceItemDiv">
										<v-tooltip right max-width="14vw" color="#333333">
											<template v-slot:activator="{ on, attrs }">
												<v-icon
													size="0.78125vw"
													color="#333333"
													class="mr-2"
													v-on="on"
													v-bind="attrs"
													>fas fa-exclamation-circle
												</v-icon>
											</template>
											<span> Duration of the event in minutes.</span>
										</v-tooltip>
										<span class="label">
											Length:
										</span>
										<span class="value"> {{ service.serviceLength }} Min </span>
									</div>
									<!-- Buyers -->
									<div class="serviceItemDiv my-4">
										<v-tooltip right max-width="14vw" color="#333333">
											<template v-slot:activator="{ on, attrs }">
												<v-icon
													size="0.78125vw"
													color="#333333"
													class="mr-2"
													v-on="on"
													v-bind="attrs"
													>fas fa-exclamation-circle
												</v-icon>
											</template>
											<span> Number of potential buyers that can join this service.</span>
										</v-tooltip>
										<span class="label">
											Buyers:
										</span>
										<span class="value">
											{{ service.attendees }}
										</span>
										<v-tooltip right content-class="mandatoryTooltip" color="#333333">
											<template v-slot:activator="{ on, attrs }">
												<v-icon
													size=".78125vw"
													v-bind="attrs"
													v-on="on"
													class="ml-2"
													color="#F4D969"
													v-if="service.mandatoryFill === true"
												>
													fas fa-exclamation-triangle
												</v-icon>
											</template>
											<span class="mandatoryTip">
												This session must have all the spots filled.
											</span>
										</v-tooltip>
									</div>
									<!-- Software -->
									<div class="serviceItemDiv">
										<v-tooltip right max-width="14vw" color="#333333">
											<template v-slot:activator="{ on, attrs }">
												<v-icon
													size="0.78125vw"
													color="#333333"
													class="mr-2"
													v-on="on"
													v-bind="attrs"
													>fas fa-exclamation-circle
												</v-icon>
											</template>
											<span>
												List of required software or games needed to complete the service ie.
												Discord, Minecraft</span
											>
										</v-tooltip>
										<span class="label">
											Software:
										</span>
										<span class="value">
											{{ service.software }}
										</span>
									</div>
								</v-col>

								<!-- 2/3 COL  -->
								<!-- Platform -->
								<v-col>
									<!-- <div class="serviceItemDiv">

										<v-tooltip right max-width="14vw" color="#333333">
											<template v-slot:activator="{ on, attrs }">
												<v-icon size="0.78125vw" color="#333333" class="mr-2" v-on="on" v-bind="attrs"
													>fas fa-exclamation-circle
												</v-icon>
											</template>
											<span> PC, Xbox360, PS4 etc...</span>
										</v-tooltip>
										<span class="label">
											Platform:
										</span>
										<span class="value">
											{{ service.platform }}
										</span>
									</div> -->
									<!-- Tags -->
									<div class="tagItemDiv ">
										<v-tooltip right max-width="14vw" color="#333333">
											<template v-slot:activator="{ on, attrs }">
												<v-icon
													size="0.78125vw"
													color="#333333"
													class="mr-2 tagsIcon"
													v-on="on"
													v-bind="attrs"
													>fas fa-exclamation-circle
												</v-icon>
											</template>
											<span> Tags are searchable terms to help users find your service.</span>
										</v-tooltip>
										<span class="tagLabel"> Tags:</span>
										<div class="tagsDiv text--truncate">
											<v-chip v-for="tag in service.tags" :key="tag" small class="value my-1">
												{{ tag }}
											</v-chip>
											<br />
										</div>
									</div>
									<!-- Service Terms -->
								</v-col>
								<v-col class="pl-0">
									<div class="serviceItemDiv">
										<span
											@mouseenter="deleteHover = true"
											@mouseleave="deleteHover = false"
											@click="serviceDeletePrompt"
											class="deleteText"
										>
											Delete Service
											<v-icon v-if="deleteHover === true" class="trashIconHover" size="1.1458vw">
												mdi-delete-sweep
											</v-icon>
											<v-icon v-else class="trashIcon" size="1.1458vw"> mdi-delete</v-icon>
										</span>
									</div>
									<div class="serviceItemDiv">
										<!-- Description -->
										<a @click="openDescription">
											<span class="value pl-0"> View Description </span>
										</a>
									</div>
									<div class="serviceItemDiv">
										<a @click="openTerms">
											<span class="value pl-0"> View Terms </span>
										</a>
									</div>
								</v-col>
							</v-row>
						</v-card>
					</v-tab-item>
					<!-- custom tab-item for the invisible tab when no service is selected -->
					<v-tab-item id="start">
						<v-card class="activeTab pa-5" color="#1E1E1E" flat width="48.229166666666664vw" height="9vw">
							<p class="noServiceMessage" v-if="services.length > 1"> Please select a service.</p>
							<p class="noServiceMessage" v-else> Create a service to get started.</p>
						</v-card>
					</v-tab-item>
					<!-- custom tab-item for create a service form -->
					<v-tab-item id="addService" v-if="services.length < 3 || services.length == 0">
						<v-overlay :value="createServiceLoading" :absolute="true">
							<v-progress-circular indeterminate color="primary"></v-progress-circular>
						</v-overlay>
						<AddServiceForm
							@create-service="createService"
							:serviceNameProp="newServiceName"
							:serviceNameValid="serviceNameValid"
						/>
					</v-tab-item>
				</v-tabs-items>
			</v-tabs>

			<!-- tabs list if no services exist -->
		</v-card>

		<!-- dialog for delete confirmation -->
		<v-dialog v-if="selectedService" v-model="serviceDialog" width="26.042vw">
			<v-card>
				<v-card-title class="headline primary ">
					Are you Sure?
				</v-card-title>
				<v-card-text class="pt-3">
					{{ serviceDialogText }}
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="#555555" text @click="closeServiceDialog">
						Cancel
					</v-btn>
					<v-btn color="primary" text @click="deleteServiceFlow" :loading="deleteLoading">
						Delete
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<!-- terms Dialog -->

		<v-dialog width="32.63157894736842vw" v-model="termsDialog">
			<!-- Card Wrapper -->
			<v-card class="sessionDialogCard">
				<h3 class="sessionTitle"></h3>
				<v-tabs v-model="termsTab" vertical hide-slider active-class="termsTabActive" class="termsTab">
					<v-tab href="#description"> Description</v-tab>
					<v-tab href="#terms"> Terms </v-tab>
					<v-tab-item value="description" id="description">
						<h1 class="tabItemText"> Description</h1>
						<v-card-text> {{ selectedService.serviceDescription }}</v-card-text>
					</v-tab-item>
					<v-tab-item value="terms" id="terms">
						<v-list class="termsListBox" v-if="sampleTerms.length > 0">
							<v-list-item
								v-for="(term, i) in sampleTerms"
								:key="i"
								no-action
								class=" termsFont pl-1 elevation-3"
							>
								{{ i + 1 }}.<span class="termsItem ml-2">{{ term }} </span>
							</v-list-item>
						</v-list>
					</v-tab-item>
				</v-tabs>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import { functions, db } from '../../../plugins/firebase'
import AddServiceForm from './AddServiceForm.vue'

export default {
	name: 'ServiceTabs',
	components: { AddServiceForm },
	data: () => ({
		sampleTerms: [
			'First Example terms',
			'Second example term that is much longer than the first like a lot longer, so much longer.',
			'Do I really need a third?',
			'Definitely dont need a fourth',
		],
		createServiceLoading: false,
		serviceDialog: false,
		serviceDialogText: '',
		deleteLoading: false,
		deleteHover: false,
		selectedService: '',
		tab: 0,
		services: [],
		sessionsBlockingServiceDeletion: [],
		termsTab: '',
		termsDialog: false,
		newServiceName: '',
		serviceNameValid: false,
		nameRules: [(v) => !!v || '', (v) => (v && v.length >= 3) || '', (v) => (v && v.length <= 25) || ''],
	}),
	computed: {
		cssVars() {
			return {
				'--tabColor': this.selectedService.color,
			}
		},
	},
	mounted() {
		db.collection('services')
			.where('uid', '==', this.$user.uid)
			.where('active', '==', true)
			.onSnapshot((snapshot) => {
				this.$emit('service-tabs-reload')
				this.services = []
				snapshot.forEach((doc) => {
					this.services.push(doc.data())
				})
			})
	},

	methods: {
		async deleteServiceFlow() {
			const checkArray = this.selectedService.sessionDocIdArray
			if (checkArray.length < 1) {
				this.deleteServiceDoc()
			} else {
				checkArray.forEach((id) => {
					db.collection('sessions')
						.doc(id)
						.get()
						.then((doc) => {
							const sessionData = doc.data()
							if (sessionData.status == 'booked') {
								this.sessionsBlockingServiceDeletion.push(sessionData)
								this.displaySessionsBlockingServiceDeletion()
							} else {
								this.deleteServiceDoc()
							}
						})
				})
			}
		},
		async deleteServiceDoc() {
			const deleteServiceDoc = functions.httpsCallable('deleteService')
			this.deleteLoading = true
			await deleteServiceDoc({ id: this.selectedService.id }).then(() => {
				this.serviceDialog = false
				this.deleteLoading = false
				this.passService(null)
				this.selectedService = ''
				this.tab = 'start'
			})
		},
		displaySessionsBlockingServiceDeletion() {
			const toDisplay = []
			this.sessionsBlockingServiceDeletion.forEach((session) => {
				toDisplay.push(` ${session.name} at ${session.start}`)
				toDisplay.join(', ')
			})
			const text = `The following sessions must be rendered still: ${toDisplay}! You must handle cancellations of purchased services individually.`
			this.serviceDialogText = text
			this.serviceDialog = true
		},
		async createService(e) {
			this.createServiceLoading = true
			const createService = functions.httpsCallable('createService')
			await createService({ ...e })
				.then(() => {
					this.tab = 'start'
					this.newServiceName = ''
					this.selectedService = ''
					this.createServiceLoading = false
				})
				.catch((err) => {
					console.error(err)
				})
		},
		serviceDeletePrompt(e) {
			this.serviceDialog = true
			this.serviceDialogText = 'Are you sure you want to delete this service?'
		},
		closeServiceDialog() {
			this.serviceDialog = false
			this.serviceDialogText = ''
		},
		passService(e) {
			this.selectedService = e
			this.$emit('pass-service', e)
		},
		openTerms() {
			this.termsTab = 'terms'
			this.termsDialog = true
		},
		openDescription() {
			this.termsTab = 'description'
			this.termsDialog = true
		},
	},
}
</script>

<style scoped>
#toolTip {
	text-align: center;
	max-width: 14vw;
}
.tagItemDiv {
	display: flex;
}
.tagsIcon {
	align-self: flex-start;
	padding-top: 0.15vw;
}
a:hover {
	color: white;
}
>>> .termsTab .theme--dark.v-tabs-items {
	height: 9.210526315789474vw;
	padding: 1.0526315789473684vw;
	border-radius: 10px;
	overflow-y: scroll;
}
>>> .termsTab .v-tab {
	color: #fa4b6b;
	margin-right: 0.5208333333333334vw;
	width: 8.315789473684211vw;
	text-transform: none;
	justify-content: right;
	font: normal 500 1.0526315789473684vw Poppins;
}
>>> .termsTab.theme--dark.v-tabs > .v-tabs-bar {
	background-color: transparent;
}
.sessionTitle {
	font: normal 600 1.3157894736842106vw Poppins;
	letter-spacing: 0.06578947368421052vw;
	color: white;
	margin-bottom: 1.1578947368421053vw;
}
.tabItemText {
	font: normal 600 0.9473684210526315vw Arboria;
}
.sessionDialogCard {
	padding: 1.5vw;
	min-height: 18.105263157894736vw;
	background-color: #222222;
	border-radius: 10px;
}
.serviceWrapperCard {
	height: 9.2vw;
	max-width: 64.16666666666667vw;
	background-color: green;

	overflow: hidden;
}
.serviceItemDiv {
	width: 14.583333333333334vw;
	height: 0.9375vw;
	margin-bottom: 0.625vw;
}
#addService {
	border: 5px solid #717171;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
}
.addServiceTab {
	background-color: #717171 !important;
	border: 1px solid #717171;
	border-right: none;
}
.addBtnText {
	font: normal bold 1.0416666666666667vw Poppins;
}
.startTab {
	border: none !important;
	min-width: 0px;
}
.tagsDiv {
	vertical-align: bottom;
	margin-left: 0.5vw;
	display: inline-block;
	max-width: 7.8125vw;
	overflow-x: hidden;
	height: 4.8041666666666665vw;
}
.deleteDiv {
	background-color: transparent;
	display: inline-block;
}
.deleteText {
	font: normal 500 0.729vw Poppins;
	color: #717171;
	padding-right: 0.5vw;
	cursor: pointer;
}
.deleteText:hover {
	color: #fa4b6b;
}
.trashIcon {
	color: #d4145a7c;
}
.trashIconHover {
	color: #d4145a;
	transform: rotateY(180deg);
}
.serviceTabRow {
	margin-left: 1vw;
	padding-left: 0;
}
.activeTab.v-card {
	color: white;
	border-color: transparent;
	border-width: 5px;
	border-style: solid;
	z-index: 1;
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
}
.serviceTabItemGroup {
	max-width: 48.229166666666664vw;
}
.noServiceMessage {
	font: normal 500 1vw Poppins;
	text-align: center;
	padding-top: 2vw;
}
.invisTab {
	min-width: 0px !important;
	border: none !important;
}

.tagDetailsDiv {
	margin-bottom: 0.78125vw;
	height: 4.145vw;
}
.label {
	font: normal normal 0.78125vw Arboria;
	color: #717171;
	width: 3.4vw;
	display: inline-block;
}
.tagLabel {
	font: normal normal 0.78125vw Arboria;
	color: #717171;
	width: 3.2vw;
	display: inline-block;
	vertical-align: top;
}
.labelLong {
	font: normal normal 0.78125vw Arboria;
	color: #717171;
	width: 6.2vw;
	display: inline-block;
}
.descriptionDiv {
	background-color: #111111;
	width: 100%;
	border-radius: 5px;
	height: 7.291666666666667vw;
	overflow-y: scroll;
	margin-bottom: 0.8vw;
	margin-right: 1vw;
}
.value {
	padding-left: 1vw;
	font: normal normal 0.78125vw Poppins;
}
.titleValue {
	display: inline-block;
	padding-left: 1vw;
	max-width: 10.0208333333333335vw;
	overflow-x: scroll;
	font: normal bold 0.78125vw Poppins;
}
/* deep selector needed to apply vuetify style change to scoped style */

>>> .serviceTabs .v-tab.v-tab--active {
	color: #000000;
	font-weight: bold !important;
	z-index: 3;
	border-bottom-right-radius: 0;
	background-color: var(--tabColor);
}
.theme--dark.v-tabs .v-tab:hover::before {
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	background: transparent;
}
>>> .tabs .v-item-group {
	max-width: 15.9375vw;
}
.v-input {
	font-weight: bold;
	font-size: 1.2em;
}
.serviceTabs .v-tab {
	background-color: #1e1e1e;
	border-bottom-left-radius: 5px;
	border-top-left-radius: 5px;
	min-height: 3.01vw;
	padding-top: 0.26vw;
	padding-right: 0.25vw;
	padding-left: 0.25vw;
	padding-left: 1vw;
	display: flex;
	justify-content: flex-start;
	max-width: 15.9375vw;
	min-width: 15.9375vw;
	text-transform: none;
	font: normal normal 0.78125vw Poppins;
}
.saveBtn {
	background-color: #d23b59;
	color: white;
	font: normal normal 0.78125vw/0.78125vw Poppins;
}
.tabTitle {
	display: block;
	margin-bottom: 0.10416vw;
	font: normal normal 0.78125vw Poppins;
	color: white;
}
.tabService {
	margin-top: 0.10416vw;
	display: flex;
	text-align: left;
	font: normal 500 0.9375vw/0.9375vw Poppins;
	margin-left: 0.2vw;
	max-width: 14vw;
	min-width: 3.5vw;
	color: white;
	margin-bottom: 0;
}
.serviceColorDiv {
	min-height: 100%;
	width: 5vw;
	float: right;
	color: white;
	padding-left: 0.25vw;
	font-family: Arboria;
	font-weight: 500;
}
.colorLabel {
	float: left;
	vertical-align: middle;
	line-height: 0.78125vw;
}
.colorWrapDiv {
	margin-top: 1vw;
	height: 0.8vw;
}
</style>
