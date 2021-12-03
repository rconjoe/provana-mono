<template>
	<v-app>
		<!-- global navbar -->

		<!-- router content -->
		<v-main>
			<v-container class="appContainer pt-0 ">
				<CustomAppBar />

				<v-progress-linear
					color="grey lighten-5"
					background-color="grey darken-1"
					rounded
					indeterminate
					:active="loading"
				>
				</v-progress-linear>

				<router-view />
				<Footer />
			</v-container>
		</v-main>
		<!-- footer -->
	</v-app>
</template>

<script>
import CustomAppBar from '@/components/Nav/CustomAppBar.vue'
import Footer from '@/components/Nav/Footer.vue'
import { mapState } from 'vuex'

export default {
	name: 'App',
	appNavDrawer: false,
	components: { CustomAppBar, Footer },
	data: () => ({
		scrollTop: 1,
	}),
	methods: {},
	computed: mapState({
		error: (state) => state.error.data,
		loading: (state) => state.loading.show,
	}),
}
</script>
<style lang="scss">
.appContainer {
	max-width: 1920px;
	position: relative;
	padding: 0;
}
/* scroll bar theme */
:root {
	color-scheme: dark;
}
html {
	--scrollbarBG: #111;
	--thumbBG: #90a4ae;
}
body {
	scrollbar-width: thin;
	scrollbar-color: #111;
}
::-webkit-scrollbar-corner {
	background: rgba(0, 0, 0, 0);
}
::-webkit-scrollbar-track {
	background: #111111;
}
::-webkit-scrollbar-thumb {
	background: #333333;
	border-radius: 7px;
}

.v-alert__content {
	text-transform: uppercase;
}

html {
	scroll-behavior: smooth;
}
/* Global btn style */

.btnCTA.v-btn {
	font: normal 600 1.2rem Poppins;
	letter-spacing: 0px;
	padding: 0 24px;
	border-radius: 10px;
}
.btnCTA:hover {
	color: #fa4b6b;
}
.btnCTA.v-btn:hover::before {
	color: #f5f5f5;
	opacity: 1;
}
.btnCTA.v-btn:hover {
	color: #fa4b6b;
	background-color: #f5f5f5 !important;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

/* Firefox */
input[type='number'] {
	-moz-appearance: textfield;
}
</style>
