<template>
	<div>
		<v-navigation-drawer
			v-if="!$vuetify.breakpoint.mobile"
			v-model="drawer"
			width="250px"
			permanent
			absolute
			expand-on-hover
			class="navDrawer"
			mini-variant-width="54"
		>
			<v-list class="navList">
				<v-avatar class="avatarBorder ml-14" size="150">
					<v-img :src="avatar"> </v-img>
				</v-avatar>
				<!-- Menu -->
				<v-item-group v-model="window">
					<!-- Logic for Menu Selection -->
					<!-- For loop of btn items for each link -->
					<v-item v-for="link in links" :key="link.icon" v-slot:default="{ active }" class="pb-6 pt-4 ">
						<div>
							<v-btn
								activeClass="activeTab"
								class="dashBtn"
								text
								block
								:input-value="active"
								@click="$emit('update-window', link.value)"
							>
								<v-icon>{{ link.icon }}</v-icon>
								<span class="pl-4 linkText"> {{ link.text }} </span>
							</v-btn>
						</div>
					</v-item>
				</v-item-group>
			</v-list>
		</v-navigation-drawer>

		<v-bottom-navigation v-else class="mobileNav" fixed color="secondary" shift grow>
			<v-btn v-for="link in links" :key="link" @click="$emit('update-window', link.value)">
				<span> {{ link.text }} </span>

				<v-icon>{{ link.icon }}</v-icon>
			</v-btn>
		</v-bottom-navigation>
	</div>
</template>

<script>
export default {
	name: 'DashNavDrawer',
	data: () => ({
		drawer: null,
		value: null,
	}),
	props: ['links', 'window', 'avatar'],
}
</script>

<style scoped>
.mobileNav {
	padding-bottom: 5px;
}
.avatarBorder {
	margin-top: 80px;
	margin-bottom: 40px;
	border: 4px solid #fb4b6a;
}
.navDrawer {
	background-color: #1c1c1cb2;
	height: 100%;
}
.navList {
	height: 100%;
}
.dashBtn.v-btn {
	text-transform: none;
	white-space: normal;
}
.dashBtn.v-btn span.v-btn__content {
	padding-top: 150px;
}
.linkText {
	font: normal 500 1vw Poppins;
}
.activeTab {
	background-color: #fa4b6b;
	color: #121212;
}
.v-btn::before {
	opacity: 0;
}
</style>
