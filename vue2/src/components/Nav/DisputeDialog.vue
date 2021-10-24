<template>
  <!-- Dispute Dialog -->
		<v-dialog v-model="disputeDialog" width="500" persistent>
			<v-card>
				<div class="disputeHeader"> 
						<v-icon color="primary" > fas fa-exclamation </v-icon> 
						<span class="ml-3 "> DISPUTE</span>
					</div>
				<v-card-title class="text-h5 text-bold text-center font-weight-bold dark">
					
					<div class="mt-3 text-left" >
					 Session: <span class="grey--text text--darken-3"> {{dispute.content}} </span>
					</div>
				</v-card-title>
				<v-card-text class="text-center">
					<h3 class="dateTime font-weight-medium white--text ">
						you have an ongoing dispute see discord for details. If you do not respond via discord the money associated with this session will be refunded to the buyer automatically.
					</h3>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="primary"
						class="btnCTA"
						@click="disputeDialog = false"
					>
						I understand
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
</template>

<script>
import { db } from '../../plugins/firebase'
export default {
	name:'DisputeDialog',
  props:['dispute'],
  data: () => ({
    disputeDialog:true,
  }),

  methods: {
    async readDispute() {
      await db
        .collection('notifications')
        .doc(this.$user.uid)
        .collection('notif')
        .doc(dispute.id)
        .update({ unread: false })
    }
  },

}
</script>

<style scoped>
	>>>.btnCTA .v-btn__content {
		min-width: 4.6041666666666665vw;
		font: normal 700 0.78215vw Poppins !important;
		letter-spacing: 0px;
		border-radius: 8px;
	}
	>>>.btnCTA .v-btn{
		min-width:4.6041666666666665vw
	}
	.disputeHeader{
		padding:.5vw;
		border: 2px solid #d41458;
		justify-content: center;
		display: flex;
	}
	.disputeHeader span {
		font: normal bold 1.4vw Poppins;
	}
</style>
