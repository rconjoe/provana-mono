<template>
  <v-card max-width="380" min-height="600" class="ma-0 pa-0">
    <!-- Toolbar header  with Username and order details -->
    <v-toolbar class="toolbar" color="#111111" dark>
      <v-row align="center">
        <v-col class="px-0 mt-2 messageCol">
          <div v-if="editTitle === false">
          <!-- Back Button -->
          <v-btn @click="backToRooms" x-small color="transparent" fab class="pa-0 mb-1">
            <v-icon  class="pa-0" size="1.3vw" color="primary"> fas fa-chevron-left </v-icon>
          </v-btn>
          <!-- Username -->
          <div class="titleDiv" @click="toggleEdit">
          <span  class="pl-2 convoTitle text-truncate">{{ chatroom.title }}
          <!-- TODO: move this over all the way to the right and expand title -->
          </span>
          <v-icon small color="primary" class="ml-0 pencil" >
            fas fa-pencil-alt
          </v-icon> <span class="edit"> edit</span>
          </div>

          </div>
          <v-text-field
            hint=" Enter to submit or X to cancel"
            persistent-hint
            append-icon="fas fa-times"
            color="#ffffff"
            dark
            v-else
            solo
            dense
            v-model="chatroom.title"
            @keyup.enter.native="toggleEdit"
            class="mx-0"
          > <v-icon slot="append" class="closeEdit" @click="toggleEdit"> fas fa-times </v-icon> </v-text-field>
        </v-col>
      </v-row>
    </v-toolbar>
    <!-- Chat Conversation -->
    <v-card class="convoContainer">
      <v-row justify="start" v-for="message in messages" :key="message[i]" class=" px-1 ma-0">
        <!-- messages from currentUser -->
        <v-col v-if="message.from === uid"  class="pa-0" align="end">
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
              <div v-for="(member, property) in chatroom.users" :key="property">
              <v-avatar v-if="member.id === message.from " size="55" class="mr-2" > -->
                <v-img   :src="member.avatar"></v-img>
              </v-avatar>
              </div>
            </v-col>
            <v-col>
              <span class="label"> {{ message.username }}</span>  <span class="messageTime"> {{ message.at }}</span>
              <br/>
              <h3 class="buyerMessage">
                {{ message.text }}
              </h3>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <v-row>
      <v-col class="pb-0">
        <!-- New message input box -->
        <v-form @submit="sendMessage">
        <v-textarea
          hide-details
          v-model='message'
          no-resize
          height="100"
          filled
          class="messageInput pb-0"
          name="input-7-4"
          placeholder="Write a reply..."
        >
        <v-icon @click="sendMessage" class="sendBtn" slot="append"> fas fa-paper-plane</v-icon>
        </v-textarea>
        </v-form>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { db } from '../../plugins/firebase'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)

export default {
  name:'Chat Convo',
  props:['chatroom'],

  data: () => ({
    editTitle: false,
    message: '',
    messages: [],
    users: [],
  }),
  mounted() {
    this.uid = this.$user.uid
    this.chatroom.users.forEach(async (user) => {
      const ref = await db.collection('users').doc(user).get()
      this.users.push(ref.data())
    })
    const messages = db.collection('chats').doc(this.chatroom.id).collection('messages')
    messages.onSnapshot(async (snapshot) => {
      this.messages = []
      let temp = []
      snapshot.forEach((message) => {
        const data = message.data()
        const tz = this.$store.state.auth.tz
        const unixAt = data.at
        const _at = dayjs.unix(unixAt).format()
        const at = dayjs(_at).tz(tz).format('hh:mm')
        const msg = {
          from: data.from,
          username: data.username,
          at: at,
          unixAt: unixAt,
          text: data.text,
          room: this.chatroom.id,
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
    async sendMessage() {
      await db.collection('chats')
        .doc(this.chatroom.id)
        .collection('messages')
        .add({
          from: this.$user.uid,
          username: this.$user.displayName,
          at: dayjs().unix(),
          text: `${this.message}`,
          room: this.chatroom.id
        })
        .catch(err => {
          console.error(`Error sending that message: ${err}`)
        })
        this.message = ''
    },
    backToRooms() {
      this.$emit('back-to-rooms');
    },
    toggleEdit() {
      this.editTitle = !this.editTitle;
    },
  },
};
</script>

<style scoped>
.pencil{
  cursor: pointer;
}
h4 {
  font: normal 500 10px Poppins;
  text-align: center;
}
.edit{
  font:normal normal 12px poppins;
  cursor: pointer;
}
.icon{
  width:50px;
  height:50px;
}
.convoContainer {
  height: 432px;
  width:400px;
  overflow-y: auto;
  overflow-x:hide;
}
.convoDetails {
  text-align: right;
  font: normal 300 12px Poppins;
}
.label {
  font: normal 600 16px Poppins;
  text-decoration: underline;
  text-decoration-color: #D4145A ;
}
.messageTime {
  font-size: 12px;
}
.convoTitle {
  vertical-align: middle;
  font: normal 500 20px Poppins;
  vertical-align: center;
  cursor: pointer;
  line-height: 120%;
  display:inline-block;
  max-width:19.625vw;
  padding-right:.5vw;
}
.titleDiv{
  display: inline-block;
  height:100%;
  align-content:flex-end;
}
.username {
  font-weight: 700;
}
.buyerMessage {
  display: inline-block;
  font: normal 500 13px Poppins;
}
.closeEdit{
  color:#D4145A;
  cursor: pointer;
}
.userMessage{
 font: normal 600 16px Poppins;

}
.messageInput {
  width: 375px;
}
.sendBtn {
  padding-top: 50px;
  padding-right: 5px;
}
.sendBtn:hover{
  color:#D4145A;
}
</style>
