<template>
	<!--Container Row -->
	<v-row no gutters class="accountRow">
		<h1 class="dashHeader"> Settings </h1>
		<v-col>
			<!-- Main Content Row  with 3 columns -->
			<h1 class="accountTitle"> Account </h1>
			<v-row class="dashContainer">
				<!-- Left Column Content -->
				<v-col class="leftCol">
					<!-- Username -->
					<v-col cols="12">
						<h1 class="userHeader text-xs-h3 "> Username </h1>
						<div v-if="profile.username">
							<h2 class="userText"> {{ profile.username }} </h2>
						</div>
					</v-col>

					<!-- Tagline Col -->
					<v-col cols="12">
						<h1 class="tagHeader text-xs-h3"> Tagline </h1>
						<div v-if="!tagEdit">
							<h2 v-if="profile.tagline" class="tagText"> {{ profile.tagline }} </h2>
							<h2 v-else class="tagText"> please create your tagline.</h2>
							<v-btn text class="editBtn" @click="toggleTag"> EDIT </v-btn>
						</div>
						<v-form v-model="tagValid" v-else>
							<v-text-field
								color="white"
								dense
								:rules="tagRules"
								v-model="form.tagline"
								:placeholder="profile.tagline"
								class="editInput"
								single-line
								required
								counter="30"
							>
								<v-icon :loading="tagLoading" slot="append" @click="updateTag" color="success">fas fa-save</v-icon>
								<v-icon
									:loading="tagLoading"
									slot="append"
									@click="tagEdit = !tagEdit"
									class="ml-2"
									color="red darken-4"
									>fas fa-times</v-icon
								>
							</v-text-field>
						</v-form>
					</v-col>

					<!-- Bio Col -->
					<v-col cols="12">
						<h1 class="bioHeader"> Bio </h1>
						<div v-if="!bioEdit">
							<h2 class="bioText" v-if="profile.bio"> {{ profile.bio }} </h2>
							<h2 class="bioText" v-else> please write your bio. </h2>
							<v-btn text class="editBtn" @click="toggleBio"> EDIT </v-btn>
						</div>
						<v-form v-model="bioValid" v-else>
							<v-textarea
								color="white"
								auto-grow
								v-model="form.bio"
								:rules="bioRules"
								counter="350"
								single-line
								:label="profile.bio"
								class="editInput"
							>
								<v-icon slot="append" @click="updateBio" :disabled="!bioValid" color="success">fas fa-save</v-icon>
								<v-icon v-if="!bioLoading" slot="append" @click="bioEdit = !bioEdit" class="ml-2" color="red darken-4"
									>fas fa-times</v-icon
								>
							</v-textarea>
						</v-form>
					</v-col>
				</v-col>
				<!-- Middle Column Content -->
				<v-col class="middleCol">
					<!-- Social Col -->
					<v-col cols="12">
						<div v-if="!socialEdit">
							<!-- Social Title -->
							<h1 class="tagHeader text-xs-h3"> Social </h1>
							<!-- Twitter -->
							<h2 class="socialText">
								<v-icon color="#1DA1F2" class="socialIcon"> fab fa-twitter</v-icon>
								<a :href="`https://twitter.com/${profile.twitter}`" target="_blank" v-if="profile.twitter">
									{{ profile.twitter }}
								</a>
							</h2>
							<!-- Facebook -->
							<h2 class="socialText">
								<v-icon color="#4267B2" class="socialIcon"> fab fa-facebook-f</v-icon>
								<a :href="`https://facebook.com/${profile.facebook}`" target="_blank" v-if="profile.facebook">
									{{ profile.facebook }}
								</a>
							</h2>
							<!-- Youtube -->
							<h2 class="socialText">
								<v-icon color="#FF0000" class="socialIcon"> fab fa-youtube</v-icon>
								<a :href="`https://youtube.com/${profile.youtube}`" target="_blank" v-if="profile.facebook">
									{{ profile.youtube }}
								</a>
							</h2>
							<!-- Twitch -->
							<h2 class="socialText" style="display: inline-block">
								<v-icon color="#6441A4" class="socialIcon"> fab fa-twitch</v-icon>
								<a :href="`https://twitch.tv/${profile.twitch}`" target="_blank" v-if="profile.twitch">
									{{ profile.twitch }}
								</a>
							</h2>
							<v-btn text class="editBtn" @click="socialEdit = !socialEdit"> Change </v-btn>
						</div>
						<div v-else>
							<h1 class="tagHeader text-xs-h3"> Social </h1>
							<div>
								<v-progress-linear indeterminate v-if="socialLoading"> </v-progress-linear>
							</div>
							<!-- Twitter Edit -->
							<v-text-field
								dense
								v-model="form.socials.twitter"
								hide-details
								:label="profile.twitter"
								class="editInput my-2"
								solo
							>
								<v-icon color="#1DA1F2" slot="prepend"> fab fa-twitter</v-icon>
							</v-text-field>
							<!-- Facebook Edit -->
							<v-text-field
								dense
								v-model="form.socials.facebook"
								hide-details
								:label="profile.facebook"
								class="editInput my-2"
								solo
							>
								<v-icon color="#4267B2" slot="prepend"> fab fa-facebook-f</v-icon>
							</v-text-field>
							<!-- Youtube Edit -->
							<v-text-field
								dense
								v-model="form.socials.youtube"
								hide-details
								:label="profile.youtube"
								class="editInput my-2"
								solo
							>
								<v-icon color="#FF0000" slot="prepend">fab fa-youtube</v-icon>
							</v-text-field>
							<!-- Twitch Edit -->
							<v-text-field
								dense
								v-model="form.socials.twitch"
								hide-details
								:label="profile.twitch"
								class="editInput"
								solo
							>
								<v-icon color="#6441A4" class="" slot="prepend"> fab fa-twitch</v-icon>
							</v-text-field>
							<v-btn text class="editBtn" color="success" @click="updateSocials">
								Save
							</v-btn>
							<v-icon
								v-if="!bioLoading"
								slot="append"
								size="1vw"
								@click="socialEdit = !socialEdit"
								class="mt-2 socialClose"
								color="red darken-4"
								>fas fa-times</v-icon
							>
						</div>
						<!-- TimeZone selection -->
						<h1 class="tagHeader text-xs-h3"> Timezone </h1>
						<div v-if="timezoneEdit">
							<v-select v-model="timezoneSelect" :items="timezoneList" single-line>
								<h3 slot="append"> {{ timezoneFormatted(timezoneSelect) }}</h3>
							</v-select>

							<v-btn @click="saveTimezone"> Save </v-btn>
						</div>
						<div v-else>
							<h3 class="tagText">
								{{ timezoneSelect }} ( {{ timezoneFormatted(timezoneSelect) }} )</h3
							>
							<v-btn text class="editBtn" @click="timezoneEdit = !timezoneEdit"> EDIT </v-btn>
						</div>
					</v-col>
				</v-col>
				<!-- Avatar display -->
				<v-col class="avatarCol">
					<v-avatar v-if="profile.avatar" class="mb-4  " size="8.072917vw">
						<v-img :eager="true" :src="avatarUrl"> </v-img>
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
							<v-file-input hide-details solo dense @change="processAvatar($event)"></v-file-input>
							<v-btn class="editBtn" color="success" text @click.prevent="uploadAvatar"> Save</v-btn>
							<v-btn class="editBtn" color="danger" text @click="avatarEdit = !avatarEdit"> Cancel </v-btn>
						</form>
					</div>
					<br />
					<div v-if="seller">
						<!-- Banner display -->
						<v-img v-if="profile.banner" class="banner mb-2" :src="bannerUrl"> </v-img>
						<p v-else class="bioText mt-12"> please upload a banner for your storefront. </p>
						<!-- Banner upload -->
						<div class="editBanner" v-if="!bannerEdit">
							<v-btn text class="editBtn" @click="bannerEdit = !bannerEdit"> Change </v-btn>
						</div>
						<div class="editBanner" v-else>
							<v-progress-linear v-if="bannerLoading" color="primary" height="10" v-model="bannerUploadPct" striped>
							</v-progress-linear>
							<form v-else>
								<v-file-input hide-details solo dense @change="processBanner($event)"></v-file-input>
								<v-btn class="editBtn" color="success" text @click.prevent="uploadBanner"> Save</v-btn>
								<v-btn class="editBtn" color="danger" text @click="socialEdit = !socialEdit"> Cancel </v-btn>
							</form>
						</div>
					</div>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script>
	import { db, functions, storage } from '../../plugins/firebase'
	import dayjs from 'dayjs'
	import utc from 'dayjs/plugin/utc'
	import timezone from 'dayjs/plugin/timezone'

	dayjs.extend(timezone)
	dayjs.extend(utc)
	export default {
		name: 'DashboardAccount',

		props: ['profile'],

		data: () => ({
			timeNow: '',
			timezoneSelect: '',
			timezoneEdit: false,
			timezoneList: [
				'America/Chicago',
				'America/New_York',
				'America/Denver',
				'America/Phoenix',
				'America/Los_Angeles',
				'America/Anchorage',
				'America/Adak',
			],
			userTimezone: null,
			seller: '',
			bioValid: false,
			tagValid: false,
			uid: '',
			tagEdit: false,
			tagLoading: false,
			bioEdit: false,
			bioLoading: false,
			socialEdit: false,
			socialLoading: false,
			avatarEdit: false,
			bannerEdit: false,
			avatarLoading: false,
			avatarUploadPct: 0,
			bannerLoading: false,
			bannerUploadPct: 0,
			bannerUrl: '',
			dialog: false,
			info: '',
			avatarUrl: '',
			avatar: '',
			banner: '',
			viewingUID: '',
			closeOnContentClick: false,
			bannerUrl:
				'https://images.unsplash.com/photo-1491466424936-e304919aada7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2849&q=80',
			tagRules: [
				(v) => !!v || 'Tagline is required',
				(v) => (v && v.length <= 30) || 'Tagline must be less than 30 characters.',
			],
			bioRules: [
				(v) => !!v || 'Bio is required',
				(v) => (v && v.length <= 350) || 'Bio must be less than 350 characters.',
			],
			form: {
				firstname: '',
				lastname: '',
				tagline: '',
				bio: '',
				avatarImage: '',
				socials: {
					twitter: '',
					facebook: '',
					youtube: '',
					twitch: '',
				},
			},
		}),
		async mounted() {
			this.uid = this.$user.uid
			this.seller = this.$store.state.auth.claims.seller
			this.timezoneSelect = this.$store.state.auth.tz
			this.avatarUrl = this.profile.avatar
			this.bannerUrl = this.profile.banner
		},
		methods: {
			async saveTimezone() {
				await db.collection('users').doc(this.uid)
					.set({ timezone: this.timezoneSelect }, {merge:true})
				this.timezoneEdit = !this.timezoneEdit
			},
			toggleTag() {
				this.tagEdit = !this.tagEdit
			},
			toggleBio() {
				this.bioEdit = !this.bioEdit
			},
			toggleUsername() {
				this.usernameEdit = !this.usernameEdit
			},
			async updateTag() {
				this.tagLoading = true
				const updateTagline = db.collection(this.$store.state.auth.claims.type).doc(this.uid).set({tagline:this.form.tagline},{merge:true});
				return await updateTagline.then((resp) => {
					this.tagLoading = false;
					this.toggleTag();
				});
			},
			async updateBio() {
				this.bioLoading = true;
				const setBio = db.collection(this.$store.state.auth.claims.type).doc(this.uid).set({bio:this.form.bio},{merge:true});
				return await setBio.then((resp) => {
					this.bioLoading = false;
					this.toggleBio();
				})
			},
			async updateSocials() {
				this.socialLoading = !this.socialLoading
				const setTwitter = db.collection(this.$store.state.auth.claims.type).doc(this.uid);
				const setFacebook = db.collection(this.$store.state.auth.claims.type).doc(this.uid);
				const setYoutube = db.collection(this.$store.state.auth.claims.type).doc(this.uid);
				const setTwitch = db.collection(this.$store.state.auth.claims.type).doc(this.uid);
				if (this.form.socials.twitter !== '') {
					console.log('made it to twitter if')
					await setTwitter.set({twitter:this.form.socials.twitter},{merge:true})
				}
				if (this.form.socials.facebook !== '') {
					await setFacebook.set({facebook: this.form.socials.facebook},{merge:true})
				}
				if (this.form.socials.youtube !== '') {
					await setYoutube.set({youtube: this.form.socials.youtube},{merge:true})
				}
				if (this.form.socials.twitch !== '') {
					await setTwitch.set({twitch: this.form.socials.twitch},{merge:true})
				}
				this.socialLoading = !this.socialLoading
				this.socialEdit = !this.socialEdit
				this.form.socials = { twitter: '', facebook: '', youtube: '', twitch: '' }
			},
			// upload avatar function needs a user's UID and avatar url
			uploadAvatar() {
				// set loading state
				this.avatarLoading = true
				// make firebase storage reference object (default pathname)
				const storageRef = storage.ref()
				// construct filename string
				const pictureName = 'Storefront-Pictures/' + this.uid
				// update pathname with pictureName
				const file = this.avatar
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
							this.updatePhotoString(downloadUrl, 'avatar')
						})
						this.avatarEdit = !this.avatarEdit
						this.avatarLoading = false
					}
				)
			},
			// gets called on successful photo upload, updates avatar and banner URL strings on profile objects
			async updatePhotoString(downloadUrl, type) {
				const updatePhoto = db.collection(this.$store.state.auth.claims.type);
				await updatePhoto.set({
					collection: collection,
					uid: this.$user.uid,
					photo: downloadUrl,
					type: type,
				},{merge:true})
					.catch((err) => {
						console.error(err)
					})
			},
			uploadBanner() {
				this.bannerLoading = true
				const storageRef = storage.ref()
				const pictureName = 'Storefront-Banners/' + this.uid
				const pictureFileRef = storageRef.child(pictureName)
				const uploadBanner = pictureFileRef.put(this.banner)
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
							this.updatePhotoString(downloadUrl, 'banner')
						})
						this.bannerEdit = !this.bannerEdit
						this.bannerLoading = false
					}
				)
			},
			// needed to upload a file, its an event listener that is called when the form is updated with a selected picture
			processAvatar(event) {
				this.avatar = event
			},
			processBanner(event) {
				this.banner = event
			},
			timezoneFormatted(zone) {
				return dayjs().tz(zone).format('h:mm a')
			},
		},
	}
