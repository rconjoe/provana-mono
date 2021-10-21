<template>
	<div class="loginWrap">
		<v-img src="../../../assets/ProvanaEyes_Footer.png" max-width="266" class="loginEyes" />
		<v-tabs v-model="tab" hide-slider class="mt-10 mx-10" active-class="activeTab">
			<v-tab class="loginTab" href="#login">
				Login
			</v-tab>
			<v-tab class="registerTab" href="#register">Register</v-tab>
			<v-spacer> </v-spacer>
			<v-tab class="closeTab" @click="closeLogin"> x</v-tab>
		</v-tabs>
		<v-tabs-items v-model="tab">
			<v-tab-item value="login">
                <LoginTab @close-login="closeLogin" />
			</v-tab-item>
			<v-tab-item value="register">
					<RegisterTab  @goto-login="gotoLogin"/>
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script>
    import LoginTab from './LoginTab.vue'
    import RegisterTab from './RegisterTab/RegisterTab.vue'
	export default {
        components:{LoginTab,RegisterTab},
		props:['tab'],
		data: () => ({
			
		}),
		methods: {
			closeLogin() {
				this.$store.dispatch('auth/setLoginOverlay',{showLogin:false})
			},
			gotoLogin(){
				this.tab = 0
			},
		},
	}
</script>

<style scoped>

	/* v-tabs bar */
	>>>.theme--dark.v-tabs > .v-tabs-bar {
		background-color: transparent !important;
	}
    /* v-tab */
    .v-tab{
        font: normal 500 1.8229166666666667vw Poppins;
        letter-spacing: -0.09114583333333333vw ;
        text-transform: none;
    }
    /* v-tab hover */
    .theme--dark.v-tabs .v-tab:hover::before{
        opacity:0
    }
    .loginTab{
        background-color: #111111;
        border-top-left-radius: 10px;
    }
    .activeTab{
        color:#FA4B6B !important;
    }
    .registerTab{
        border-top-right-radius: 10px;
        background-color: #111111;
    }
	.loginWrap {
		min-width: 30.104166666666668vw;
	}
	.loginEyes {
		margin-left: auto;
		margin-right: auto;
	}
    .closeTab{
        background-color: transparent !important;
        margin-right: 50px;
    }
</style>
