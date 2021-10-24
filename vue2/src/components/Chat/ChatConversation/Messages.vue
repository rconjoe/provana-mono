<template>
	<v-card class="convoContainer">
		<v-row justify="start" v-for="(message,i) in messages" :key="i" class=" px-1 ma-0">
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
			<v-col v-else align-self="end">
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
	}
	.messageTime {
		font-size: 12px;
	}
	.userMessage {
		font: normal 600 16px Poppins;
	}
	.convoContainer {
		height: 432px;
		width: 400px;
		overflow-y: hide;
		overflow-x: scroll;
	}
</style>