</script>

<style scoped>
	.socialClose {
		float: right;
		align-content: flex-end;
	}
	.accountRow {
		display: relative;
		padding-left: 2.5vw;
		padding-top: 5.8vw;
	}
	.editAvatar {
		display: inline-block;
		vertical-align: bottom;
		margin-left: -1vw;
	}
	.dashContainer {
		margin-left: 6vw;
	}
	.contain {
		padding-left: 40%;
	}
	.banner {
		width: 18.02vw;
		height: 5.625vw;
		margin-top: 2.609375vw;
	}
	.avatarInput {
		width: 200px;
	}
	.saveBtn {
		color: black;
		font: normal normal bold 1vw Poppins;
	}
	.cancelBtn {
		color: red;
		font: normal normal bold 1vw Poppins;
	}
	.leftCol {
		margin-right: 2.609375vw;
		max-width: 20.67vw;
	}
	.editBanner {
		max-width: 18.02vw;
	}
	.cardHeadline {
		font: normal normal bold 2vw Poppins;
	}
	.dashHeader {
		transform: rotate(-90deg);
		position: absolute;
		font: normal normal bold 5.208vw Poppins;
		color: #1e1e1e;
		left: -8.2vw;
		top: 8vw;
	}
	/* Page Content */
	.accountTitle {
		font: normal 600 2.605vw Poppins;
		color: #ffffff;
		padding-left: 4.5vw;
		padding-top: 2.4vw;
	}
	.avatarCol {
		padding-right: 5.208vw;
		padding-left: 5.208vw;
	}
	.userHeader {
		padding-top: 2.109375vw;
		font: normal normal bold 1.3021vw/1.3021vw Poppins;
	}
	.bannerEdit {
		text-align: right;
		padding-right: 2.609375vw;
		padding-top: 20px;
		font: normal normal bold 0.78125vw/0.78125vw Poppins;
		color: #fa4b6b;
	}
	.userText {
		font: normal normal 0.78125vw/0.78125vw Poppins;
		line-height: 2.109375vw;
		padding-left: 2px;
		display: inline-block;
	}
	.editInput {
		margin-right: 1.0417vw;
	}
	.tagHeader {
		font: normal bold 1.3021vw Poppins;
		padding-top: 2.109375vw;
	}

	.tagText {
		font: normal normal 0.78125vw/0.78125vw Poppins;
		padding-left: 0.10417vw;
		display: inline-block;
	}
	.middleCol {
		max-width: 19.302vw;
	}
	.socialText {
		font: normal normal 0.78125vw/0.78125vw Poppins;
		padding-left: 0.10417vw;
		padding-bottom: 1.5vw;
	}
	.socialIcon {
		padding-right: 0.521vw;
	}

	.bioHeader {
		font: normal bold 1.3021vw Poppins;
		padding-top: 2.08vw;
	}

	.bioText {
		font: normal normal 0.78125vw/0.78125vw Poppins;
		width: 14.84375vw;
		display: inline-block;
	}

	.userChange {
		font: normal normal bold 0.78125vw/0.78125vw Poppins;
		color: #ffffff;
		padding-top: 8.59375vw;
		position: absolute;
	}

	.userEdit {
		font: normal normal bold 0.78125vw/0.78125vw Poppins;
		color: #d23b59;
		display: inline-block;
	}

	.edit {
		font: normal normal bold 0.78125vw/0.78125vw Poppins;
		margin-right: 0.9375vw;
		color: #fa4b6b;
		float: right;
	}
	.editBtn {
		font: normal normal bold 0.78125vw/0.78125vw Poppins;
		color: #fa4b6b;
		float: right;
	}
	.langEdit {
		font: normal normal bold 0.78125vw/0.78125vw Poppins;
		padding-left: 3.125vw;
		color: #fa4b6b;
		display: inline-block;
	}
	.v-btn:before {
		background-color: transparent;
	}
	.bioEdit {
		font: normal normal bold 0.78125vw/0.78125vw Poppins;
		color: #d23b59;
		padding-top: 24.765625vw;
		padding-left: 42.109375vw;
	}
	.socialsHeader {
		font: normal normal bold 1.3125vw/1.3125vw Poppins;
		margin-left: 5.21vw;
		padding-top: 15.625vw;
		position: absolute;
	}

	.socialsText {
		font: normal normal 0.78125vw/0.78125vw Poppins;
		margin-left: 5.21875vw;
		line-height: 2.109375vw;
		padding-top: 17.453125vw;
	}
	.avatarPosition {
		padding-top: 6.25vw;
		position: absolute;
	}
	>>> .v-textarea textarea {
		font: normal normal 0.78125vw/1vw Poppins;
	}

	/* Page Content */
</style>
