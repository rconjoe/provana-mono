<template>
	<div class="newServiceContainer " ref="formBox">
		<div class="d-flex justify-center my-auto fill-height" v-if="!showForm" @click="animateForm">
			<v-icon color="#ED2970" class="mr-1" size="14px"> fas fa-plus </v-icon>
			<h2 class="newServiceBtn"> New Service </h2>
		</div>

		<div v-show="showForm" class="fill-height">
			<v-form ref="serviceForm" class="fieldsContainer" @submit.prevent="createService" v-model="serviceValid">
				<!-- Header -->
				<h1 class="field"> New Service </h1>
				<!-- Title -->
				<div class="field" :key="1">
					<v-text-field v-model="form.serviceName" :rules="nameRules" hide-details class="pt-0">
						<span class="titleLabel" slot="prepend"> Title: </span>
					</v-text-field>
				</div>

				<!-- Image upload -->
				<div class="field" :key="2">
					<div class="pictureTip">
						<Tooltip color="#222222" bgColor="#222222">
							16:9 image that will represent your service.
						</Tooltip>
					</div>
					<div>
						<h3 class="label mb-4 align-self-start" slot="prepend"> Service Picture: </h3>
						<h3 class="link" @click="pictureOverlay = !pictureOverlay"> Add </h3>
					</div>
					<v-img
						class="serviceImg"
						src="https://dummyimage.com/1920x960/1e1e1e/dbdbdb"
						ratio="16/9"
						max-width="174"
					>
					</v-img>
					<Overlay :overlay="pictureOverlay" @close-overlay="pictureOverlay = !pictureOverlay">
						<span slot="title"> Service Picture </span>
						<div slot="content">
							<v-file-input @change="processStorePic($event)" truncate-length="15"></v-file-input>

							<v-btn @click="uploadStorePic" color="#fa4b6b" text :ripple="false"> Save </v-btn>
							<v-btn @click="pictureOverlay = !pictureOverlay" color="#666666" text :ripple="false">
								Cancel
							</v-btn>
						</div>
					</Overlay>
				</div>

				<!-- ColorPicker -->
				<div class="field mt-2" :key="3">
					<div>
						<Tooltip color="#222222" bgColor="#222222">
							Service color that will be represented on your calendar when scheduling.
						</Tooltip>
					</div>
					<span class="label align-self-start" slot="prepend"> Service Color: </span>
					<v-color-picker
						v-model="form.serviceColor"
						class="colorPicker mb-2"
						hide-inputs
						hide-mode-switch
						width="174px"
						canvas-height="60"
					>
					</v-color-picker>
				</div>

				<!-- Price -->
				<div class="field" :key="4">
					<Tooltip color="#222222" bgColor="#222222">
						Price of your service should be rounded to the nearest dollar.
					</Tooltip>
					<span class="label"> Price: </span>
					<v-text-field
						data-test="servicePrice-input"
						class="pt-1 mt-0 inputText"
						v-model.number="form.serviceCost"
						color="#fff"
						type="number"
						hide-details
						:rules="hoursRules"
						required
					>
						<v-icon size="20px" class="mt-2" slot="prepend" color="#cccccc">
							fas fa-dollar-sign
						</v-icon>
					</v-text-field>
				</div>

				<!-- Length -->
				<div class="field" :key="5">
					<Tooltip color="#222222" bgColor="#222222"> The time it will take to complete the service.</Tooltip>
					<span class="label "> Length: </span>
					<!-- hours -->
					<v-select
						class="pt-0 mt-0 mr-6 lengthInput inputText"
						v-model="form.serviceHours"
						color="#fff"
						style="max-width:94px"
						single-line
						:items="[0, 1, 2, 3, 4]"
					>
						<small slot="append-outer" class="white--text small mt-4"> Hrs</small>
					</v-select>
					<!-- mins -->
					<v-select
						class="pt-0 mt-0 "
						style="max-width:94px"
						v-model="form.serviceMinutes"
						color="#fff"
						single-line
						min="0"
						:items="minutes"
					>
						<small slot="append-outer" class="white--text small mt-4"> Mins</small>
					</v-select>
				</div>

				<!-- Buyers -->
				<div class="field" :key="6">
					<Tooltip color="#222222" bgColor="#222222">
						Number of poeple who can purchase the same session.
					</Tooltip>
					<span class="label"> Buyers:</span>
					<v-text-field
						class="pt-0 mt-0 mr-2"
						style="max-width:55px"
						v-model.number="form.attendees"
						color="#fff"
						single-line
						hide-details
						type="number"
						required
						:rules="hoursRules"
					>
					</v-text-field>

					<!-- Mandatory fill -->
					<div class="d-flex align-center ">
						<Tooltip color="#222222" bgColor="#222222">
							Session will automatically be canceld if the number of buyers is not met.</Tooltip
						>
						<span class="mr-2" style="color:#dbdbdb; font: normal 600 15px Arboria">Mandatory Fill?</span>
						<v-checkbox
							v-model="form.mandatoryFill"
							class="checkbox mt-1 pt-0 mx-0 align-self-center"
							hide-details
							:ripple="false"
							dense
						>
						</v-checkbox>
					</div>
				</div>

				<!-- Software -->
				<div class="field" :key="7">
					<Tooltip color="#222222" bgColor="#222222"> Software required to complete the service. </Tooltip>
					<span class="label"> Software:</span>
					<v-text-field
						data-test="software-input"
						class="pt-0 mt-0 inputText"
						v-model="form.software"
						color="#fff"
						single-line
						hide-details
						counter="20"
						:rules="softwareRules"
						required
					>
					</v-text-field>
				</div>

				<!-- Terms -->
				<div class="field" :key="8">
					<Tooltip color="#222222" bgColor="#222222">
						Terms the buyer must agree to before purchase.
					</Tooltip>
					<span class="label"> Terms:</span>
					<span class="link align-self-center" @click="termsOverlay = !termsOverlay"> Add Terms</span>
					<Overlay :overlay="termsOverlay" @close-overlay="termsOverlay = !termsOverlay">
						<span slot="title"> Service Terms</span>
						<div slot="content">
							<v-list class="termsListBox" v-if="form.terms.length > 0">
								<v-list-item
									v-for="(term, i) in form.terms"
									:key="i"
									no-action
									class="pl-1 elevation-3 d-flex justify-start "
								>
									{{ i + 1 }}.<span class="termsItem ml-2">{{ term }} </span>
									<v-icon class="deleteTerm" @click="termDelete(i)"> fas fa-times </v-icon>
								</v-list-item>
							</v-list>
							<v-form ref="termsForm" @submit.prevent="termsSubmit" v-model="termsValid">
								<v-text-field v-model="term">
									<v-icon slot="append-outer" @click="termsSubmit"> fas fa-paper-plane </v-icon>
								</v-text-field>
							</v-form>
						</div>
						<div class="termsSave d-flex justify-end" slot="buttons">
							<v-btn
								color="primary"
								class="btnCTA "
								width="110"
								:ripple="false"
								@click="termsOverlay = !termsOverlay"
							>
								Save
							</v-btn>
						</div>
					</Overlay>
				</div>

				<!-- Description -->
				<div class="field" :key="9">
					<Tooltip color="#222222" bgColor="#222222">
						Brief summary of the service to display in your storefront.
					</Tooltip>
					<span class="label"> Description:</span>
					<span class="link align-self-center" @click="descriptionOverlay = !descriptionOverlay">
						Add Description</span
					>
					<Overlay :overlay="descriptionOverlay" @close-overlay="descriptionOverlay = !descriptionOverlay">
						<span slot="title"> Service Description </span>
						<div slot="content">
							<v-form v-model="descriptionValid">
								<v-textarea
									color="white"
									no-resize
									v-model="form.serviceDescription"
									height="182px"
									class="descriptionTextarea pt-0"
									:rules="descriptionRules"
									counter="120"
								>
								</v-textarea>
							</v-form>
						</div>
						<div class="termsSave d-flex justify-end" slot="buttons">
							<v-btn
								color="primary"
								class="btnCTA"
								width="110"
								:ripple="false"
								@click="descriptionOverlay = !descriptionOverlay"
							>
								Save
							</v-btn>
						</div>
					</Overlay>
				</div>

				<!-- Tags -->
				<div class="field" :key="10">
					<Tooltip color="#222222" bgColor="#222222"> Keywords help searchability of your service. </Tooltip>
					<span class="label"> Tags:</span>
					<v-combobox
						clearable
						multiple
						small-chips
						:delimiters="[' ', ',']"
						v-model="form.tags"
						class="combobox  pt-0"
						color="white"
						:readonly="form.tags.length >= 6"
						deletable-chips
						append-icon=""
					>
					</v-combobox>
				</div>

				<!-- Action buttons -->
				<div class="field justify-end">
					<v-btn @click="animateForm" class="mr-4"> Cancel </v-btn>
					<v-btn
						:loading="createServiceLoading"
						type="submit"
						color="primary"
						:disabled="!serviceValid || !form.terms.length > 0 || !descriptionValid"
					>
						Submit
					</v-btn>
				</div>
			</v-form>
		</div>
	</div>
