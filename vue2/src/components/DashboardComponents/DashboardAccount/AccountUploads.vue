<template>
	<div>
		<v-avatar v-if="profile.avatar" class="mb-4  " size="155px">
			<v-img :src="profile.avatar"> </v-img>
		</v-avatar>
		<p v-else class="bioText">upload an avatar </p>
		<!-- avatar upload -->
		<div class="editAvatar" v-if="!avatarEdit">
			<v-btn text class="editBtn" @click="avatarEdit = !avatarEdit"> Change </v-btn>
		</div>
		<div class="editBanner" v-else>
			<v-progress-linear v-if="avatarLoading" color="primary" height="10" v-model="avatarUploadPct" striped>
			</v-progress-linear>
			<form v-else>
				<h1 class="bioText">
					we recommend a square image
					<br />
					500 x 500px for best results
				</h1>
				<v-file-input hide-details solo dense @change="processAvatar($event)"></v-file-input>
				<v-btn class="editBtn" color="success" text @click.prevent="uploadAvatar"> Save</v-btn>
				<v-btn class="editBtn" color="danger" text @click="avatarEdit = !avatarEdit"> Cancel </v-btn>
			</form>
		</div>
		<br />
		<div v-if="this.$store.state.auth.claims.type === 'creators'">
			<!-- Banner display -->
			<v-img v-if="profile.banner" class="banner mb-2" :aspect-ratio="2 / 1" :src="profile.banner"> </v-img>
			<p v-else class="bioText mt-12"> please upload a banner for your storefront. </p>
			<!-- Banner upload -->
			<div class="editBanner" v-if="!bannerEdit">
				<v-btn text class="editBtn" @click="bannerEdit = !bannerEdit"> Change </v-btn>
			</div>
			<div class="editBanner" v-else>
				<v-progress-linear v-if="bannerLoading" color="primary" height="10" v-model="bannerUploadPct" striped>
				</v-progress-linear>
				<form v-else>
					<h1 class="bioText">
						we recommend a 2:1 image
						<br />
						1920 x 960px for best results
					</h1>
					<v-file-input hide-details solo dense @change="processBanner($event)"></v-file-input>
					<v-btn class="editBtn" color="success" text @click.prevent="uploadBanner"> Save</v-btn>
					<v-btn class="editBtn" color="danger" text @click="bannerEdit = !bannerEdit"> Cancel </v-btn>
				</form>
			</div>
		</div>
		<br />
		<br />
	</div>
</template>

<script>
import { db, storage } from '../../../plugins/firebase'

export default {
	props: ['profile'],
	data: () => ({
		avatarEdit: false,
		bannerEdit: false,
		avatarLoading: false,
		avatarUploadPct: 0,
		bannerLoading: false,
		bannerUploadPct: 0,
		bannerUrl: '',
		avatarUrl: '',
		newAvatar: '',
		newBanner: '',
	}),
	methods: {
		// upload avatar function needs a user's UID and avatar url
		uploadAvatar() {
			// set loading state
			this.avatarLoading = true
			// make firebase storage reference object (default pathname)
			const storageRef = storage.ref()
			// construct filename string
			const pictureName = 'Storefront-Pictures/' + this.$user.uid
			// update pathname with pictureName
			const file = this.newAvatar
			// 'put' is our file upload call
			const uploadAvatar = storageRef.child(pictureName).put(file)
			// monitoring file upload state is just like a snapshot bind in firestore:
			// on() takes the state you want to watch, can return info on each state change,
			// info upon error, and return a callback function when upload is complete
			uploadAvatar.on(
				'state_changed',
				async (snapshot) => {
					// get percentage of file uploaded
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
					// set it to data v-modeled to progress bar
					this.avatarUploadPct = progress
				},
				// handle errror
				(error) => {
					console.error(error)
					this.avatarEdit = !this.avatarEdit
					this.avatarLoading = false
				},
				// this function returns on upload completion
				() => {
					// get the url and send it to API to write to user's profile object
					uploadAvatar.snapshot.ref.getDownloadURL().then(async (downloadUrl) => {
						this.avatarUrl = downloadUrl
						this.updateAvatar(downloadUrl)
					})
					this.avatarEdit = !this.avatarEdit
					this.avatarLoading = false
				}
			)
		},
		// gets called on successful photo upload, updates avatar and banner URL strings on profile objects
		async updateAvatar(downloadUrl) {
			await db
				.collection(this.$store.state.auth.claims.type)
				.doc(this.$user.uid)
				.update({
					avatar: downloadUrl,
				})
				.catch((err) => {
					console.error(err)
				})
		},
		async updateBanner(downloadUrl) {
			await db
				.collection(this.$store.state.auth.claims.type)
				.doc(this.$user.uid)
				.update({
					banner: downloadUrl,
				})
				.catch((err) => {
					console.error(err)
				})
		},
		uploadBanner() {
			this.bannerLoading = true
			const storageRef = storage.ref()
			const pictureName = 'Storefront-Banners/' + this.$user.uid
			const pictureFileRef = storageRef.child(pictureName)
			const uploadBanner = pictureFileRef.put(this.newBanner)
			uploadBanner.on(
				'state_changed',
				async (snapshot) => {
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
					this.bannerUploadPct = progress
				},
				(error) => {
					console.error(error)
					this.bannerEdit = !this.bannerEdit
					this.bannerLoading = false
				},
				() => {
					uploadBanner.snapshot.ref.getDownloadURL().then(async (downloadUrl) => {
						this.bannerUrl = downloadUrl
						this.updateBanner(downloadUrl)
					})
					this.bannerEdit = !this.bannerEdit
					this.bannerLoading = false
				}
			)
		},
		// needed to upload a file, its an event listener that is called when the form is updated with a selected picture
		processAvatar(event) {
			this.newAvatar = event
		},
		processBanner(event) {
			this.newBanner = event
		},
	},
}
</script>

<style scoped>
.code {
	font: normal bold 1.4vw Poppins;
}
.banner {
	width: 320px;
	height: 160px;
	margin-top: 50px;
	border-radius: 10px;
}
.editBtn {
	font: normal normal bold 15px Poppins;
	color: #fa4b6b;
	float: right;
}
.bioText {
	font: normal normal 15px Poppins;
	display: inline-block;
}
.editAvatar {
	display: inline-block;
	vertical-align: bottom;
	margin-left: -20px;
}
.editBanner {
	max-width: 18.02vw;
}
</style>
