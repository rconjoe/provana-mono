<template>
	<v-tooltip right :color="bgColor">
		<template v-slot:activator="{ on, attrs }">
			<v-icon size="15px" :color="color" class="mr-2 align-self-center" v-on="on" v-bind="attrs"
				>fas fa-exclamation-circle
			</v-icon>
		</template>
		<span id="toolTip">
			<slot> </slot>
		</span>
	</v-tooltip>
</template>

<script>
export default {
	props: {
		color: {
			type: String,
			default: '#333333',
		},
		bgColor: {
			type: String,
			default: '#333333',
		},
	},
}
</script>

<style scoped lang="scss">
#toolTip {
	text-align: center;
	max-width: 270px;
}
</style>
