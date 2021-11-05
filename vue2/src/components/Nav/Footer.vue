<template>
	<v-footer app absolute color="#1E1E1E" dark>
		<v-container class="footerRow">
			<v-row>
				<v-col cols="12" md="3" class="align-center pa-0">
					<v-img max-width="177px" id="footerEyes" src="../../assets/ProvanaEyes_Footer.png"></v-img>
					<p class="copyright">
						© Provana Inc. 2021. Provana and ProvanaGG are registered trademarks of Provana Inc.
					</p>
					<p class="copyright">
						All other trademarks, service marks, names, and copyrights are property of their respective
						owners.
					</p>
				</v-col>
				<v-col cols="12" sm="4" md="3" class="border-left py-0">
					<router-link class="link" to="/"> About us</router-link>
					<router-link class="link" to="/"> Press</router-link>
					<router-link class="link" to="/"> Media Kit</router-link>
				</v-col>
				<!-- <v-col>
				<div class="aboutUsDiv">
					<router-link class="link" to="/"> Alpha Program</router-link>
					<router-link class="link" to="/"> Partnerships</router-link>
					<router-link class="link" to="/"> Content Assets</router-link>
					<router-link class="link" to="/"> Agencies and Orgs</router-link>
				</div>
			</v-col> -->
				<v-col cols="12" sm="4" md="3" class="border-left py-0">
					<router-link class="link" to="/"> Terms of Service</router-link>
					<router-link class="link" to="/"> Community Guidelines</router-link>
					<router-link class="link" to="/"> Ethics Policy</router-link>
				</v-col>
				<v-col cols="12" sm="4" md="3" class="border-left py-0">
					<router-link class="link" to="/"> Create an Account</router-link>
					<router-link class="link" to="/"> Contact Us</router-link>
					<router-link class="link" to="/"> Support</router-link>
				</v-col>
			</v-row>
		</v-container>
	</v-footer>
</template>

<script>
export default {
	name: 'Footer',
	data: () => ({}),
}
</script>

<style scoped lang="scss">
.border-left {
	border-left: solid 1px #333;
}
.footerRow {
	width: min(90%, 84rem);
	padding-top: 3rem;
	margin-bottom: 2rem;
}
#footerEyes {
	display: block;
	margin-bottom: 2.3rem;
}
a {
	text-decoration: none;
}
a:hover {
	color: white;
}
.link {
	display: block;
	width: 100%;
	font: normal 500 0.9rem Arboria;
	color: #717171;
	padding-bottom: 0.5rem;
}
.copyright {
	display: block;
	font: normal 500 0.9rem Arboria;
	color: #717171;
}
</style>
