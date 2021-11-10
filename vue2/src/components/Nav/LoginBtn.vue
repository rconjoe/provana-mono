<template>
	<div>
		<a @click="openLogin"> Login</a>
		<span class="slash mx-1" v-if="!$vuetify.breakpoint.xs"> / </span>
		<a @click="openRegister" v-if="!$vuetify.breakpoint.xs"> Register</a>
	</div>
</template>

<script>
export default {
	name: 'LoginBtn',
	methods: {
		openLogin() {
			this.$store.dispatch('auth/setLoginOverlay', { showLogin: true, loginTab: 'login' })
		},
		openRegister() {
			this.$store.dispatch('auth/setLoginOverlay', { showLogin: true, loginTab: 'register' })
		},
	},
}
</script>
<style scoped>
@media (max-width: 783px) {
	a {
		font: normal 600 0.83rem Poppins;
	}
}
a {
	text-decoration: none;
	font: normal 600 1.2rem Poppins;
}
a:hover {
	color: white;
}
a.router-link-active {
	color: white;
}
.slash {
	font: normal 600 1.2rem Arboria;
	color: #717171;
}
</style>
