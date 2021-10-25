<template>
	<v-card class="convoContainer pa-0">
		<v-row justify="start" v-for="(message,i) in messages" :key="i" class=" px-0 ma-0">
			<!-- messages from currentUser -->
			<v-col v-if="message.from === uid" class="pa-0" align="end">
				<v-row>
					<!-- message text from currentUser -->
					<v-col>
						<span class="userMessage"> {{ message.text }} </span> <span class="messageTime"> {{ message.at }} </span>
					</v-col>
				</v-row>
			</v-col>
			<!-- message from Buyer -->
			<v-col v-else align-self="start">
				<v-row>
					<v-col cols="2">
						<v-avatar size="55" class="mr-2">
							<v-img :src="message.avatar"></v-img>
						</v-avatar>
					</v-col>
					<v-col>
						<span class="label"> {{ message.username }}</span> <span class="messageTime"> {{ message.at }}</span>
						<br />
						<h3 class="buyerMessage">
							{{ message.text }}
						</h3>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
	export default {
		props: ['messages', 'uid'],
	}
</script>

<style scoped>
	.buyerMessage {
		display: inline-block;
		font: normal 500 13px Poppins;
		max-width:12vw;
	}
	.messageTime {
		font-size: 12px;
	}
	.userMessage {
		font: normal 600 16px Poppins;
		max-width:12vw;
		display: inline-block;
	}
	.convoContainer {
		height: 432px;
		max-width: 400px;
		padding:0 !important;
		overflow-y:auto;
		overflow-x:hidden;
	}
</style>
