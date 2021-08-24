<template>
	<div class="upcomingOuterDiv">
		<v-tabs v-model="tab" align-with-title hide-slider active-class="activeTab" class="pt-5">
			<v-tab href="#purchased" class="tab">
				<h3> Purchased</h3>
			</v-tab>
			<v-tab href="#sold" class="tab">
				<h3> Sold</h3>
			</v-tab>
		</v-tabs>
		<v-card class="tabCard">
			<v-tabs-items v-model="tab" color="transparent" class="">
				<v-tab-item value="purchased" id="purchased" color="transparent">
					<v-card class="tabCard">
						<v-list-item-group v-if="purchased.length >= 1">
							<v-list-item
								active-class="selectedItem"
								class="listItem"
								dense
								v-for="session in purchased"
								:key="session.start"
								@click="selectSession(session)"
							>
								<h1 class="sessionItemTitle text-truncate">{{ session.name }}</h1>
								<h2 class="sessionItemDate">{{ formatDate(session.start) }}@{{ formatTime(session.start) }}</h2>
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
								v-for="session in sold"
								:key="session.start"
								@click="selectSession(session)"
							>
								<h1 class="sessionItemTitle text-truncate">{{ session.name }}</h1>
								<h2 class="sessionItemDate">{{ formatDate(session.start) }}@{{ formatTime(session.start) }}</h2>
								<h3 class="sessionDetails "> Details</h3>
							</v-list-item>
						</v-list-item-group>
						<div v-else>
							<h2 class="noPurchasesText"> No sessions sold.</h2>
						</div>
					</v-card>
				</v-tab-item>
			</v-tabs-items>
		</v-card>
	</div>
</template>

<script>
	import dayjs from 'dayjs'
	import { mapState } from 'vuex'
	export default {
		name:'Upcoming Sessions',
		props: ['sessions'],
		data: () => ({
			tab: 'sold',
		}),
		computed: mapState({
			sold: state => state.dashboard.home.sold,
			purchased: state => state.dashboard.home.purchased,
			selected: state => state.dashboard.home.selected
		}),
		async mounted() {
			this.$store.dispatch('dashboard/getPurchased')
			this.$store.dispatch('dashboard/getSold')
		},
		methods: {
			selectSession(session) {
				this.$store.dispatch('dashboard/selectSession', session)
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
		font: normal 600 0.9375vw Arboria;
		text-align: center;
	}
	.listItem {
		margin-left: 0.5263157894736842vw;
		margin-right: 0.5263157894736842vw;
		margin-bottom: 0.6842105263157895vw;
	}
	.selectedItem {
		background-color: #333333;
		border-radius: 5px;
	}
	.selectedItem .sessionDetails,
	.selectedItem .sessionDetails:hover {
		color: black;
	}
	.upcomingOuterDiv {
		border-radius: 5px;
		width: 28.63157894736842vw;
		background-color: #1e1e1e;
		padding-bottom: 1.0526315789473684vw;
	}
	.sessionItemTitle {
		display: inline-block;
		width: 12vw;
		font: normal bold 0.9473684210526315vw Arboria;
	}
	.sessionItemDate {
		display: inline-block;
		width: 7.526315789473684vw;
		font: normal bold 0.9473684210526315vw Arboria;
	}
	.sessionDetails {
		text-align: right;
		color: #d41458;
		width: 4.526315789473684vw;
	}
	.theme--dark.v-list-item:hover::before {
		border-radius: 5px;
	}
	.v-tab {
		margin-left: 0 !important;
		text-transform: none;
		font: normal 600 1.0526315789473684vw Poppins;
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
		width: 26.473684210526315vw;
		height: 14vw;
		background-color: #111111;
		border-radius: 10px;
		margin: auto;
		overflow-y: scroll;
		margin-top: 1.2105263157894737vw;
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
</style>
