<template>
	<div>
		<h1 class="tagHeader text-xs-h3"> Timezone </h1>
		<div v-if="timezoneEdit">
			<v-select v-model="newTimezone" :items="timezoneList" single-line>
				<h3 slot="append"> {{ timezoneFormatted(newTimezone) }}</h3>
			</v-select>
			<div class="d-flex justify-space-between">
				<v-btn @click="saveTimezone" color="primary" class="btnCTA"> Save </v-btn>
				<v-btn @click="timezoneEdit = !timezoneEdit" color="#333333" class="btnCTA"> Cancel </v-btn>
			</div>
		</div>
		<div v-else>
			<h3 class="tagText"> {{ timezoneSelect }} ( {{ timezoneFormatted(timezoneSelect) }} )</h3>
			<v-btn text class="editBtn" @click="timezoneEdit = !timezoneEdit"> EDIT </v-btn>
		</div>
	</div>
</template>

<script>
import { db, storage } from '../../../plugins/firebase'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(timezone)
dayjs.extend(utc)
export default {
	props: ['timezoneSelect'],
	data: () => ({
		newTimezone: '',
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
	}),
	mounted() {
		this.newTimezone = this.timezoneSelect
	},
	methods: {
		async saveTimezone() {
			await db
				.collection(this.$store.state.auth.claims.type)
				.doc(this.$user.uid)
				.set({ timezone: this.newTimezone }, { merge: true })
			this.timezoneEdit = !this.timezoneEdit
		},
		timezoneFormatted(zone) {
			return dayjs()
				.tz(zone)
				.format('h:mm a')
		},
	},
}
</script>

<style scoped>
.tagText {
	font: normal normal 15px Poppins;
	padding-left: 10px;
	display: inline-block;
}
.tagHeader {
	font: normal bold 1.3021vw Poppins;
	padding-top: 12px;
	padding-bottom: 12px;
}
.editBtn {
	font: normal normal bold 0.78125vw/0.78125vw Poppins;
	color: #fa4b6b;
	float: right;
}
</style>
