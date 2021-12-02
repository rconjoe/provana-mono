<template>
	<div class="underContainer" :style="cssProps" ref="serviceCard">
		<div class="serviceContainer">
			<h1 :style="cssProps"> {{ service.serviceName }}</h1>
			<!-- service picture -->
			<div class="fieldContainer">
				<div class="mt-1">
					<Tooltip> 16:9 image that will represent your service. </Tooltip>
				</div>
				<div>
					<h2 class="label"> Service Picuture: </h2>
					<h3 class="link mt-4" @click="pictureOverlay = !pictureOverlay"> Change </h3>
				</div>
				<v-img class="serviceImg" :src="service.serviceImage" ratio="16/9" max-width="174"> </v-img>
				<Overlay :overlay="pictureOverlay" @close-overlay="pictureOverlay = !pictureOverlay">
					<span slot="title"> Service Picture </span>
					<div slot="content">
						<v-img class="serviceImg" :src="this.previewUrl" ratio="16/9" max-width="174"> </v-img>
						<v-file-input @change="processServicePic($event)" truncate-length="15"> </v-file-input>
						<div class="d-flex justify-end">
							<v-btn @click="cancelServicePic" color="#666666" text :ripple="false">
								Cancel
							</v-btn>
							<v-btn @click="uploadServicePic(service.id)" color="#fa4b6b" text :ripple="false">
								Save
							</v-btn>
						</div>
					</div>
				</Overlay>
			</div>
			<!-- Color -->
			<div class="fieldContainer">
				<div class="mt-1">
					<Tooltip> Service color that will be represented on your calendar when scheduling. </Tooltip>
				</div>
				<span class="label"> Service Color: </span>
				<div class="colorBox align-self-center" :style="cssProps">
					<span> {{ service.color }} </span>
				</div>
			</div>
			<!-- Price -->
			<div class="fieldContainer">
				<div class="d-flex align-content-center ">
					<Tooltip> Price of your service should be rounded to the nearest dollar. </Tooltip>
				</div>
				<span class="label"> Price: </span>
				<div class="value"> ${{ service.serviceCost }} </div>
			</div>
			<!-- Length -->
			<div class="fieldContainer">
				<div class="d-flex align-content-center ">
					<Tooltip> Duration of this service in minutes. </Tooltip>
				</div>
				<span class="label"> Length: </span>
				<div class="value"> {{ service.serviceLength }} min </div>
			</div>
			<!-- Buyers -->
			<div class="fieldContainer">
				<div class="d-flex align-content-center ">
					<Tooltip> Number of poeple who can purchase the same session. </Tooltip>
				</div>
				<span class="label"> Buyers: </span>
				<div class="value mr-4"> {{ service.attendees }} </div>
				<Tooltip color="warning" v-if="service.mandatoryFill == true">
					session will cancel automatically unless all buyers are met.
				</Tooltip>
			</div>
			<!-- Software -->
			<div class="fieldContainer">
				<div class="d-flex align-content-center ">
					<Tooltip> Software required to complete the service.</Tooltip>
				</div>
				<span class="label"> Software: </span>
				<div class="value"> {{ service.software }} </div>
			</div>
			<!-- Tags -->
			<div class="fieldContainer">
				<div class="d-flex align-content-center ">
					<Tooltip> Keywords help searchability of your service. </Tooltip>
				</div>
				<span class="label"> Tags: </span>
				<div class="value">
					<span v-for="tag in service.tags" :key="tag">{{ tag }}, </span>
				</div>
			</div>
			<!-- Terms -->
			<div class="fieldContainer">
				<div class="d-flex align-content-center ">
					<Tooltip> Terms the buyer must agree to before purchase. </Tooltip>
				</div>
				<span class="label"> Terms: </span>
				<div class="value">
					<span class="link" @click="termsOverlay = !termsOverlay"> View Terms </span>
				</div>
			</div>
			<!-- Description -->
			<div class="fieldContainer">
				<div class="d-flex align-content-center ">
					<Tooltip> Brief summary of the service to display in your storefront. </Tooltip>
				</div>
				<span class="label"> Description: </span>
				<div class="value">
					<span class="link" @click="descriptionOverlay = !descriptionOverlay"> View Description </span>
				</div>
			</div>
			<!-- delete button -->

			<div class=" fieldContainer d-flex justify-end">
				<h2 class="link" @click="deleteServiceFlow"> Delete Service</h2>
			</div>
		</div>
		<!-- Terms overlay -->
		<Overlay :overlay="termsOverlay" @close-overlay="termsOverlay = !termsOverlay">
			<p slot="title"> Terms </p>
			<v-list slot="content" class="termsListBox" v-if="service.terms.length > 0">
				<v-list-item v-for="(term, i) in service.terms" :key="i" no-action class=" termsFont pl-1 elevation-3">
					{{ i + 1 }}.<span class="termsItem ml-2">{{ term }} </span>
				</v-list-item>
			</v-list>
		</Overlay>
		<!-- Description Overlay -->
		<Overlay :overlay="descriptionOverlay" @close-overlay="descriptionOverlay = !descriptionOverlay">
			<p slot="title"> Description </p>
			<p slot="content"> {{ service.serviceDescription }}</p>
		</Overlay>

		<Overlay :overlay="deleteOverlay" @close-overlay="deleteOverlay = !deleteOverlay">
			<span slot="title"> Delete Service? </span>
			<!-- If there are sessions blocking Deletion -->
			<div slot="content" v-if="sessionsBlockingServiceDeletion.length > 0">
				<p class="mb-4">
					The following sessions are booked in association with this service. You will need to cancel these
					sessions to be able to delete this service.
				</p>
				<v-list slot="content">
					<v-list-item
						v-for="(session, i) in sessionsBlockingServiceDeletion"
						:key="i"
						no-action
						class=" pl-1 elevation-3"
					>
						{{ i + 1 }}.<span class=" ml-2">{{ session.name }} @ {{ formatTime(session.start) }} </span>
					</v-list-item>
				</v-list>
			</div>

			<!-- If there are no sessions Blocking deletion -->
			<div slot="content" v-else>
				<h2> Are you sure?</h2>
				<p>
					Deleting this service is permanent and will remove all instances of this service from your
					schedule.</p
				>
			</div>
			<div class="termsSave d-flex justify-end" slot="buttons" v-if="!deleteLoading">
				<v-btn
					color="#333333"
					class=" btnCTA termsButton mr-4"
					width="110"
					:ripple="false"
					@click="deleteOverlay = !deleteOverlay"
				>
					Cancel
				</v-btn>
				<v-btn
					color="primary"
					class="btnCTA termsButton"
					width="110"
					:ripple="false"
					:disabled="sessionsBlockingServiceDeletion.length > 0"
					@click="animateDelete"
				>
					Delete
				</v-btn>
			</div>

			<div class="termsSave d-flex justify-end" slot="buttons" v-else>
				<v-progress-circular indeterminate color="primary"> </v-progress-circular>
			</div>
		</Overlay>
	</div>
