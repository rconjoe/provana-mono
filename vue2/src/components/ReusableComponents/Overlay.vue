<template>
	<div class="wrapper">
		<v-overlay class="overlay" color="#111111" :value="show" style="z-index:9" opacity=".97">
		<slot>
			content
		</slot>
    </v-overlay>
	</div>
</template>

<script>
	export default {
		name: 'overlay',
        props: {
            show:{
                default:false,
                type: Boolean,
            }
        },
		data: () => ({
			
		}),
	}
</script>

<style scoped>
 >>>.v-overlay__content{
   width: 80%;
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