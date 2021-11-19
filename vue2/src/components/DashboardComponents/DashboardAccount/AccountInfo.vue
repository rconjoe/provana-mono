<template>
	<div>
		<!-- Username -->
		<v-col>
			<h1 class="userHeader text-xs-h3 "> Username </h1>
			<div v-if="profile.username">
				<h2 class="userText"> {{ profile.username }} </h2>
			</div>
		</v-col>
		<v-col>
			<h1 class="userHeader text-xs-h3 "> Display name </h1>
			<div v-if="profile.username">
				<h2 class="userText"> {{ profile.vanity }} </h2>
			</div>
		</v-col>

		<!-- Tagline Col -->
		<v-col>
			<h1 class="tagHeader text-xs-h3"> Tagline </h1>
			<div class="d-flex justify-space-between" v-if="!tagEdit">
				<h2 v-if="profile.tagline" class="tagText"> {{ profile.tagline }} </h2>
				<h2 v-else class="tagText"> please create your tagline.</h2>
				<v-btn text class="editBtn" @click="toggleTag"> EDIT </v-btn>
			</div>
			<v-form v-model="tagValid" v-else>
				<v-text-field
					color="white"
					dense
					:rules="tagRules"
					v-model="tagline"
					:placeholder="profile.tagline"
					class="editInput"
					single-line
					required
					counter="30"
				>
					<div v-if="!tagLoading" slot="append">
						<v-icon :loading="tagLoading" slot="append" @click="updateTag" color="success"
							>fas fa-save</v-icon
						>
						<v-icon
							:loading="tagLoading"
							slot="append"
							@click="tagEdit = !tagEdit"
							class="ml-2"
							color="red darken-4"
							>fas fa-times</v-icon
						>
					</div>
					<v-progress-circular slot="append" v-else indeterminate color="primary"></v-progress-circular>
				</v-text-field>
			</v-form>
		</v-col>

		<!-- Bio Col -->
		<v-col cols="12">
			<h1 class="tagHeader"> Bio </h1>
			<div class="d-flex justify-space-between" v-if="!bioEdit">
				<h2 class="bioText" v-if="profile.bio"> {{ profile.bio }} </h2>
				<h2 class="bioText" v-else> please write your bio. </h2>
				<v-btn text class="editBtn" @click="toggleBio"> EDIT </v-btn>
			</div>
			<v-form v-model="bioValid" v-else>
				<v-textarea
					color="white"
					auto-grow
					v-model="bio"
					:rules="bioRules"
					counter="350"
					single-line
					:label="profile.bio"
					class="editInput"
				>
					<div v-if="!bioLoading" slot="append">
						<v-icon slot="append" @click="updateBio" :disabled="!bioValid" color="success"
							>fas fa-save</v-icon
						>
						<v-icon
							v-if="!bioLoading"
							slot="append"
							@click="bioEdit = !bioEdit"
							class="ml-2"
							color="red darken-4"
							>fas fa-times</v-icon
						>
					</div>
					<v-progress-circular slot="append" v-else indeterminate color="primary"></v-progress-circular>
				</v-textarea>
			</v-form>
		</v-col>
	</div>
</template>

<script>
import { db } from '../../../plugins/firebase'

export default {
	props: ['profile'],
	data: () => ({
		tagline: '',
		bio: '',
		bioValid: false,
		tagValid: false,
		tagEdit: false,
		tagLoading: false,
		bioEdit: false,
		bioLoading: false,
		tagRules: [
			(v) => !!v || 'Tagline is required',
			(v) => (v && v.length <= 30) || 'Tagline must be less than 30 characters.',
		],
		bioRules: [
			(v) => !!v || 'Bio is required',
			(v) => (v && v.length <= 350) || 'Bio must be less than 350 characters.',
		],
	}),
	methods: {
		toggleTag() {
			this.tagEdit = !this.tagEdit
		},
		toggleBio() {
			this.bioEdit = !this.bioEdit
		},
		async updateTag() {
			this.tagLoading = true
			const updateTagline = db
				.collection(this.$store.state.auth.claims.type)
				.doc(this.$user.uid)
				.set({ tagline: this.tagline }, { merge: true })
			return await updateTagline.then((resp) => {
				this.tagLoading = false
				this.toggleTag()
			})
		},
		async updateBio() {
			this.bioLoading = true
			const setBio = db
				.collection(this.$store.state.auth.claims.type)
				.doc(this.$user.uid)
				.set({ bio: this.bio }, { merge: true })
			return await setBio.then((resp) => {
				this.bioLoading = false
				this.toggleBio()
			})
		},
	},
}
</script>

<style scope>
.v-btn:before {
	background-color: transparent;
}
.editBtn {
	font: normal normal bold 15px Poppins;
	color: #fa4b6b !important;
}
.tagText {
	font: normal normal 15px Poppins;
	display: inline-block;
	align-self: center;
}
.userHeader {
	font: normal normal bold 25px Poppins;
}
.userText {
	font: normal normal 15px Poppins;
	padding-left: 2px;
	display: inline-block;
}
.tagHeader {
	font: normal bold 1.3021vw Poppins;
}
.editInput {
	margin-right: 1.0417vw;
}
.bioText {
	font: normal normal 15px Poppins;
	width: 14.84375vw;
	display: inline-block;
	align-self: center;
}
::v-deep .v-textarea textarea {
	font: normal normal 15px Poppins;
}
</style>
