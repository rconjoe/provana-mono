<template>
	<div class="hintDiv" ref="hintBox">
		<div class="d-flex justify-end">
			<v-icon class="icon" color="secondary" @click="grow"> fas fa-question</v-icon>
		</div>
		<div class="hintContent" ref="hintContent">
			<h1 class="hintHeader"> What do I do here? </h1>
			<p class="hintText"> <slot> </slot></p>
		</div>
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
			.set(this.$refs.hintBox, { height: 'auto', width: '300px' })
			.from(this.$refs.hintBox, {
				width: '50px',
				height: '50px',
				duration: 0.3,
			})
			.from(this.$refs.hintContent, {
				opacity: 0,
				duration: 0.3,
			})
			.pause(0)
	},
}
</script>

<style scoped lang="scss">
.hintDiv {
	overflow: hidden;
	display: block;
	border-bottom-left-radius: 25px;
	border-top-left-radius: 25px;
	border-bottom-right-radius: 25px;
	height: auto;
	width: 300px;
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
	margin-top: 10px;
	margin-right: 12px;
}
.hintText {
	font: normal 500 15px Arboria;
	padding-bottom: 50px;
}
.hintContent {
	margin-top: 50px;
	margin-left: 50px;
	margin-right: 35px;
}
</style>
