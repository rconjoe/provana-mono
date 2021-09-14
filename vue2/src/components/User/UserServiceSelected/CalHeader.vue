<template>
  <v-sheet height="40px" color="transparent">
					<h1 class="calHeaderText"> Pick the right spot </h1>
					<v-btn fab text color="grey darken-2" @click="prev">
						<v-icon>
							fas fa-chevron-left
						</v-icon>
					</v-btn>

					<v-btn fab text color="grey darken-2" @click="next">
						<v-icon>
							fas fa-chevron-right
						</v-icon>
					</v-btn>
				</v-sheet>
</template>

<script>
export default {
    methods:{
        prev(){
            this.$emit('prev')
        },
        next(){
            this.$emit('next')
        }
    }

}
</script>

<style scoped>
	.calHeaderText {
		font: normal 600 1.5625vw Poppins;
		letter-spacing: -0.078125vw;
		display: inline-block;
	}

</style>