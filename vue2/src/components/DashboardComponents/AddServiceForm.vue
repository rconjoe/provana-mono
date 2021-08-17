<template>
	<div>
		<!-- form validation tied to disabling of create button -->
		<v-form v-model="valid" ref="serviceForm">
			<v-card class="pa-2 formCard" width="48.229166666666664vw" height="9.1vw" color="#1E1E1E">
				<!-- card text element applies x-padding -->
				<v-card-text class="py-0">
					<v-row>
						<!-- 1/3 Col -->
						<v-col class="px-0 ">
							<!-- Price -->
							<div class="serviceItemDiv">
								<v-tooltip right max-width="14vw" color="#333333">
									<template v-slot:activator="{ on, attrs }">
										<v-icon size="0.78125vw" color="#333333" class="mr-2" v-on="on" v-bind="attrs"
											>fas fa-exclamation-circle
										</v-icon>
									</template>
									<span> Price of your service should be rounded to the nearest dollar.</span>
								</v-tooltip>
								<span class="label">
									Price:
								</span>
								<v-text-field
									data-test="servicePrice-input"
									class="pt-1 mt-0 inputText"
									id="servicePrice"
									v-model.number="form.serviceCost"
									color="#fff"
									type="number"
									:rules="hoursRules"
									required
								>
									<v-icon slot="prepend-inner" size=".8vw"> fas fa-dollar-sign</v-icon>
								</v-text-field>
							</div>

							<!-- Length -->
							<div class="serviceItemDiv">
								<v-tooltip right max-width="14vw" color="#333333">
									<template v-slot:activator="{ on, attrs }">
										<v-icon size="0.78125vw" color="#333333" class="mr-2" v-on="on" v-bind="attrs"
											>fas fa-exclamation-circle
										</v-icon>
									</template>
									<span>Duration of the event in 15 min increments.</span>
								</v-tooltip>
								<span class="label">
									Length:
								</span>
								<!-- Hours -->
								<div class="lengthCol mr-1">
									<v-select
										data-test="serviceHours-input"
										class="pt-0 mt-0 lengthInput inputText"
										v-model="form.serviceHours"
										color="#fff"
										single-line
										:items="[0, 1, 2, 3, 4]"
									>
										<small slot="append" class="secondary--text small"> Hrs</small>
									</v-select>
								</div>
								<!-- Minutes -->
								<div class="lengthCol">
									<v-select
										data-test="serviceMinutes-input"
										class="pt-0 mt-0 lengthInput inputText"
										v-model="form.serviceMinutes"
										color="#fff"
										single-line
										min="0"
										:items="minutes"
									>
										<small slot="append" class="secondary--text small"> Mins</small>
									</v-select>
								</div>
							</div>

							<!-- Buyers -->
							<div class="serviceItemDiv">
								<v-tooltip right max-width="14vw" color="#333333">
									<template v-slot:activator="{ on, attrs }">
										<v-icon size="0.78125vw" color="#333333" class="mr-2" v-on="on" v-bind="attrs"
											>fas fa-exclamation-circle
										</v-icon>
									</template>
									<span> Number of potential buyers that can join this service.</span>
								</v-tooltip>
								<h3 class="label">
									Buyers
								</h3>
								<v-text-field
									data-test="buyers-input"
									class="pt-0 mt-0 buyers inputText"
									v-model.number="form.attendees"
									color="#fff"
									single-line
									type="number"
									required
									:rules="hoursRules"
								>
								</v-text-field>
								<!-- If more than one buyer is it mandatory fill? -->
								<div class="inline" v-if="form.attendees > 1">
									<v-tooltip right color="#1e1e1e" max-width="8vw">
										<template v-slot:activator="{ on, attrs }">
											<div class="inline ml-4" v-bind="attrs" v-on="on">
												<v-checkbox v-model="form.mandatoryFill" class="checkbox mt-0 pt-0" label="Mandatory" dense>
													test
												</v-checkbox>
											</div>
										</template>
										<span class="tooltip">Must sell all slots before start date or session will be canceled</span>
									</v-tooltip>
								</div>
							</div>
							<!-- Software -->
							<div class="serviceItemDiv">
								<v-tooltip right max-width="14vw" color="#333333">
									<template v-slot:activator="{ on, attrs }">
										<v-icon size="0.78125vw" color="#333333" class="mr-2" v-on="on" v-bind="attrs"
											>fas fa-exclamation-circle
										</v-icon>
									</template>
									<span> List of required software or games needed to complete the service ie. Discord, Minecraft</span>
								</v-tooltip>
								<h3 class="label"> Software: </h3>
								<v-text-field
									data-test="software-input"
									class="pt-0 mt-0 inputText"
									v-model="form.software"
									color="#fff"
									single-line
									counter="20"
									:rules="softwareRules"
									required
								>
								</v-text-field>
							</div>
						</v-col>

						<!-- 2/3 Col  -->
						<!-- Platform -->
						<v-col class="px-0">
							<div class="serviceItemDiv">
								<v-tooltip right max-width="14vw" color="#333333">
									<template v-slot:activator="{ on, attrs }">
										<v-icon size="0.78125vw" color="#333333" class="mr-2" v-on="on" v-bind="attrs"
											>fas fa-exclamation-circle
										</v-icon>
									</template>
									<span> PC, Xbox360, PS4 etc...</span>
								</v-tooltip>
								<h3 class="label"> Platform:</h3>
								<v-text-field
									data-test="platform-input"
									class="pt-0 mt-0 inputText"
									v-model="form.platform"
									color="#fff"
									single-line
									:rules="platformRules"
									required
									counter="20"
								>
								</v-text-field>
							</div>

							<!-- Tags -->
							<div class="tagItemDiv">
								<v-tooltip right max-width="14vw" color="#333333">
									<template v-slot:activator="{ on, attrs }">
										<v-icon size="0.78125vw" color="#333333" class="mr-2 tagsIcon" v-on="on" v-bind="attrs"
											>fas fa-exclamation-circle
										</v-icon>
									</template>
									<span> Tags are searchable terms to help users find your service.</span>
								</v-tooltip>
								<h3 class="label">
									Tags:
								</h3>
								<v-combobox
									multiple
									clearable
									small-chips
									:delimiters="[' ', ',']"
									v-model="form.tags"
									class="inputText combobox pt-0"
									append-icon=""
									color="white"
									:readonly="form.tags.length >= 3"
								>
								</v-combobox>
							</div>

							<!-- Add Terms / Description -->
							<div class="serviceItemDiv">
								<a class="termsLink" @click="openDescriptionForm"> <span>+ Add Description </span> </a>
								<a class="termsLink" @click="openTermsForm"> <span>+ Add Terms </span> </a>
							</div>
						</v-col>

						<!-- 3/3 Col -->
						<v-col class="px-0">
							<!-- ColorPicker are swatches -->
							<div>
								<v-color-picker
									v-model="form.serviceColor"
									class="colorPicker"
									hide-inputs
									hide-mode-switch
									canvas-height="80"
								>
								</v-color-picker>
							</div>

							<!-- form action buttons -->
							<div v-if="!serviceLoading">
								<v-spacer></v-spacer>

								<v-btn height="1.5625vw" data-test="cancel-input" id="cancelBtn" class="btnCTA" @click="cancelCreate">
									Reset
								</v-btn>
								<v-btn
									height="1.5625vw"
									color="secondary"
									dense
									data-test="save-input"
									:disabled="!descriptionValid || !termsValid || !valid || !serviceNameValid"
									class="btnCTA"
									@click.prevent="createService"
								>
									Create
								</v-btn>
							</div>
							<div v-else>
								<v-progress-circular indeterminate color="primary"></v-progress-circular>
							</div>
						</v-col>
					</v-row>
				</v-card-text>
			</v-card>
		</v-form>
		<!-- end form -->

		<!-- Terms / description Dialog  -->
		<v-dialog width="32.63157894736842vw" v-model="termsFormDialog">
			<v-card class="sessionDialogCard">
				<v-tabs v-model="termsTab" vertical hide-slider active-class="termsTabActive" class="termsTab">
					<!-- Tab -->
					<v-tab href="#description"> Description</v-tab>
					<v-tab href="#terms"> Terms </v-tab>
					<!-- Tab Item -->
					<v-tab-item value="description" id="description">
						<v-card-text>
							<v-form v-model="descriptionValid" ref="serviceForm">
								<v-textarea v-model="form.serviceDescription" :rules="descriptionRules"> </v-textarea>
							</v-form>
						</v-card-text>
					</v-tab-item>
					<v-tab-item value="terms" id="terms">
						<v-card-text>
							<v-form v-model="termsValid" ref="serviceForm">
								<v-textarea v-model="form.terms" :rules="descriptionRules"> </v-textarea>
							</v-form>
						</v-card-text>
					</v-tab-item>
				</v-tabs>
				<!-- Dialog Actions -->
				<v-card-actions>
					<v-spacer> </v-spacer>
					<v-btn class="btnCTA" width="4vw" @click="termsFormDialog = false">Close </v-btn>
					<v-btn class="btnCTA" width="4vw" color="primary" @click="termsFormDialog = false"> Save </v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
	// serviceName and its validator are passed as props from serviceTabs
	export default {
		name: 'AddServiceForm',
		props: ['profile', 'serviceNameProp', 'serviceNameValid'],
		data: () => ({
			termsTab: 'terms',
			termsFormDialog: false,
			valid: false,
			descriptionValid: false,
			termsValid: false,
			viewingUID: '',
			closeOnContentClick: false,
			serviceLoading: false,
			form: {
				terms: '',
				mandatoryFill: false,
				serviceName: '',
				serviceCost: null,
				serviceDescription: '',
				serviceHours: null,
				serviceMinutes: null,
				serviceLength: null,
				attendees: null,
				tags: [],
				software: '',
				platform: '',
				serviceColor: { hex: '#FA4B6B' },
				uid: '',
				active: true,
			},
			minutes: [15, 30, 45, 0],
			hoursRules: [(v) => !!v || '', (v) => v >= 0 || null || ''],
			productRules: [
				(v) => !!v || 'A Product Type is required',
				(v) => (v && v.length <= 25) || 'Product Type must be shorter than 25 characters',
			],
			platformRules: [(v) => !!v || '', (v) => (v && v.length <= 20) || ''],
			softwareRules: [(v) => !!v || '', (v) => (v && v.length <= 20) || ''],
			descriptionRules: [(v) => !!v || '', (v) => (v && v.length <= 120) || ''],
		}),
		methods: {
			createService() {
				const hoursToMinutes = this.form.serviceHours * 60
				const minutesLength = hoursToMinutes + this.form.serviceMinutes
				const hexColor = this.form.serviceColor.hex
				this.form.color = hexColor
				this.form.serviceColor = hexColor
				this.form.serviceName = this.serviceNameProp
				this.form.serviceLength = minutesLength
				this.form.uid = this.$user.uid
				this.$emit('create-service', this.form)
				this.form = {
					serviceName: '',
					serviceCost: null,
					serviceDescription: '',
					serviceHours: null,
					serviceMinutes: null,
					serviceLength: null,
					attendees: null,
					tags: [],
					software: '',
					platform: '',
					mandatoryFill: false,
					serviceColor: { hex: '#FA4B6B' },
					uid: '',
				}
				this.cancelCreate()
			},
			openTermsForm() {
				this.termsTab = 'terms'
				this.termsFormDialog = true
			},
			openDescriptionForm() {
				this.termsTab = 'description'
				this.termsFormDialog = true
			},
			cancelCreate() {
				this.$refs.serviceForm.resetValidation()
				this.form = {
					serviceName: '',
					serviceCost: null,
					serviceDescription: '',
					serviceHours: null,
					serviceMinutes: null,
					serviceLength: null,
					attendees: null,
					tags: [],
					software: '',
					platform: '',
					mandatoryFill: false,
					serviceColor: { hex: '#FA4B6B' },
					uid: '',
				}
			},
		},
	}
