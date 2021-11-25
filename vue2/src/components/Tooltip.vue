<template>
	<v-tooltip right color="#333333">
		<template v-slot:activator="{ on, attrs }">
			<v-icon size="15px" color="#333333" class="mr-2 align-self-center" v-on="on" v-bind="attrs"
				>fas fa-exclamation-circle
			</v-icon>
		</template>
		<span id="toolTip">
			<slot> </slot>
		</span>
	</v-tooltip>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
#toolTip {
	text-align: center;
	max-width: 270px;
}
</style>
