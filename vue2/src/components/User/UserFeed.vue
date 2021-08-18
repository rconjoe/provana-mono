<template>
	<v-row class="feedRow my-0">
		<v-col>
			<!-- Seller title  and "follow" are inline spans -->
			<div class=" pt-2  pb-0 feedHeader d-flex justify-space-between">
				<span class="sellerFeed "> Seller Feed</span>
				<v-btn class="btnCTA" color="primary" @click="showPostOverlay = !showPostOverlay" v-if="isCurrentUser && !showPostOverlay"> write post </v-btn>
			</div>
			<!-- scrollable window that contains posts -->
			<div class="sellerFeedWindow pt-0 ">
				<!-- actual posts will be iterated card elements -->
				<div v-if="posts.length > 0">
					<v-card v-for="post in posts" :key="post.message" color="#333333" rounded="lg" class="mb-8">
						<p class="pa-8 post">
							{{ post.message }}
						</p>
					</v-card>
				</div>
				<div v-else>
					<p class="noFeed"> this user has not submited their first post. </p>
				</div>

				<v-overlay opacity="1" class="postOverlay" v-model="showPostOverlay" absolute>
          <p class="post"> Title: </p>
          <v-text-field full-width filled> </v-text-field>
          <p class="post"> Body: </p>
					<v-textarea full-width filled> </v-textarea>
          <div class="d-flex justify-space-between">
            <v-btn class="btnCTA" color="#333333" @click="showPostOverlay = false"> Cancel </v-btn>
            <v-btn class="btnCTA" color="primary"> Submit </v-btn>
          </div>
				</v-overlay>
			</div>
		</v-col>
	</v-row>
</template>

<script>
	import { db } from '../../plugins/firebase'

	export default {
		data: () => ({
			posts: [],
			showPostOverlay: false,
		}),

		async mounted() {
			console.log(this.$store.state.viewing.viewingUID)
			db.collection('sellers')
				.doc(this.$store.state.viewing.viewingUID)
				.collection('posts')
				.onSnapshot((querySnapshot) => {
					this.posts = []
					querySnapshot.forEach((doc) => {
						this.posts.push(doc.data())
					})
				})
		},

		computed:{
      isCurrentUser(){
        return this.$store.state.viewing.viewingUID === this.$user.uid
      }
    }
	}
</script>

<style scoped>
	/* seller feed */
  >>>.v-overlay{
    padding-top:2vw;
    align-items: flex-start;
  }
  >>>.v-overlay__content{
    width:90%
  }
	.post {
		font: normal normal 0.85vw Arboria;
	}
  .postOverlay{
    width: 100%;
  }
	.feedRow {
		max-width: 28.645833333333332vw;
		margin-right: 3.90625vw;
		padding-left: 0.625vw;
	}
	.noFeed {
		vertical-align: top;
	}
	.sellerFeed {
		font: normal 700 2.604vw/2.604vw Poppins;
		line-height: 2.604vw;
		align-self: flex-start;
		color: #333;
		padding-top: 0.2vw;
	}
	.follow {
		margin-top: 0.8vw;
		font: normal bold 1.5625vw Poppins;
		align-self: flex-start;
	}
	.sellerFeedWindow {
		max-height: 26.041vw;
    min-height: 26.041vw;
		margin-top: 2vw;
    position: relative;
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