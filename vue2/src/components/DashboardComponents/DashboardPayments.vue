<template>
    <!-- Container row  -->
	<v-row no gutters class="pt-12 paymentRow" :class="$vuetify.breakpoint.mobile? 'px-3' : 'px-12'">
		<h1 class="dashHeader"> Settings </h1>
        <!-- Notification List Container-->
		<v-col cols="12" class="wrapperCol">
			<h1 class="contact"> Payments </h1>
            <!-- save button -->
			<v-row>
				<v-col class="sectionCol">
					<h1 class="windowHeader">Stripe Account</h1>
					<ConnectWithStripe v-if="onboarded === false" :onboarded='onboarded' />
                    <h3 class="subText"> PlaceholderText </h3>
				</v-col>
			</v-row>
            <v-row>
				<v-col class="sectionCol">
					<h1 class="windowHeader">Referral Code</h1>
                    <h3 class="subText"> JSTN - 39203947 </h3>
				</v-col>
			</v-row>

		</v-col>
	</v-row>
</template>

<script>
import ConnectWithStripe from './ConnectWithStripe.vue'
export default {
	name: 'DashboardPayments',

	components: {
		ConnectWithStripe,
	},

	data: () => ({
		onboarded: null,
	}),

	mounted() {
		this.onboarded = this.$store.state.auth.claims.onboarded
	},
};
</script>

<style scoped>
.lastSwitch{
	display: inline-block  !important;
}
.wrapperCol{
	padding-top:6vw;
	padding-left:6vw;
}
.contact{
	font: normal 600 2.60vw Poppins;
	padding-bottom: 3vw;
}
.switchCol{
	max-width: 15vw;
	min-width: 15vw;
}
.inline{
	display:inline-block;
	width:19vw;
	vertical-align: bottom;
}
.emailInput{
	width:19vw;
	display: inline-block;
}
.notificationCol{
	max-width: 24vw;
	min-width:24vw;
	margin-left: 4.17vw;

}

.paymentRow{
	position:relative
}
.dashHeader {
  transform: rotate(-90deg);
  position: absolute;
  font: normal normal bold 5.21vw Poppins;
  color: #1e1e1e;
  margin-left:-10.6vw;
  margin-top: 5.8vw;
}
.sectionCol{
	max-width:30vw;
	min-width:27vw;
	margin-left: 4.17vw;
    padding-bottom: 3vw;

}
.subText{
    font: normal normal 0.78125vw Poppins;
}
.windowHeader {
	font: normal  500 1.3020833333333333vw Poppins;
}
</style>