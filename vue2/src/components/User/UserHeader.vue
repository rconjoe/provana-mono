<template>
  <v-row>
    <v-col col="6" class="userCol d-flex flex-row-reverse">
      <div class="headerDiv">
        <h2 class="userText"> {{ profile.username }}</h2>
        <span class="userTitle"> {{ profile.tagline }} </span>
        <div :class="alphaHover ? 'alphaBadgeDivHover' : 'alphaBadgeDiv'">
          <div class="alphaHoverDiv" @mouseover="alphaHover = true" @mouseleave="alphaHover = false">
            <img class="provanaAlpha" src="../../assets/ProvanaAlphaBadge-02.png" />
          </div>
          <v-fade-transition>
            <span v-if="alphaHover" class="alphaPartner"> Alpha Partner</span>
          </v-fade-transition>
        </div>
        <br />
        <!-- review row -->
        <span class="buyerReviews">Buyer Reviews:</span>
        <span class="rating"> {{ user.rating }}</span>
        <v-icon size="1vw" class="star"> fas fa-star </v-icon>
        <a href="#reviews"> <span class="ratingLink"> Reviews </span> </a>
        <!-- Who am I? header with social media icons floated right -->
        <v-col lg="12" class="pl-0 bioHeaderContainer">
          <div class="socialBtnWrapper d-flex">
            <h1 class="bioTitle">Who am I?</h1>
            <!-- social icons displayed inline-block to float next to previous h1 -->
            <div>
              <a :href="`https://twitter.com/${profile.twitter}`" target="_blank" v-if="profile.twitter">
                <v-icon color="#1DA1F2" class="socialIcon" size="1.5vw" :href="user.socials.TW"> fab fa-twitter</v-icon>
              </a>
              <a :href="`https://facebook.com/${profile.facebook}`" target="_blank" v-if="profile.facebook">
                <v-icon color="#4267B2" class="socialIcon" size="1.5vw"> fab fa-facebook</v-icon>
              </a>
              <a :href="`https://youtube.com/${profile.youtube}`" target="_blank" v-if="profile.youtube">
                <v-icon color="#FF0000" class="socialIcon" size="1.5vw"> fab fa-youtube</v-icon>
              </a>
              <a :href="`https://twitch.tv/${profile.twitch}`" target="_blank" v-if="profile.twitch">
                <v-icon color="#6441A4" class="socialIcon" size="1.5vw"> fab fa-twitch</v-icon>
              </a>
            </div>
          </div>
          <!-- Bio row -->
          <p class="bio"> {{ profile.bio }}</p>
        </v-col>
        <br />
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props:['profile'],
  data: () => ({
    bioTab: '1',
    alphaHover: false,
    user: {
      username: 'MR@NDERSON',
      userTitle: 'Twitch Streamer and Artist',
      bio:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse culpa qui officia deserunt mollit anim id est laborum.',
      rating: 4.9,
      alpha: true,
      socials: {
        IG: 'https://www.instagram.com/',
        TW: 'https://www.twitch.tv/',
        YT: 'https://www.youtube.com/',
        FB: 'https://www.facebook.com/',
      },
    },
  }),
};
</script>

<style scoped>
/* Header styles */
a {
  text-decoration: none;
}
a:hover {
  color: white !important;
}
.userText {
  font: normal 750 3.6458vw Poppins;
}
.userTitle {
  color: #b5b0b0;
  font: normal 600 1.3021vw Arboria;
  padding-right: 0.521vw;
  padding-bottom: 0.84vw;
  display: inline-block;
}
.userCol {
  padding-left: 1.0417vw;
  padding-right: 1.80625vw;
}
.socialIcon:hover {
  transform: scale(1.4);
}
.socialIcon {
  padding-right: 0.260417vw;
  transition: transform 0.3s ease;
}
.rating {
  font: normal 800 1.0417vw Poppins;
  padding-right: 0.3vw !important;
}
.bioLink {
  font: normal 500 1.0417vw Poppins;
}
.headerDiv {
  max-width: 28.645833333333332vw;
  min-width:28.645833333333332vw;
}
a {
  text-decoration: none;
}
.provanaAlpha {
  padding-bottom: 0.2605vw;
  width: auto;
  margin-right: 0.521vw;
  margin-left: 0.15625vw;
  height: 1.3021vw;
  vertical-align: middle;
  transition-duration: 0.3s;
}
.v-tab {
  text-transform: none !important;
}
.alphaHoverDiv {
  display: inline-block;
}
.provanaAlpha:hover {
  transform: scale(2);
}
.alphaBadgeDiv {
  width: auto;
  background-color: transparent;
  display: inline-block;
  transition: width 1s ease;
  border-radius: 5px;
  height: 1.3020833333333333vw;
}
.alphaBadgeDivHover {
  display: inline-block;
  width: auto;
  transition: width 1s ease;

  background-color: white;
  border-radius: 5px;
  padding-right: 0.10416666666666667vw;
  height: 1.3020833333333333vw;
}
.alphaPartner {
  font: normal bold 1.0417vw/1.0417vw Poppins;
  color: #d4145a;
  letter-spacing: -0.052083333333333336vw;
}
.avatarBorder {
  border: 4px solid #d51458;
}
.buyerReviews {
  font: normal 600 1.0416666666666667vw Arboria;
  color: #717171;
}
.star {
  padding-right: 0.52084vw;
  margin-bottom: 0.26vw;
  min-height: 0.521vw;
}
.rating {
  color: white;
  font: normal 800 1.0417vw Poppins;
  padding-left: 0.2604166666666667vw;
  padding-right: 0.5208333333333334vw;
}
.ratingLink {
  font: normal bold 1.0417vw Poppins;
  color: #fa4b6b;
}
.ratingLink:hover {
  color: white;
}
.bio {
  font: normal normal 0.78vw Poppins;
  color: #969696;
  padding-top:.3541666666666667vw;
}
.bioTitle {
  font: normal 600 1.823vw Poppins;
  display: inline-block;
  margin-right:2vw;
}
.bioHeaderContainer {
  padding-top: 1.5625vw;
}
.socialBtnWrapper {
  display: inline-block;
}
.v-tabs-items {
  background-color: transparent !important;
}
.socialBtn {
  height: 1.302vw;
  width: 1.302vw;
  margin-left: 0.417vw;
}
</style>