</script>

<style scoped>
	/* color picker controls padding */
	>>> .v-color-picker__controls {
		padding: 0;
		padding-top: 0.5vw;
		height:38px;
	}
	/* colorpicker alpha slider hide */
	>>> .v-color-picker__alpha:not(.v-input--is-disabled) .v-slider {
		display: none;
	}
	/* colorpicker preview dot size */
	>>> .v-color-picker__dot {
		height: 20px;
		width: 20px;
	}
	/* colorpicker hue slider alignment */
	>>> .v-color-picker__sliders {
		margin-top: 0.20833333333333334vw;
	}
	/* colorpicker preview dot alignment */
	>>> .v-color-picker__preview {
		align-items: flex-start;
	}
	/* text size of tags chip text */
	>>> .v-chip.v-size--small {
		font-size: 0.78125vw;
	}
	/* buttongroup btn height  */
	.v-btn-toggle:not(.v-btn-toggle--dense) .v-btn.v-btn.v-size--default {
		height: 1.5625vw;
		font: normal bold 0.78125vw Poppins;
	}
	.tagsIcon {
		align-self: flex-start;
		padding-top: 0.15vw;
	}
	.btnGroup {
		max-height: 1.5625vw;
	}
	>>> .v-color-picker[data-v-c44ffd26] {
		border: none;
		background-color: transparent !important;
	}
	.termsLink:hover {
		color: white;
	}
	.termsDialogSaveBtn {
		align-self: flex-end;
	}
	>>> .termsTab .theme--dark.v-tabs-items {
		height: 9.210526315789474vw;
		border-radius: 10px;
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
	.sessionDialogCard {
		padding: 1.5vw;
		min-height: 18.105263157894736vw;
		background-color: #222222;
		border-radius: 10px;
	}
	.termsLink {
		margin-right: 1.4vw;
		font: normal normal 0.71vw Arboria;
	}
	.tagItemDiv {
		display: flex;
		height: 3.6041666666666665vw;
		width: 14vw;
		padding-top: 0.8vw;
		margin-bottom: 0.625vw;
	}
	>>> .combobox .v-select__slot {
		max-height: 2.6041666666666665vw;
		max-width: 7.645833333333334vw;
		overflow-y: scroll;
		overflow-x: hidden;
		white-space: nowrap;
		align-items: flex-start;
	}
	>>> .checkbox .v-icon.v-icon--dense {
		font-size: 16px;
	}
	.checkbox {
		display: inline-block;
	}
	.inline {
		display: inline;
	}
	.serviceItemDiv {
		width: 14.6vw;
		height: 1.2vw;
		margin-bottom: 0.5vw;
	}
	.formCard {
		max-height: 8.5vw;
		overflow: scroll;
	}
	.serviceColorDiv {
		margin-left: 0.25vw;
		min-height: 1vw;
		width: 5vw;
		float: right;
		color: white;
		padding-left: 0.25vw;
		font-family: Arboria;
		font-weight: 500;
		cursor: pointer;
	}
	.inputRow {
		margin-top: 0;
	}
	.label {
		font: normal normal 0.71vw Arboria;
		color: #717171;
		width: 3.5vw;
		display: inline-block;
	}
	.labelCol {
		max-width: 3.4375vw;
		padding-top: 0;
		padding-bottom: ;
	}
	.longLabelCol {
		padding-top: 0;
		width: 5vw;
	}
	.inputCol {
		padding-top: 0;
		padding-bottom: 0.25vw;
	}

	>>> .v-chip .v-chip__close.v-icon {
		font-size: 14px !important;
		max-height: 12px;
		max-width: 12px;
	}
	.v-color-picker {
		background-color: #111111 !important;
		border: 2px solid #717171;
	}
	>>> .v-color-picker__swatches > div {
		padding-left: 0;
		justify-content: left;
	}
	.small {
		font-size: 1vm;
		position: absolute;
		bottom: 0;
		margin-left: 0.3vw;
	}
	.lengthCol {
		max-width: 4vw;
		display: inline-block;
		margin-right: 2vw;
	}
	.buyers {
		max-width: 2vw !important;
	}
	.price {
		max-width: 2vw;
	}
	.lengthInput {
		margin-right: 1.5vw;
		width: 2vw;
	}

	.saveBtn {
		font: normal normal bold 1vw Poppins;
	}
	#cancelBtn {
		background-color: #717171;
		color: black;
		margin-right:0.4166666666666667vw
	}
	#cancelBtn:hover{
		color:#fb4b6a;
	}
	

	.inputText {
		font: normal normal 0.78125vw Arboria;
		padding-bottom: 0 !important;
		display: inline-block;
		max-width: 8vw;
	}
	>>> .inputText.v-text-field input {
		padding: 0 !important;
	}
	>>> .inputText .v-select__selection--comma {
		margin: 0;
	}
	.descriptionText {
		font: normal normal 0.78125vw/0.78125vw Poppins;
	}

	>>> .v-input {
		margin-top: 0;
	}
</style>
