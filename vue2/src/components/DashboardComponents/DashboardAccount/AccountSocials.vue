<template>
	<div>
		<div v-if="!socialEdit">
			<h1 class="tagHeader text-xs-h3"> Social </h1>
			<!-- Twitter -->
			<h2 class="socialText">
				<v-icon color="#1DA1F2" class="socialIcon"> fab fa-twitter</v-icon>
				<a :href="`https://twitter.com/${twitter}`" target="_blank" v-if="twitter">
					{{ twitter }}
				</a>
			</h2>
			<!-- Facebook -->
			<h2 class="socialText">
				<v-icon color="#4267B2" class="socialIcon"> fab fa-facebook-f</v-icon>
				<a :href="`https://facebook.com/${facebook}`" target="_blank" v-if="facebook">
					{{ facebook }}
				</a>
			</h2>
			<!-- Youtube -->
			<h2 class="socialText">
				<v-icon color="#FF0000" class="socialIcon"> fab fa-youtube</v-icon>
				<a :href="`https://youtube.com/${youtube}`" target="_blank" v-if="facebook">
					{{ youtube }}
				</a>
			</h2>
			<!-- Twitch -->
			<div class="d-flex justify-space-between">
				<h2 class="socialText">
					<v-icon color="#6441A4" class="socialIcon"> fab fa-twitch</v-icon>
					<a :href="`https://twitch.tv/${twitch}`" target="_blank" v-if="twitch">
						{{ twitch }}
					</a>
				</h2>
				<v-btn text class="editBtn" @click="socialEdit = !socialEdit"> EDIT </v-btn>
			</div>
		</div>

		<div v-else>
			<h1 class="tagHeader text-xs-h3"> Social </h1>
			<div>
				<v-progress-linear indeterminate v-if="socialLoading"> </v-progress-linear>
			</div>
			<v-text-field
				dense
				v-model="socials.twitter"
				hint="Enter only your username."
				label="Username"
				class="editInput my-2"
				solo
			>
				<v-icon color="#1DA1F2" slot="prepend" class="socialIconEdit"> fab fa-twitter</v-icon>
			</v-text-field>

			<!-- Twitter Edit -->

			<!-- Facebook Edit -->
			<v-text-field
				dense
				v-model="socials.facebook"
				hint="Enter only your username."
				label="Username"
				class="editInput my-2"
				solo
			>
				<v-icon color="#4267B2" slot="prepend" class="socialIconEdit"> fab fa-facebook-f</v-icon>
			</v-text-field>
			<!-- Youtube Edit -->
			<v-text-field
				dense
				v-model="socials.youtube"
				hint="Enter only your username."
				label="Username"
				class="editInput my-2"
				solo
			>
				<v-icon color="#FF0000" slot="prepend" class="socialIconEdit">fab fa-youtube</v-icon>
			</v-text-field>
			<!-- Twitch Edit -->
			<v-text-field
				dense
				v-model="socials.twitch"
				hint="Enter only your username."
				label="Username"
				class="editInput"
				solo
			>
				<v-icon color="#6441A4" slot="prepend" class="socialIconEdit"> fab fa-twitch</v-icon>
			</v-text-field>
			<div class="socialActions">
				<v-icon @click="updateSocials" color="success">
					fas fa-save
				</v-icon>
				<v-icon
					v-if="!socialLoading"
					@click="socialEdit = !socialEdit"
					size="30px"
					class="ml-2 "
					color="red darken-4"
				>
					fas fa-times
				</v-icon>
			</div>
		</div>
		<AccountTimezone :timezoneSelect="this.$store.state.auth.tz" />
		<div>
			<h2 class="code mt-10"> Discord code </h2>
			<h3 class="codeText"> {{ discord }} </h3>
		</div>
	</div>
</template>

<script>
import { db } from '../../../plugins/firebase'
import AccountTimezone from './AccountTimezone.vue'

export default {
	components: { AccountTimezone },
	props: ['twitter', 'facebook', 'youtube', 'twitch', 'discord'],
	data: () => ({
		socialEdit: false,
		socialLoading: false,
		socials: {
			twitter: '',
			facebook: '',
			youtube: '',
			twitch: '',
		},
	}),
	methods: {
		async updateSocials() {
			this.socialLoading = !this.socialLoading
			const setTwitter = db.collection(this.$store.state.auth.claims.type).doc(this.$user.uid)
			const setFacebook = db.collection(this.$store.state.auth.claims.type).doc(this.$user.uid)
			const setYoutube = db.collection(this.$store.state.auth.claims.type).doc(this.$user.uid)
			const setTwitch = db.collection(this.$store.state.auth.claims.type).doc(this.$user.uid)
			if (this.socials.twitter !== '') {
				await setTwitter.set({ twitter: this.socials.twitter }, { merge: true })
			}
			if (this.socials.facebook !== '') {
				await setFacebook.set({ facebook: this.socials.facebook }, { merge: true })
			}
			if (this.socials.youtube !== '') {
				await setYoutube.set({ youtube: this.socials.youtube }, { merge: true })
			}
			if (this.socials.twitch !== '') {
				await setTwitch.set({ twitch: this.socials.twitch }, { merge: true })
			}
			this.socialLoading = !this.socialLoading
			this.socialEdit = !this.socialEdit
			this.socials = { twitter: '', facebook: '', youtube: '', twitch: '' }
		},
	},
}
</script>

<style scoped>
.code {
	font: normal bold 25px Poppins;
}
.codeText {
	font: normal normal 15px Poppins;
}
.socialActions {
	display: flex;
	justify-content: flex-end;
}
.editBtn {
	font: normal normal bold 15px Poppins;
	color: #fa4b6b;
	align-content: flex-start;
	height: 100% !important;
}
.socialIcon {
	margin-right: 10px;
	min-width: 27px;
}
.socialIconEdit {
	min-width: 28px;
}
.tagHeader {
	font: normal bold 25px Poppins;
}
.socialText {
	display: flex;
	font: normal normal 15px Poppins;
	padding-bottom: 25px;
}
.editInput {
	margin-right: 20px;
}
</style>
