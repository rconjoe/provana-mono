<template>
	<v-card class="convoContainer pa-0" flat>
		<div class="messagesDiv" v-for="(message, i) in messages" :key="i">
			<div class="userMsgDiv" v-if="message.from === uid">
				<span class="userMessage"> {{ message.text }} </span>
				<span class="messageTime"> {{ message.at }} </span>
			</div>
			<div class="otherMsgDiv" v-else>
				<v-avatar size="55" class="msgAvatar mr-2">
					<v-img :src="message.avatar"></v-img>
				</v-avatar>

				<span class="username"> {{ message.username }}</span>
				<span class="messageTime"> {{ message.at }}</span>
				<h3 class="buyerMessage">
					{{ message.text }}
				</h3>
			</div>
		</div>
	</v-card>
</template>

<script>
export default {
	props: ['messages', 'uid'],
}
</script>

<style scoped lang="scss">
.buyerMessage {
	display: inline-block;
	font: normal 500 13px Poppins;
	max-width: 90%;
}
.messageTime {
	font-size: 12px;
	justify-self: flex-start;
	vertical-align: top;
}
.userMsgDiv {
	text-align: right;
}
.userMessage {
	font: normal 600 16px Poppins;
	max-width: 80%;
	display: inline-block;
}
.convoContainer {
	margin-right: 5px;
	padding-bottom: 100px;
	min-height: 100%;
	max-width: 100%;
	padding: 0 !important;
	overflow-y: auto;
	overflow-x: hidden;
	position: relative;
	z-index: 1;
}
.otherMsgDiv {
	margin-bottom: 20px;
	display: grid;
	grid-template-columns: auto 1fr;
	grid-template-rows: auto 1fr;
	grid-template-areas:
		'avatar user'
		'time   message';
	.msgAvatar {
		grid-area: avatar;
		grid-row: 1/2;
		justify-self: center;
	}
	.messageTime {
		grid-area: time;
		font-size: 12px;
		justify-self: center;
	}
	.username {
		grid-area: user;
		align-self: center;
	}
	.buyerMessage {
		grid-area: message;
		grid-row: 2/3;
	}
}
</style>
