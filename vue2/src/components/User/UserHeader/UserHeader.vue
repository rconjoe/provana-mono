<template>
	<v-row>
		<!-- userInfo Column -->
		<v-col class="userCol ">
			<!-- Avatar -->
			<v-avatar class="avatarBorder" size="7.771vw">
				<v-img :src="profile.avatar" v-if="profile.avatar"> </v-img>
			</v-avatar>

			<!-- UserInfo -->
			<div class="headerDiv">
				<h2 class="userText"> {{ profile.username }}</h2>
				<div :class="alphaHover ? 'alphaBadgeDivHover' : 'alphaBadgeDiv'">
					<div class="alphaHoverDiv" @mouseover="alphaHover = true" @mouseleave="alphaHover = false">
						<img class="provanaAlpha" src="../../../assets/ProvanaAlphaBadge-02.png" />
					</div>
					<v-fade-transition>
						<span v-if="alphaHover" class="alphaPartner"> Alpha Partner</span>
					</v-fade-transition>
				</div>
				<br/>
				<h1 class="userTitle"> {{ profile.tagline }} </h1>

				<!-- review row -->
				<a @click="showReview = true"> <span class="ratingLink"> Reviews </span> </a>
				<span class="rating">{{reviewScore}}</span>
				<v-icon size="1vw" class="star"> fas fa-star </v-icon>

				<v-expand-transition>
					<div class="reviewDiv" v-if="showReview">
						<div class="iconDiv">
							<v-icon class="exitReview" @click="showReview = false" right> fas fa-times</v-icon>
						</div>
						<UserReviews :reviews="reviews" />
					</div>
				</v-expand-transition>

				<!-- Socials -->
				<div class="pl-0 socialsDiv">
					<UserSocials
						:facebook="profile.facebook"
						:twitch="profile.twitch"
						:twitter="profile.twitter"
						:youtube="profile.youtube"
					/>
				</div>
			</div>
			<UserAbout :bio="profile.bio" />
		</v-col>
	</v-row>
</template>

<script>
	import {functions} from '../../../plugins/firebase'
 	import UserAbout from '@/components/User/UserHeader/UserAbout.vue'
	import UserSocials from '@/components/User/UserHeader/UserSocials.vue'
	import UserReviews from '@/components/User/UserHeader/UserReviews.vue'
	export default {
		components: { UserAbout, UserSocials, UserReviews },
		props: ['profile'],
		data: () => ({
			alphaHover: false,
			showReview: false,
			reviews: [],
			reviewScore:3
		}),
		mounted() {
			this.getRecentReviews()
			this.getReviewScore()
		},
		methods: {
			async getRecentReviews() {
				const getReviews = functions.httpsCallable('getRecentReviews')
				const response = await getReviews({ sellerUid: this.$user.uid })
				this.reviews.push(...response.data)
			},
			async getReviewScore() {
				const getScore = functions.httpsCallable('getReviewScore')
				const response = await getScore({ sellerUid: this.$user.uid })
				this.reviewScore = response.data
			}
		},
	}
</script>

<style scoped>
	/* Header styles */
	.iconDiv {
		display: flex;
		justify-content: flex-end;
	}
	.exitReview {
		justify-self: flex-end;
		margin-right: 30px;
		margin-top: 15px;
		margin-bottom: 10px;
	}
	.reviewDiv {
		overflow: hidden;
		max-height: 550px;
		width: 540px;
		position: absolute;
		top: 10;
		left: 10;
		background-color: #333333;
		z-index: 2;
		border-radius: 0 25px 0 0;
	}

	.userText {
		font: normal 750 3.6458vw/4vw Poppins;
	}
	.userTitle {
		color: #b5b0b0;
		font: normal 500 1.0416666666666667vw Arboria;
		padding-right: 0.521vw;
		padding-bottom: 0.4vw;
	}
	.userCol {
		padding-left: 1.0417vw;
		padding-right: 1.80625vw;
		align-items: flex-start;
		display: flex;
	}

	.rating {
		font: normal 800 1.0417vw Poppins;
		padding-right: 0.3vw !important;
	}
	.bioLink {
		font: normal 500 1.0417vw Poppins;
	}
	.headerDiv {
		display: inline-block;
		max-width: 38.645833333333332vw;
		min-width: 38.645833333333332vw;
	}
	a {
		text-decoration: none;
	}
	.provanaAlpha {
		padding-bottom: 0.2605vw;
		width: auto;
		margin-right: 0.521vw;
		margin-left: 0.15625vw;
		height: 1.3021vw;
		vertical-align: middle;
		transition-duration: 0.3s;
	}
	.v-tab {
		text-transform: none !important;
	}
	.alphaHoverDiv {
		display: inline-block;
	}
	.provanaAlpha:hover {
		transform: scale(2);
	}
	.alphaBadgeDiv {
		width: auto;
		background-color: transparent;
		display: inline-block;
		transition: width 1s ease;
		border-radius: 5px;
		height: 1.3020833333333333vw;
	}
	.alphaBadgeDivHover {
		display: inline-block;
		width: auto;
		transition: width 1s ease;
		background-color: white;
		border-radius: 5px;
		padding-right: 0.37vw;
		height: 1.3020833333333333vw;
	}
	.alphaPartner {
		font: normal bold 1.0417vw/1.0417vw Poppins;
		color: #d4145a;
		letter-spacing: -0.052083333333333336vw;
	}
	.avatarBorder {
		border: 4px solid #d51458;
		margin-right: 2.6vw;
	}
	.buyerReviews {
		font: normal 600 1.0416666666666667vw Arboria;
		color: #717171;
	}
	.star {
		padding-right: 0.52084vw;
		margin-bottom: 0.26vw;
		min-height: 0.521vw;
	}
	.rating {
		color: white;
		font: normal 800 1.0417vw Poppins;
		padding-left: 0.2604166666666667vw;
		padding-right: 0.5208333333333334vw;
	}
	.ratingLink {
		font: normal bold 1.0417vw Poppins;
		color: #fa4b6b;
	}
	.ratingLink:hover {
		color: white;
	}
	.bio {
		font: normal normal 0.78vw Poppins;
		color: #969696;
		padding-top: 0.3541666666666667vw;
	}
	.bioTitle {
		font: normal 600 1.823vw Poppins;
		display: inline-block;
		margin-right: 2vw;
	}
	.socialsDiv {
		padding-top: 0.5625vw;
	}
	.socialBtnWrapper {
		display: inline-block;
	}
	.v-tabs-items {
		background-color: transparent !important;
	}
	.socialBtn {
		height: 1.302vw;
		width: 1.302vw;
		margin-left: 0.417vw;
	}
</style>
