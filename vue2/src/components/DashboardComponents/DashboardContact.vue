<template>
    <!-- Container row  -->
	<v-row no gutters class="pt-12 contactRow" :class="$vuetify.breakpoint.mobile? 'px-3' : 'px-12'">
		<h1 class="dashHeader"> Settings </h1>
        <!-- Notification List Container-->
		<v-col cols="12" class="wrapperCol">
			<h1 class="contact"> Contact </h1>
			<v-row>
                <!-- Notification Titles -->
				<v-col class="notificationCol">
					<h3 class="notificationHeader"> Notifications </h3>
					<v-col cols="12"><h4 class="notificationTitle"> Purchases </h4></v-col>
					<v-col cols="12"><h4 class="notificationTitle"> Messages </h4></v-col>
					<v-col cols="12"><h4 class="notificationTitle"> Cancelations </h4></v-col>
					<v-col cols="12"><h4 class="notificationTitle"> Reschedules </h4></v-col>
					<v-col cols="12"><h4 class="notificationTitle"> Followed Sellers </h4></v-col>
				</v-col>
                <!-- Email notification switch input -->
				<v-col class="switchCol">

					<h3 class="notificationHeader"> Email</h3>
					<!--Email notification Purchase switch -->
					<v-switch v-model="notifications.email.purchases" class="mt-1" name="purchases" color="#DF3F5E" hide-details></v-switch>
					<!--Email notification message switch -->
					<v-switch v-model="notifications.email.messages" name="messages" color="#DF3F5E" hide-details></v-switch>
					<!--Email notification cancelations switch -->
					<v-switch v-model="notifications.email.cancelations" name="cancelations" color="#DF3F5E" hide-details></v-switch>
					<!--Email notification reschedules switch -->
					<v-switch v-model="notifications.email.reschedules" name="reschedules" color="#DF3F5E" hide-details></v-switch>
					<!--Email notification followedSellers switch -->
					<v-switch v-model="notifications.email.followedSellers" name="followedSellers" class="lastSwtich" color="#DF3F5E" hide-details>
						<v-btn @click="updateNotifications" text :block="$vuetify.breakpoint.mobile" class="saveBtn" slot="label" color="secondary"> SAVE</v-btn>
					</v-switch>

				</v-col>
			</v-row>
            <!-- save button -->
			<v-row>
				<v-col class="emailCol pt-12">
					<h1 class="notificationHeader">Email</h1>
					<h4 v-if="!editEmail" class="firstTitle pa-2 inline text-truncate"> {{profile.email}} </h4>
					<v-text-field class="emailInput" v-else single-line :placeholder="profile.email"> <v-icon  @click="editEmail = !editEmail" slot="append"> fas fa-save </v-icon> </v-text-field>
					<v-btn @click="editEmail = !editEmail" text :block="$vuetify.breakpoint.mobile" class="saveBtn" slot="label" color="secondary"> Edit</v-btn>

				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script>

export default {
	name: 'DashboardContact',


	data: () => ({
		profile:{},
		info: '',
		url: '',
		editEmail: false,
		form: false,
		isLoading: false,
		notifications: {
			phone: {
				purchases: false,
				messages: false,
				cancelations: false,
				reschedules: false,
				followedSellers: false,
			},
			email: {
				purchases: false,
				messages: false,
				cancelations: false,
				reschedules: false,
				followedSellers: false,
			},
		},
	}),

    methods:{
        updateNotifications(){
            this.$emit('update-notifications', this.notifications)
        }
    }
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
	font: normal 500 2.60vw Poppins;
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

.contactRow{
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
.saveBtn{
	margin-left: 4vw;
	font: normal bold 1vw Poppins;
}
.emailCol{
	max-width:30vw;
	min-width:27vw;
	margin-left: 4.17vw;

}
.notificationHeader {
	font: normal  600 1.3020833333333333vw Poppins;
}
.firstTitle {
	font: normal normal 1vw Poppins;
	margin-top: 16px;
	line-height: 20px;
}
.notificationTitle {
	font: normal normal 1vw Poppins;
	line-height: 20px;
}
</style>
