<template>
	<transition @enter="alertEnter">
		<v-alert
			dismissible
			id="error"
			type="warning"
			:icon="error.icon"
			:color="error.color"
			v-if="error.show"
			ref="errorAlert"
		>
			{{ error.message }}
		</v-alert>
	</transition>
</template>

<script>
import { mapState } from 'vuex'
import gsap from 'gsap'

export default {
	computed: mapState({
		error: (state) => state.error.data,
	}),
	methods: {
		alertEnter() {
			gsap.from('#error', {
				opacity: 0,
				scale: 0,
				duration: 1,
				ease: 'elastic',
				overflow: 'hidden',
			})
		},
	},
}
</script>

<style>
#error {
	max-width: 1920px;
	opacity: 1;
	z-index: 8;
	width: 99%;
	position: fixed;
	font: normal 600 1.2rem Arboria;
	text-transform: lowercase;
}
</style>