</template>

<script>
import { functions } from '../../../plugins/firebase'
import { gsap } from 'gsap'
import Overlay from '../../Overlay.vue'
import Tooltip from '../../Tooltip.vue'
export default {
	components: { Overlay, Tooltip },
	data: () => ({
		createServiceLoading: false,
		pictureOverlay: false,
		descriptionOverlay: false,
		termsOverlay: false,
		serviceValid: true,
		termsValid: true,
		descriptionValid: false,
		term: '',
		form: {
			terms: [],
			mandatoryFill: false,
			serviceName: '',
			serviceCost: null,
			serviceDescription: '',
			serviceHours: null,
			serviceMinutes: 0,
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
		platformRules: [(v) => !!v || '', (v) => (v && v.length <= 20) || ''],
		softwareRules: [(v) => !!v || '', (v) => (v && v.length <= 20) || ''],
		descriptionRules: [(v) => !!v || '', (v) => (v && v.length <= 120) || ''],
		nameRules: [(v) => !!v || '', (v) => (v && v.length >= 3) || '', (v) => (v && v.length <= 25) || ''],
		showForm: false,
	}),
	mounted() {
		this.formTween = gsap
			.timeline({ onReverseComplete: this.closeForm, onStart: this.openForm })
			.to(
				this.$refs.formBox,
				{
					height: '720px',
					duration: 0.3,
				},
				0
			)
			.from(
				'.field',
				{
					opacity: 0,
				},
				0
			)
			.pause(0)
	},
	methods: {
		animateForm() {
			if (this.showForm == false) {
				this.formTween.play()
			} else {
				this.formTween.reverse()
				this.form = {
					terms: [],
					mandatoryFill: false,
					serviceName: '',
					serviceCost: null,
					serviceDescription: '',
					serviceHours: null,
					serviceMinutes: 0,
					serviceLength: null,
					attendees: null,
					tags: [],
					software: '',
					platform: '',
					serviceColor: { hex: '#FA4B6B' },
					uid: '',
					active: true,
				}
			}
		},
		closeForm() {
			this.showForm = false
		},
		openForm() {
			this.showForm = true
		},
		processStorePic(event) {
			this.newStorePic = event
		},
		uploadStorePic() {
			console.log(this.newStorePic)
		},
		termsSubmit() {
			this.form.terms.push(this.term)
			this.term = ''
		},
		termDelete(i) {
			this.form.terms.splice(i, 1)
		},
		async createService() {
			const hoursToMinutes = this.form.serviceHours * 60
			const minutesLength = hoursToMinutes + this.form.serviceMinutes
			const hexColor = this.form.serviceColor.hex
			this.form.color = hexColor
			this.form.serviceColor = hexColor
			this.form.serviceLength = minutesLength
			this.form.uid = this.$user.uid
			this.createServiceLoading = true
			const createService = functions.httpsCallable('createService')
			await createService({ ...this.form })
				.then(() => {
					this.animateForm()
					this.createServiceLoading = false
				})
				.catch((err) => {
					console.error(err)
				})
		},
	},
}
</script>

<style scoped lang="scss">
.deleteTerm {
	color: #707070;
	justify-self: flex-end;
	margin-left: auto;
	cursor: pointer;
	z-index: 1;
}
.fieldsContainer {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
}
h1 {
	font: normal 600 30px/30px Poppins;
	letter-spacing: -1.5px;
	color: #555555;
}
.serviceImg {
	border-radius: 5px;
}
.label {
	color: #dbdbdb;
	margin-right: 10px;
	font: normal 600 15px Arboria;
	min-width: 83px;
	max-width: 83px;
	align-self: center;
}
.field {
	min-height: 35px;
	display: flex;
}
.link {
	color: #fa4b6b;
	font: normal 600 15px Arboria;
	text-decoration: underline;
	cursor: pointer;
}
.link:hover {
	color: white;
}
.newServiceContainer {
	width: 400px;
	height: 175px;
	background-color: #333333;
	padding: 25px;
	overflow-x: hidden;
}
.newServiceBtn {
	cursor: pointer;
	align-self: center;
	font: normal 600 20px Poppins;
	letter-spacing: -1px;
	color: #ed2970;
}
.titleLabel {
	font: normal 600 20px Poppins;
	letter-spacing: -1px;
}
.termsButton {
	margin-right: 55px;
	margin-top: 55px;
}
.descriptionTextarea {
	font: normal 500 15px Poppins;
	min-height: 100%;
}
// tags select box style
::v-deep .combobox .v-select__selections {
	max-height: 58px;
	overflow-y: scroll;
	overflow-x: hidden;
	white-space: nowrap;
	align-items: flex-start;
}
/* colorpicker alpha slider hide */
::v-deep .v-color-picker__alpha:not(.v-input--is-disabled) .v-slider {
	display: none;
}
/* colorpicker preview dot size */
::v-deep .v-color-picker__dot {
	height: 20px;
	width: 20px;
}
/* colorpicker hue slider alignment */
::v-deep .v-color-picker__sliders {
	margin-top: 4px;
}
/* colorpicker preview dot alignment */
::v-deep .v-color-picker__preview {
	align-items: flex-start;
}
::v-deep .v-color-picker__controls {
	padding: 0;
	padding-top: 12px;
	max-height: 32px;
}
::v-deep .v-color-picker[data-v-c44ffd26] {
	border: none;
	background-color: transparent !important;
}
::v-deep .v-color-picker {
	border: none;
	background-color: transparent !important;
}
// input padding
::v-deep .v-text-field input {
	padding-bottom: 2px;
}
// selection spacing
@media screen and (max-width: 400px) {
	.newServiceContainer {
		padding: 5px;
		max-width: 375px;
	}
}
</style>
