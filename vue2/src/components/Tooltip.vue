<template>
	<v-tooltip right :color="bgColor">
		<template v-slot:activator="{ on, attrs }">
			<v-icon :size="size" :color="color" class="mr-2 align-self-center" v-on="on" v-bind="attrs">
				{{ icon }}
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
		size: {
			type: String,
			default: '15px',
		},
		icon: {
			type: String,
			default: 'fas fa-exclamation-circle ',
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
