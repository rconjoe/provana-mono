<template>
	<!-- New message input box -->
	<v-form @submit="sendMessage" class="messageInput">
		<v-textarea
			hide-details
			v-model="message"
			no-resize
			height="100"
			filled
			id="sendMessage"
			class="p-0"
			name="input-7-4"
			placeholder="Write a reply..."
		>
			<v-icon @click="sendMessage(message)" class="sendBtn" slot="append" :disabled="message == ''">
				fas fa-paper-plane</v-icon
			>
		</v-textarea>
	</v-form>
</template>

<script>
export default {
	data: () => ({
		message: '',
	}),
	methods: {
		sendMessage(m) {
			this.$emit('send-message', m)
			this.message = ''
		},
	},
}
</script>

<style scoped>
/* v-text area  */
::v-deep .theme--dark.v-text-field--filled > .v-input__control > .v-input__slot {
	background: #5c5b5b;
}
/* v-text area hover */
::v-deep
	.theme--dark.v-text-field--filled:not(.v-input--is-focused):not(.v-input--has-state)
	> .v-input__control
	> .v-input__slot:hover {
	background: #666666;
}
.messageInput {
	position: sticky;
	bottom: 0;
	z-index: 100;
}
.sendBtn {
	margin-top: 50px;
	margin-right: 5px;
}
.sendBtn:hover {
	color: #d4145a;
	cursor: pointer;
}
</style>
