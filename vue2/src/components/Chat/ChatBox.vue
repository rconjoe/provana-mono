<template>
	<!-- Row container for entire Chat component -->
	<v-row class="fixedChat" v-click-outside="clickOutside">
		<v-col class="pb-0">
			<!-- Transition wrapper for the opening/closing of chat box -->
			<v-expand-transition>
				<!-- Actual box of the chat that contains 2 different components ChatRoomList or ChatConversation -->
				<v-card v-if="chatShow" height="600" class="chatBox">
					<v-slide-x-transition mode="out-in">
						<ChatConversation
							@back-to-rooms="backToRooms"
							:chatroom="selectedRoom"
							v-if="window === 'chatConvo' && selectedRoom != null"
						/>
						<ChatRoomList @room-selected="roomSelected" v-if="window === 'chatRoomList'" />
					</v-slide-x-transition>
				</v-card>
			</v-expand-transition>
		</v-col>
		<!-- Button that triggers ChatBox -->
		<v-col cols="12" :class="$vuetify.breakpoint.mobile ? 'd-flex justify-end' : 'pt-0'">
			<v-btn
				v-if="!$vuetify.breakpoint.mobile"
				class="pa-2"
				id="chatBtn"
				color="#131313"
				block
				@click="chatShow = !chatShow"
				shaped
			>
				<v-icon class="pl-4 msgIcon" size="1vw"> fas fa-comment-alt</v-icon> CHAT
				<v-icon class="chevronIcon" size="1.3vw" v-if="chatShow"> fas fa-chevron-down</v-icon>
				<v-icon class="chevronIcon" size="1.3vw" v-else> fas fa-chevron-up</v-icon>
			</v-btn>
			<v-btn v-else @click="chatShow = !chatShow" fab id="chatBtnFab">
				<v-icon class=" msgIcon"> fas fa-comment-alt</v-icon>
			</v-btn>
		</v-col>
	</v-row>
</template>

<script>
import ChatRoomList from '@/components/Chat/ChatRoomList'
import ChatConversation from './ChatConversation/ChatConversation.vue'
export default {
	name: 'ChatBox',
	components: { ChatRoomList, ChatConversation },
	data: () => ({
		chatShow: false,
		window: 'chatRoomList',
		selectedRoom: null,
	}),
	methods: {
		clickOutside() {
			this.chatShow = false
		},
		roomSelected(e) {
			this.selectedRoom = e
			this.window = 'chatConvo'
		},
		backToRooms() {
			this.window = 'chatRoomList'
		},
	},
}
</script>

<style scoped>
#chatBtn {
	justify-content: left;
	height: 40px;
	font: normal 600 1rem Poppins !important;
}

.fixedChat {
	max-width: 400px;
	position: fixed;
	bottom: 0;
	right: 10px;
	z-index: 4;
}
.chevronIcon {
	margin-left: 230px;
}
.msgIcon {
	transform: scaleX(-1);
}
.chatBox {
	margin-bottom: 0;
	overflow-x: hidden;
	overflow-y: scroll;
}
</style>
