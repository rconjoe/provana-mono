<template> 
<LoadingOverlay message="Please wait while we redirect you" />
</template>

<script>
	import { functions } from '../plugins/firebase'
    import LoadingOverlay from '../components/LoadingOverlay.vue'
	export default {
		name: 'onboardRetry',
		components:{LoadingOverlay},
        async mounted() {
			const stripeAccountOnboard = functions.httpsCallable('stripeAccountOnboard')
			const response = await stripeAccountOnboard({ uid: this.$user.uid })
			window.location = response.data.url
           
		},
	}
</script>

<style></style>
