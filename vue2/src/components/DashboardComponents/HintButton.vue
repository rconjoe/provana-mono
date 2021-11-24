<template>
	<div class="hintDiv">
		<div class="hintContent">
			<h1 class="hintHeader"> What do I do here? </h1>
			<p class="hintText"> <slot> </slot></p>
		</div>
		<v-icon class="icon" color="secondary" @click="grow"> fas fa-question</v-icon>
	</div>
</template>

<script>
import gsap from 'gsap'
export default {
	data: () => ({
		hintOpen: false,
		timeline: gsap.timeline({ delay: 0 }),
	}),
	methods: {
		grow() {
			if (this.hintOpen == false) {
				this.growTween.play()
				this.hintOpen = true
			} else {
				this.growTween.reverse()
				this.hintOpen = false
			}
		},
	},
	mounted() {
		this.growTween = this.timeline
			.to('.hintDiv', {
				minWidth: '300px',
				minHeight: '375px',
				duration: 0.3,
			})
			.from('.hintContent', {
				opacity: 0,
				duration: 0.1,
			})
			.pause(0)
	},
}
</script>

<style scoped lang="scss">
.hintDiv {
	overflow: hidden;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	border-bottom-left-radius: 20px;
	border-top-left-radius: 20px;
	border-bottom-right-radius: 20px;
	height: 40px;
	width: 40px;
	border-top-right-radius: none;
	border: 3px solid #fa4b6b;
	background-color: #1e1e1e;
}
.hintHeader {
	font: normal 600 20px Poppins;
	letter-spacing: -1px;
	color: #fa4b6b;
	text-align: center;
	padding-bottom: 15px;
}
.icon {
	align-self: flex-start;
	justify-self: flex-end;
	margin-top: 5px;
	margin-right: 7px;
}
.hintText {
	font: normal 500 15px Arboria;
}
.hintContent {
	margin-top: 50px;
	margin-left: 50px;
	margin-right: 35px;
}
</style>
