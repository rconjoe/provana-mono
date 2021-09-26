<template>
	<v-card max-width="380" min-height="600" class="ma-0 pa-0">
		<!-- Toolbar header  with Username and order details -->
		<ConvoToolbar
			:title="chatroom.title"
			:editTitle="editTitle"
			:creator="this.$user.uid === chatroom.creator"
			@toggle-edit="toggleEdit"
			@change-title="changeTitle"
			@back-to-rooms="backToRooms"
		/>
		<!-- Chat Conversation -->
		<Messages :uid="uid" :messages="messages" />
		<v-row>
			<v-col class="pb-0">
				<SendMessage @send-message="sendMessage" />
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
	import { db } from '../../../plugins/firebase'
	import dayjs from 'dayjs'
	import utc from 'dayjs/plugin/utc'
	import timezone from 'dayjs/plugin/timezone'
	import SendMessage from './SendMessage.vue'
	import ConvoToolbar from './ConvoToolbar.vue'
	import Messages from './Messages.vue'
	dayjs.extend(utc)
	dayjs.extend(timezone)

	export default {
		name: 'ChatConvo',
		props: ['chatroom'],
		components: { SendMessage, ConvoToolbar, Messages },

		data: () => ({
			editTitle: false,
			messages: [],
			users: [],
		}),
		mounted() {
			this.uid = this.$user.uid
			const messages = db
				.collection('chats')
				.doc(this.chatroom.roomId)
				.collection('messages')
			messages.onSnapshot(async (snapshot) => {
				this.messages = []
				let temp = []
				snapshot.forEach((message) => {
					const data = message.data()
					const tz = this.$store.state.auth.tz
					const unixAt = data.at
					const _at = dayjs.unix(unixAt).format()
					const at = dayjs(_at)
						.tz(tz)
						.format('hh:mm')
					const msg = {
						from: data.from,
						username: data.username,
						at: at,
						unixAt: unixAt,
						text: data.text,
						room: this.chatroom.id,
						avatar: data.avatar,
					}
					temp.push(msg)
				})
				temp.sort(function compareTimes(a, b) {
					return a.unixAt - b.unixAt
				})
				this.messages = temp
			})
		},
		methods: {
			async sendMessage(message) {
				await db
					.collection('chats')
					.doc(this.chatroom.roomId)
					.collection('messages')
					.add({
						from: this.$user.uid,
						username: this.$user.displayName,
						at: dayjs().unix(),
						text: `${message}`,
						room: this.chatroom.roomId,
					})
					.catch((err) => {
						console.error(`Error sending that message: ${err}`)
					})
			},
			toggleEdit() {
				this.editTitle = !this.editTitle
			},
			async changeTitle(t) {
				await db
					.collection('chats')
					.doc(this.chatroom.roomId)
					.update({ title: t })
					.catch((err) => {
						console.error(`Error updating title: ${err}`)
					})
				this.backToRooms()
			},

			backToRooms() {
				this.$emit('back-to-rooms')
			},
		},
	}
</script>

<style scoped>

</style>
