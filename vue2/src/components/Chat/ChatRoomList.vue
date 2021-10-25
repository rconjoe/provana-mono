<template>
  <v-card max-width="450" class="mx-auto">
    <!-- Toolbar with Title and searchbar -->
    <v-toolbar class="toolbar" color="#111111" dark>
      <v-toolbar-title>Messages</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <!-- List of chat rooms -->
    <v-list three-line>
      <template v-for="(room, index) in rooms">
        <v-list-item @click="roomSelected(room)" :key="room.id">
          <v-row>
            <!-- Avatar / store order number column -->
            <v-col cols="2" class="pa-1 pt-3" align="center">
              <div v-for="(user, index,i) in room.users" :key="user.id">
                <v-avatar v-if="i == 1" size="55">
                  <v-img :src="user.avatar"></v-img>
                </v-avatar>
              </div>
            </v-col>

            <!-- Username and previous message column -->
            <v-col cols="8">
              <v-list-item-content class="pt-0`">
                <v-list-item-title class="username"> {{ room.title }} </v-list-item-title>
              </v-list-item-content>
            </v-col>
            <!-- date and time column -->
            <v-col cols="2" align="end" class="pl-0">
            </v-col>
          </v-row>
        </v-list-item>
        <v-divider :key="index"> </v-divider>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import { db } from '../../plugins/firebase';

export default {
  name:'ChatroomList',
  data: () => ({
    uid: '',
    rooms: [],
    messages: [],
    newMessages: null,
  }),

  async mounted() {
    db.collection('chats').where('users', 'array-contains', this.$user.uid)
    .onSnapshot((querySnapshot) => {
      this.rooms = [],
      querySnapshot.forEach((doc) => {
        const room = {
          ...doc.data(),
          roomId:doc.id
        }
        this.rooms.push(room)
      })
    })
  },

  methods: {
    roomSelected(room) {
      this.$emit('room-selected', room);
    },
  },
};
</script>

<style scoped>
h4 {
  font: normal 500 12px Poppins;
}

.username {
  font: normal 700 16px Poppins;
}
</style>
