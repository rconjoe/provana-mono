<template>
	<div>
		<h1 class="tagHeader text-xs-h3"> Timezone </h1>
		<div v-if="timezoneEdit">
			<v-select v-model="newTimezone" :items="timezoneList" single-line>
				<h3 slot="append" class="align-self-center"> {{ timezoneFormatted(newTimezone) }}</h3>
			</v-select>
			<div class="d-flex justify-end ml-2" slot="append">
				<v-icon @click="saveTimezone" color="success">
					fas fa-save
				</v-icon>
				<v-icon @click="timezoneEdit = !timezoneEdit" size="30px" class="ml-2 " color="red darken-4">
					fas fa-times
				</v-icon>
			</div>
		</div>
		<div v-else class="d-flex justify-space-between">
			<h3 class="tagText"> {{ timezoneSelect }} {{ timezoneFormatted(timezoneSelect) }} </h3>
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
	display: inline-block;
}
.tagHeader {
	font: normal bold 25px Poppins;
	padding-top: 12px;
}
.editBtn {
	font: normal normal bold 15px Poppins;
	color: #fa4b6b;
	justify-self: flex-end;
}
</style>
