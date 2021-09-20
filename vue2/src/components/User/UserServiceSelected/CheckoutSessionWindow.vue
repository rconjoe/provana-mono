<template>
	<div>
		<h3 class="mb-2">
			Are you sure?
		</h3>
		<!-- displaying the sevice  -->
		<v-card-text class="pt-0 pl-0 pb-1">
			booking {{ serviceName }} <br />
			{{ startDate }} @
			{{ startTime }}
		</v-card-text>
		<!-- 5 minute warning -->
		<h3 class="mandatoryFillText pb-4 pl-0">
			We will hold your spot for 5 minutes while you are redirected to checkout. If the time expires before you complete
			checkout the session will be removed from holding and republished.
		</h3>
		<!-- Cancel Button -->
		<v-btn @click="back" class="mr-4">
			<v-icon size=".8vw" class="mr-2"> fas fa-chevron-left</v-icon>
			Back
		</v-btn>
		<!-- conditional button if the session is a slot -->
		<v-btn @click="checkout()">
			Checkout Slot!
			<v-icon size=".8vw" class="ml-2"> fas fa-chevron-right</v-icon>
		</v-btn>
	</div>
</template>

<script>
	export default {
        props:['serviceName','startTime','startDate'],
		methods: {
			checkout(){
				this.$emit('checkout')
			},
			back(){
				this.$emit('back')
			}
		}
    }
</script>

<style scoped>
	.mandatoryFillText {
		padding-left: 0.7vw;
		font: normal 500 0.78125vw Arboria;
		color: #717171;
	}
</style>
