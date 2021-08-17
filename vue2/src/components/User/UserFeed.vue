<template>
<v-row class="feedRow my-0">
   <!-- Seller title  and "follow" are inline spans -->
    <v-col cols="12" class=" pt-2  pb-0 feedHeader d-flex justify-space-between" >
      <span class="sellerFeed "> Seller Feed</span>
      <span class="follow secondary--text"> Follow </span>
    </v-col>
    <!-- scrollable window that contains posts -->
    <v-col class="sellerFeedWindow pt-0 ">
      <!-- actual posts will be iterated card elements -->
      <div v-if="posts.length > 0">
      <v-card v-for="post in posts" :key="post.message" color="#333333" rounded="lg" class="mb-8">
        <p class="pa-8 post">
          {{post.message}}
        </p>
      </v-card>
      </div>
      <div v-else>
        <p class="noFeed"> this user has not submited their first post. </p>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { db } from '../../plugins/firebase';

export default {
  data: () => ({
    posts:[]
  }),

  async mounted() {
    console.log(this.$store.state.viewing.viewingUID)
    db.collection('sellers').doc(this.$store.state.viewing.viewingUID).collection('posts')
    .onSnapshot((querySnapshot) => {
      this.posts = [];
      querySnapshot.forEach((doc) => {
        this.posts.push(doc.data())
      })
    })
  },

  methods:{
  }
}
</script>

<style scoped>
/* seller feed */

.post{
  font:normal normal .85vw Arboria;
}

.feedRow{
  max-width: 28.645833333333332vw;
  margin-right:3.90625vw;
  padding-left:0.625vw;
}
.noFeed{
  vertical-align: top;
}
.sellerFeed {
  font: normal 700 2.604vw/2.604vw Poppins;
  line-height: 2.604vw;
  align-self: flex-start;
  color:#333;
  padding-top:.2vw;
}
.follow {
  margin-top: .8vw;
  font: normal bold 1.5625vw Poppins;
  align-self: flex-start;
}
.sellerFeedWindow {
  max-height: 26.041vw;
  overflow: auto;
  margin-top:-4vw;
}
.sellerFeedWindow:hover {
  overflow-y: scroll;
}

.sellerFeedWindow::-webkit-scrollbar {
  width: 0.52vw;
  padding-left: 1.0417vw;
}

.sellerFeedWindow::-webkit-scrollbar-track {
  background: #111111;
}

.sellerFeedWindow::-webkit-scrollbar-thumb {
  background: #333333;
  border-radius: 7px;
}
</style>
