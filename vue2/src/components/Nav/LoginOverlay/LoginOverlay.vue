<template>
	<div class="loginWrap">
		<v-img src="../../../assets/ProvanaEyes_Footer.png" max-width="266" class="loginEyes" />
		<v-tabs v-model="tab" hide-slider class="mt-10 mx-10" active-class="activeTab">
			<v-tab class="loginTab">
				Login
			</v-tab>
			<v-tab class="registerTab">Register</v-tab>
			<v-spacer> </v-spacer>
			<v-tab class="closeTab" @click="closeLogin"> x</v-tab>
		</v-tabs>
		<v-tabs-items v-model="tab">
			<v-tab-item>
                <LoginTab @close-login="closeLogin" />
			</v-tab-item>
			<v-tab-item>
				<v-card flat color="#111111">
					<Register />
				</v-card>
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script>
    import LoginTab from './LoginTab.vue'
    import Register from '../../../views/Register.vue'
	export default {
        components:{LoginTab,Register},
		data: () => ({
			tab: 0,
		}),
		methods: {
			closeLogin() {
				this.$emit('close-login')
				console.log('closed')
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
