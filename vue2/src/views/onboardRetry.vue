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
            console.log(this.$user.uid )
			const stripeAccountOnboard = functions.httpsCallable('stripeAccountOnboard')
			const response = await stripeAccountOnboard({ uid: this.$user.uid })
            console.log(response)
			window.location = response.data.url
           
		},
	}
</script>

<style></style>
