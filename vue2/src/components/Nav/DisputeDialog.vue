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
					 Session: <span class="grey--text text--darken-3"> {{dispute.content.session}} </span>
					</div>
					<div class="text-left">
					is being dispute by: <span class="grey--text text--darken-3" >{{dispute.content.buyerUid}} </span>
					</div>
				</v-card-title>
				<v-card-text class="text-center">
					<h3 class="dateTime font-weight-medium white--text ">
						If you agree the money will be refunded to the buyer.
					</h3>
					<h3 class="dateTime font-weight-bold grey--text darken-3 mt-2">
						if you reject this dispute Provana.GG staff will determine the result.
					</h3>
				</v-card-text>
				<v-card-actions>
					<v-btn color="#717171" class="btnCTA" @click="disputeDialog = false">
						REJECT
					</v-btn>
					<v-spacer></v-spacer>
					<v-btn
						color="primary"
						class="btnCTA"
						@click="disputeDialog = false"
					>
						AGREE
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
</template>

<script>
export default {
    props:['dispute'],
    data: () => ({
        disputeDialog:true,
    }),

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