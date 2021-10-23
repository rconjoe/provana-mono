<template>
	<div>
		<h1 class="header"> Pick the right spot</h1>
		<h1 class="dateTitle"> {{ viewDate }} </h1>
		<v-btn class="sessionBtn" v-for="(session, i) in sessionTimes" :key="i" @click="showSlots(session)">
			{{ btnTime(session.start) }} </v-btn
		>
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
						const today = dayjs(session.start).isBetween(this.date, dayjs(this.date).add(1, 'day'))
						if (today) {
							this.sessionTimes.push(session)
						} else {
						}
					})
				})
		},
		methods: {
			showSlots(e) {
				this.$emit('show-slots', e)
			},
			btnTime(e) {
				return dayjs(e).format('h:mm')
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
	.sessionBtn {
		background-color: #e61b5b;
		color: white;
		font: normal 600 1.0416666666666667vw Poppins;
	}
	.sessionBtn:hover {
		background-color: #fa4b6b;
	}
	.header {
		font: normal 600 1.5625vw Poppins;
		letter-spacing: -0.078125vw;
		display: inline-block;
	}
</style>
