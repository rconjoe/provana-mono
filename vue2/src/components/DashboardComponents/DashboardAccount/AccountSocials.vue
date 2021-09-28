<template>
<div>
	<div v-if="!socialEdit">
		<!-- Social Title -->
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
		<h2 class="socialText" style="display: inline-block">
			<v-icon color="#6441A4" class="socialIcon"> fab fa-twitch</v-icon>
			<a :href="`https://twitch.tv/${twitch}`" target="_blank" v-if="twitch">
				{{ twitch }}
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
			v-model="socials.twitter"
			hide-details
			:label="twitter"
			class="editInput my-2"
			solo
		>
			<v-icon color="#1DA1F2" slot="prepend" class="socialIconEdit"> fab fa-twitter</v-icon>
		</v-text-field>
		<!-- Facebook Edit -->
		<v-text-field
			dense
			v-model="socials.facebook"
			hide-details
			:label="facebook"
			class="editInput my-2"
			solo
		>
			<v-icon color="#4267B2" slot="prepend" class="socialIconEdit"> fab fa-facebook-f</v-icon>
		</v-text-field>
		<!-- Youtube Edit -->
		<v-text-field
			dense
			v-model="socials.youtube"
			hide-details
			:label="youtube"
			class="editInput my-2"
			solo
		>
			<v-icon color="#FF0000" slot="prepend" class="socialIconEdit">fab fa-youtube</v-icon>
		</v-text-field>
		<!-- Twitch Edit -->
		<v-text-field dense v-model="socials.twitch" hide-details :label="twitch" class="editInput" solo>
			<v-icon color="#6441A4" slot="prepend" class="socialIconEdit"> fab fa-twitch</v-icon>
		</v-text-field>
		<v-btn text class="editBtn" color="success" @click="updateSocials">
			Save
		</v-btn>
		<v-icon
			v-if="!socialLoading"
			slot="append"
			size="1vw"
			@click="socialEdit = !socialEdit"
			class="mt-2 socialClose"
			color="red darken-4"
			>fas fa-times</v-icon
		>
	</div>
</div>
</template>

<script>
	import { db} from '../../../plugins/firebase'

	export default {
		props: ['twitter', 'facebook', 'youtube', 'twitch'],
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
        methods:{
            async updateSocials() {
				this.socialLoading = !this.socialLoading
				const setTwitter = db.collection(this.$store.state.auth.claims.type).doc(this.$user.uid);
				const setFacebook = db.collection(this.$store.state.auth.claims.type).doc(this.$user.uid);
				const setYoutube = db.collection(this.$store.state.auth.claims.type).doc(this.$user.uid);
				const setTwitch = db.collection(this.$store.state.auth.claims.type).doc(this.$user.uid);
				if (this.socials.twitter !== '') {
					console.log('made it to twitter if')
					await setTwitter.set({twitter:this.socials.twitter},{merge:true})
				}
				if (this.socials.facebook !== '') {
					await setFacebook.set({facebook: this.socials.facebook},{merge:true})
				}
				if (this.socials.youtube !== '') {
					await setYoutube.set({youtube: this.socials.youtube},{merge:true})
				}
				if (this.socials.twitch !== '') {
					await setTwitch.set({twitch: this.socials.twitch},{merge:true})
				}
				this.socialLoading = !this.socialLoading
				this.socialEdit = !this.socialEdit
				this.socials = { twitter: '', facebook: '', youtube: '', twitch: '' }
			},
        }
	}
</script>

<style scoped>
	.socialClose {
		float: right;
		align-content: flex-end;
	}
	.editBtn {
		font: normal normal bold 0.78125vw/0.78125vw Poppins;
		color: #fa4b6b;
		float: right;
	}
	.socialIcon {
		padding-right: 0.521vw;
	}
    .socialIconEdit{
        min-width: 1.40625vw;
    }
	.tagHeader {
		font: normal bold 1.3021vw Poppins;
		padding-top: 2.109375vw;
	}
	.socialText {
		font: normal normal 0.78125vw/0.78125vw Poppins;
		padding-left: 0.10417vw;
		padding-bottom: 1.5vw;
	}
    .editInput {
		margin-right: 1.0417vw;
	}
</style>
