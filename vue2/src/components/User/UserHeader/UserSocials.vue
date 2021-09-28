<template>
	<div class="socialBtnWrapper d-flex">
		<!-- social icons displayed inline-block to float next to previous h1 -->
		<div>
			<a :href="`https://twitter.com/${twitter}`" target="_blank" v-if="twitter">
				<v-icon color="#f5f5f5" class="socialIcon" size="1.5vw"> fab fa-twitter</v-icon>
			</a>
			<a :href="`https://facebook.com/${facebook}`" target="_blank" v-if="facebook">
				<v-icon color="#f5f5f5" class="socialIcon" size="1.5vw"> fab fa-facebook</v-icon>
			</a>
			<a :href="`https://youtube.com/${youtube}`" target="_blank" v-if="youtube">
				<v-icon color="#f5f5f5" class="socialIcon" size="1.5vw"> fab fa-youtube</v-icon>
			</a>
			<a :href="`https://twitch.tv/${twitch}`" target="_blank" v-if="twitch">
				<v-icon color="#f5f5f5" class="socialIcon" size="1.5vw"> fab fa-twitch</v-icon>
			</a>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			twitter: {
				default: '/',
				type: String,
			},
			facebook: {
				default: '/',
				type: String,
			},
			youtube: {
				default: '/',
				type: String,
			},
			twitch: {
				default: '/',
				type: String,
			},
		},
	}
</script>

<style scoped>
	a {
		text-decoration: none;
	}
	a:hover {
		color: white !important;
	}
	.socialBtnWrapper {
		display: inline-block;
	}
	.socialIcon:hover {
		transform: scale(1.4);
	}
	.socialIcon {
		padding-right: 0.260417vw;
		transition: transform 0.3s ease;
	}
</style>
