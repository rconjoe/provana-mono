<template>
	<div>
		<h3 class="toolTipTitle">
			{{ serviceName }}
		</h3>
		<v-card-text class="pt-0 pl-0 pb-1">
			{{ startTime }} @
			{{ startDate }}
		</v-card-text>
		<v-divider></v-divider>
		<!-- If the service is mandtory fill display warning to the buyer -->
		<div v-if="mandatory">
			<h3 class="mandatoryFillTitle"> <v-icon color="warning"> fas fa-exclamation-triangle</v-icon> Mandatory Fill </h3>
			<h3 class="mandatoryFillText">
				If all slots are not filled before the event start time, All money will be refunded and the session will be
				automatically canceled.
			</h3>
		</div>
		<!-- List the slots available if the slot is booked = disabled -->
		<v-list dense color="transparent">
			<!-- loop through slots creating list item for each -->
			<v-list-item v-for="(slot, i) in slots" :key="i" class="slotListItem" :disabled="slot.status === 'booked'">
				<h3 class="slotItemTime"> Slot {{ slot.slot }} of {{ slot.slots }}</h3>
				<v-spacer> </v-spacer>
				<v-btn
					color="primary"
					class="btnCTA"
					:disabled="slot.status != 'published'"
					@click="prebookSlot(slot)"
				>
					Book it!
				</v-btn>
			</v-list-item>
		</v-list>
	</div>
</template>

<script>
	export default {
        props: ['serviceName', 'slots','startTime','startDate','mandatory'],
        methods:{
            prebookSlot(slot){
                this.$emit('prebook-slot',slot)
            }
        }
    }
</script>

<style scoped>

</style>
