<template>
	<div class="upcomingOuterDiv">
		<v-tabs v-model="tab" align-with-title hide-slider active-class="activeTab" class="sessionTabs pl-4">
			<v-tab href="#purchased" :ripple="false">
				Purchased
			</v-tab>
			<v-tab href="#sold" :ripple="false">
				Sold
			</v-tab>
		</v-tabs>
		<v-tabs-items v-model="tab" color="transparent">
			<v-tab-item value="purchased" id="purchased" color="transparent">
				<v-card class="tabCard">
					<v-list-item-group v-if="purchased.length >= 1">
						<v-list-item
							active-class="selectedItem"
							class="listItem"
							dense
							v-for="slot in purchased"
							:key="slot.start"
							@click="selectSlot(slot)"
						>
							<h1 class="sessionItemTitle text-truncate">{{ slot.name }} </h1>
							<h2 class="sessionItemDate">
								{{ formatDate(slot.start) }} @ {{ formatTime(slot.start) }}
							</h2>
							<h3 class="sessionDetails "> Details</h3>
						</v-list-item>
					</v-list-item-group>
					<div v-else>
						<h2 class="noPurchasesText"> No purchases</h2>
						<h2 class="noPurchasesText primary--text"> Support some creators</h2>
					</div>
				</v-card>
			</v-tab-item>
			<v-tab-item value="sold" id="sold">
				<v-card class="tabCard">
					<v-list-item-group v-if="sold.length >= 1">
						<v-list-item
							active-class="selectedItem"
							class="listItem"
							dense
							v-for="slot in sold"
							:key="slot.start"
							@click="selectSlot(slot)"
						>
							<h1 class="sessionItemTitle text-truncate">{{ slot.name }}</h1>
							<h2 class="sessionItemDate">{{ formatDate(slot.start) }}@{{ formatTime(slot.start) }}</h2>
							<h3 class="sessionDetails "> Details</h3>
						</v-list-item>
					</v-list-item-group>
					<div v-else>
						<h2 class="noPurchasesText"> No sessions sold.</h2>
					</div>
				</v-card>
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script>
import dayjs from 'dayjs'
import { mapState } from 'vuex'
export default {
	name: 'UpcomingSessions',
	data: () => ({
		tab: 'sold',
	}),
	computed: mapState({
		sold: (state) => state.dashboard.home.sold,
		purchased: (state) => state.dashboard.home.purchased,
		selected: (state) => state.dashboard.home.selected,
	}),
	async mounted() {
		this.$store.dispatch('dashboard/getPurchased')
		this.$store.dispatch('dashboard/getSold')
	},
	methods: {
		selectSlot(slot) {
			this.$store.dispatch('dashboard/selectSlot', slot)
		},
		formatTime(e) {
			return dayjs(e).format('hh:mm a')
		},
		formatDate(e) {
			return dayjs(e).format('M/DD')
		},
		async cancelFlow() {},
	},
}
</script>

<style scoped>
.noPurchasesText {
	font: normal 600 18px Arboria;
	text-align: center;
}
.listItem {
	display: flex;
	justify-content: space-between;
	margin-bottom: 5px;
}

.selectedItem {
	background-color: #333333;
	border-radius: 7px;
}
.selectedItem .sessionDetails,
.selectedItem .sessionDetails:hover {
	color: black;
}
.upcomingOuterDiv {
	flex-grow: 1;
	max-width: 550px;
	border-radius: 5px;
	background-color: #1e1e1e;
	padding-bottom: 25px;
}
.sessionItemTitle {
	flex: 1 1;
	max-width: 250px;
	font: normal bold 15px Arboria;
}
.sessionItemDate {
	margin-left: 10px;
	max-width: 250px;
	font: normal bold 15px Arboria;
}
.sessionDetails {
	color: #d41458;
	margin-left: 10px;
	font: normal bold 15px Arboria;
}
.theme--dark.v-list-item:hover::before {
	border-radius: 5px;
}
.v-tab {
	margin-left: 0 !important;
	text-transform: none;
	font: normal 600 20px Poppins;
	letter-spacing: -1px;
}
/* default not selected tab color  fml */
.theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active),
.theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-icon,
.theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-btn,
.theme--dark.v-tabs > .v-tabs-bar .v-tab--disabled {
	color: #717171;
}
.v-tab:hover {
	color: white !important;
}
.activeTab {
	color: White;
}

.tabCard {
	position: relative;
	max-width: 90%;
	height: 350px;
	background-color: #111111;
	border-radius: 10px;
	margin: auto;
	overflow-y: scroll;
	padding-top: 25px;
}
/* Active List Item highlight removal */
.theme--dark.v-list-item--active:hover::before,
.theme--dark.v-list-item--active::before {
	opacity: 0;
}
/* Tab Hover highlight removal */
.theme--dark.v-tabs .v-tab--active:hover::before,
.theme--dark.v-tabs .v-tab--active::before {
	opacity: 0;
}
.theme--dark.v-tabs .v-tab:hover::before {
	opacity: 0;
}
/* background to tab items removal */
.v-tabs-items {
	background-color: transparent;
}
@media screen and (max-width: 1400px) {
	.upcomingOuterDiv {
		flex-grow: 1;
		max-width: 100%;
		border-radius: 5px;
		background-color: #1e1e1e;
		padding-bottom: 25px;
	}
}
</style>
