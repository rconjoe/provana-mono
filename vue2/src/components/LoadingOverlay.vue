<template>
	<div class="wrapper">
		<v-overlay class="overlay" color="#111111" :value="show" style="z-index:9" opacity=".97">
    <h3 class="waitText"> Please wait while we redirect you for payment...</h3>
		<div class="bar">
			<v-progress-linear :value="show" indeterminate absolute> </v-progress-linear>
		</div>
    </v-overlay>
	</div>
</template>

<script>
	export default {
		name: 'LoadingOverlay',
		data: () => ({
			show: true,
		}),
	}
</script>

<style scoped>
 >>>.v-overlay__content{
   width: 100%;
 }
  .waitText{
    text-align: center;
    font: normal bold 1.5vw Poppins;
    color: white;
  }
	.wrapper {
		z-index: 9;
    width: 100vw;
	}
	.bar {
		position: center center;
	}
</style>