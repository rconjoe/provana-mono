<template>
	<v-card class="ma-0 pa-0 chatContainer">
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
		<Messages class="messages" :uid="uid" :messages="messages" />
		<SendMessage @send-message="sendMessage" />
	</v-card>
</template>

<script>
import { mapState } from 'vuex'
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
	computed: mapState({
		profile: (state) => state.auth.currentUser,
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
					from: this.profile.uid,
					username: this.profile.username,
					at: dayjs().unix(),
					text: `${message}`,
					room: this.chatroom.roomId,
					avatar: this.profile.avatar,
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
.chatContainer {
	height: 100%;
}
</style>
