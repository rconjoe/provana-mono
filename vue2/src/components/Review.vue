<template>
	<v-card class="elevation-16 mx-auto" width="500">
		<v-card-title class="text-h5"> Leave a Review for {{ review.seller }} </v-card-title>
		<v-card-text>
			We at Provana.GG value your opinion. Leave a rating and a comment to reflect on your expierience with
			{{ review.seller }}.

			<div class="text-center mt-12">
				<v-rating
					v-model="rating"
					color="primary "
					background-color="grey darken-1"
					empty-icon="$ratingFull"
					hover
					large
				></v-rating>
			</div>
			<h3 class="mt-3">Comments:</h3>
			<v-textarea
				v-model="message"
				background-color="#111111"
				data-test="description-input"
				color="white"
				class="pt-2  descriptionText"
				name="description input"
				no-resize
				filled
			></v-textarea>
		</v-card-text>
		<v-card-actions class="justify-space-between">
			<!-- <v-btn text>
        cancel
      </v-btn> -->
			<v-spacer></v-spacer>
			<v-btn color="secondary" @click="createReview" class="btnCTA" :disabled="(rating = null)">
				Submit Review
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
	import dayjs from 'dayjs'
	import utc from 'dayjs/plugin/utc'
	import timezone from 'dayjs/plugin/timezone'
	import { db } from '../plugins/firebase'

	dayjs.extend(timezone)
	dayjs.extend(utc)

	export default {
		props: ['review'],
		data: () => ({
			rating: null,
			message: '',
			profile:{},
		}),
		methods: {
			async createReview() {
				await db
					.collection('reviews')
					.doc(this.review.reviewDocId)
					.set({
						sellerUid: this.review.sellerUid,
						buyerUid: this.$user.uid,
						buyerName: this.$store.state.auth.currentUser.username,
						date: dayjs().unix(),
						message: `${this.message}`,
						rating: this.rating,
						serviceName: this.review.serviceName,
					})
					.catch((err) => {
						console.error(`Error creating that review: ${err}`)
					})
			},
		},
	}
</script>

<style>
	.descriptionText {
		font: normal normal 0.78125vw/0.78125vw Poppins;
	}
</style>
