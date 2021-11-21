<template>
	<v-app>
		<!-- global navbar -->

		<!-- router content -->
		<v-main>
			<v-container class="appContainer ">
				<CustomAppBar />

				<v-progress-linear
					color="grey lighten-5"
					background-color="grey darken-1"
					rounded
					indeterminate
					:active="loading"
				>
				</v-progress-linear>
				<v-alert
					class="errorMessage"
					dismissible
					id="error"
					type="warning"
					:icon="error.icon"
					:color="error.color"
					v-model="error.show"
				>
					{{ error.message }}
				</v-alert>
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
	computed: mapState({
		error: (state) => state.error.data,
		loading: (state) => state.loading.show,
	}),
}
</script>
<style lang="scss">
.appContainer {
	max-width: 1920px;
}
/* scroll bar theme */
:root {
	color-scheme: dark;
}
html {
	--scrollbarBG: #111;
	--thumbBG: #90a4ae;
}
::-webkit-scrollbar {
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
#error {
	opacity: 1;
	z-index: 8;
	position: fixed !important;
	width: 99%;
	font: normal 600 1.2rem Arboria;
	text-transform: lowercase;
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