</template>

<script>
import Tooltip from '../../Tooltip.vue'
import Overlay from '../../Overlay.vue'
import gsap from 'gsap'
import { db, functions, storage } from '../../../plugins/firebase'
import { formatter } from '../../../plugins/sessionFormatter'

import dayjs from 'dayjs'
export default {
	components: { Tooltip, Overlay },
	props: ['service'],
	data: () => ({
		servicePicFile: '',
		previewUrl: 'https://dummyimage.com/348x196/1e1e1e/dbdbdb',
		pictureOverlay: false,
		termsOverlay: false,
		descriptionOverlay: false,
		deleteLoading: false,
		deleteOverlay: false,
		sessionsBlockingServiceDeletion: [],
	}),
	methods: {
		processServicePic(event) {
			this.servicePicFile = event
			this.previewUrl = URL.createObjectURL(this.servicePicFile)
		},
		cancelServicePic() {
			this.previewUrl = 'https://dummyimage.com/348x196/1e1e1e/dbdbdb'
			this.pictureOverlay = !this.pictureOverlay
		},
		async uploadServicePic(service) {
			const storageRef = storage.ref()
			const pictureName = 'Storefront-Services/' + this.$user.uid + '/' + service
			const pictureFileRef = storageRef.child(pictureName)
			await pictureFileRef.put(this.servicePicFile)
			const uploadUrl = await pictureFileRef.getDownloadURL()
			// this.updateServicePic(service, uploadUrl)
			console.log(uploadUrl)
		},
		async updateServicePic(service, imageUrl) {
			db.collection('services')
				.doc(service)
				.update({
					serviceImage: imageUrl,
				})
				.catch((err) => {
					console.error(err)
				})
		},
		async deleteServiceFlow() {
			const checkArray = this.service.sessionDocIdArray
			if (checkArray.length < 1) {
				this.deleteOverlay = true
			} else {
				checkArray.forEach((id) => {
					db.collection('sessions')
						.doc(id)
						.get()
						.then((doc) => {
							const sessionData = doc.data()
							if (sessionData.booked > 0) {
								this.sessionsBlockingServiceDeletion.push(sessionData)
								this.deleteOverlay = true
							} else {
								this.deleteOverlay = true
							}
						})
				})
			}
		},
		async deleteServiceDoc() {
			this.deleteServiceImage()
			const deleteServiceDoc = functions.httpsCallable('deleteService')
			this.deleteLoading = true
			await deleteServiceDoc({ id: this.service.id }).then(() => {
				this.deleteOverlay = false
				this.deleteLoading = false
			})
		},
		deleteServiceImage() {
			const storageRef = storage.ref()
			const pictureName = 'Storefront-Services/' + this.$user.uid + '/' + this.service.id
			storageRef.child(pictureName).delete()
		},
		animateDelete() {
			this.deleteOverlay = false
			gsap.to(this.$refs.serviceCard, {
				scale: 0,
				opacity: 0,
				delay: 0.3,
				onComplete: this.deleteServiceDoc,
			})
		},
		formatTime(e) {
			const time = formatter(e)
			return dayjs(time).format('MM/DD h:mma')
		},
	},
	computed: {
		cssProps() {
			return {
				'--serviceColor': this.service.color,
			}
		},
	},
}
</script>

<style scoped lang="scss">
h1 {
	color: var(--serviceColor);
	font: normal 600 30px/30px Poppins;
	letter-spacing: -1.5px;
}
.label {
	color: #666666;
	margin-right: 10px;
	font: normal 500 15px Arboria;
	min-width: 88px;
	max-width: 88px;
}
.value {
	font: normal 600 15px Arboria;
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
.colorBox {
	width: 174px;
	height: 25px;
	text-align: center;
	background-color: var(--serviceColor);
	span {
		font: normal 600 15px Arboria;
		text-transform: uppercase;
		color: #111111;
	}
}

.serviceContainer {
	min-height: 650px;
	height: 650px;
	padding: 23px;
	display: flex;
	flex-direction: column;
	align-content: flex-end;
	background-color: #222222;
	box-shadow: 0px 4px 6px #111111c9;
}
.underContainer {
	background-color: var(--serviceColor);
	padding-right: 6px;
	padding-bottom: 7px;
}
.fieldContainer {
	margin-top: auto;
	display: flex;
	min-height: 20px;
}
.serviceImg {
	border-radius: 5px;
}
</style>
