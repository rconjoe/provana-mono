<template>
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
        <v-icon @click="sendMessage(message)" class="sendBtn" slot="append" :disabled="message == '' "> fas fa-paper-plane</v-icon>
        </v-textarea>
        </v-form>
</template>

<script>
export default {
    data: () => ({
        message:''

    }),
    methods:{
        sendMessage(m){
            this.$emit('send-message',m)
            console.log(m)
        }
    }
}
</script>

<style scoped>
.sendBtn {
  margin-top: 50px;
  margin-right: 5px;
}
.sendBtn:hover{
  color:#D4145A;
  cursor: pointer;
}
</style>