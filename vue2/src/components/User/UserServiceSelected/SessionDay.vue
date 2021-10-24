<template>
	<div>
		<h1 class="dateTitle"> {{ viewDate }} </h1>
		<v-btn id="sessionBtn" v-for="(session, i) in sessionTimes" :key="i" @click="showSlots($event, session)">
			{{ btnTime(session.start) }}
		</v-btn>
	</div>
</template>

<script>
	import isBetween from 'dayjs/plugin/isBetween'
	import { formatter } from '../../../plugins/sessionFormatter'
	import dayjs from 'dayjs'
	import { db } from '@/plugins/firebase'
	dayjs.extend(isBetween)

	export default {
		props: ['date', 'service'],
		data: () => ({
			viewDate: '',
			queryDate: '',
			sessionTimes: [],
		}),
		mounted() {
			this.viewDate = dayjs(this.date).format('M/D')
			this.queryDate = dayjs(this.date).unix()

			db
				.collection('sessions')
				.where('serviceDocId', '==', this.service.id)
				.where('status', '==', 'published')
				.onSnapshot((querySnapshot) => {
					this.sessions = []
					querySnapshot.forEach((doc) => {
						const data = doc.data()
						const session = {
							name: data.name,
							color: data.color,
							serviceColor: data.serviceColor,
							start: formatter(data.start),
							end: formatter(data.end),
							status: data.status,
							participants: data.participants,
							buyerUid: data.buyerUid,
							slot: data.slot,
							slots: data.slots,
							parentSession: data.parentSession,
							sellerUid: data.sellerUid,
							serviceDocId: data.serviceDocId,
							id: data.id,
						}
						const today = dayjs(session.start).isSame(this.date, 'day')
						if (today) {
							this.sessionTimes.push(session)
						} else {
						}
					})
				})
		},
		methods: {
			showSlots(event, session) {
				this.$emit('show-slots', event, session)
			},
			btnTime(e) {
				return dayjs(e).format('h:mma')
			},
		},
	}
</script>

<style scoped>
	.dateTitle {
		font: normal 600 1.0416666666666667vw Poppins;
		letter-spacing: -0.052083333333333336vw;
		color: #666666;
	}
	#sessionBtn {
		background-color: #e61b5b;
		height: 2.6315789473684212vw;
		max-width:4.5vw;
		color: white;
		border-radius: 0;
		font: normal 500 1.0416666666666667vw Poppins;
		letter-spacing: -0.052083333333333336vw;
		text-transform: none;
		padding: 0 .5vw;
	}
	#sessionBtn:hover {
		background-color: #fa4b6b;
	}
</style>
