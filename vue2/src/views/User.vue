<template>
  <!-- Container -->
  <v-row class="containerRow">
    <v-col>
      <!-- Banner Row -->
      <v-row class="userBanner" align="end" :style="cssVars">
        <v-col class="avatarCol">
          <v-avatar class="avatarBorder" size="7.771vw">
            <v-img :src="profile.avatar" v-if="profile.avatar"> </v-img>
          </v-avatar>
        </v-col>
      </v-row>
      <!-- Seller info container 8 cols-->
      <!-- UserName Header row-->
      <v-row class=" userRow pl-6  pt-6 pb-0">
        <v-col lg="6">
          <UserHeader :profile="profile" />
        </v-col>
        <!-- Services Column -->
        <v-col v-if="services" lg="6" class=" servicesCol pr-0  ">
          <transition name="slide" mode="out-in">
            <div v-if="servicesVisible" key="services">
              <UserService
                @service-clicked="serviceClicked"
                v-for="service in this.services"
                :key="service.title"
                :service="service"
              />
            </div>
            <div v-else key="selectedService">
              <UserServiceSelected @show-services="showServices" :service="selectedService" :profile="profile" />
            </div>
          </transition>
        </v-col>
        <v-col v-else cols="6" class="servicesCol pr-0 ">
          <p> This User is currently not offering any services.</p>
        </v-col>
      </v-row>

      <!-- Review and Seller feed row -->
      <v-row class="pa-3 sellerRow">
        <v-col cols="6" class="d-flex flex-row-reverse reviewsCol">
          <!-- Seller Feed column -->
          <UserFeed :uid="profile.uid" />
        </v-col>
        <v-col cols="6" class="reviewsCol" id="reviews">
          <!-- Recent Reviews Column-->
          <UserReviews :uid="profile.uid" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import UserHeader from '@/components/User/UserHeader.vue';
import UserService from '@/components/User/UserService.vue';
import UserFeed from '@/components/User/UserFeed.vue';
import UserReviews from '@/components/User/UserReviews.vue';
import UserServiceSelected from '@/components/User/UserServiceSelected.vue';
import { db, storage } from '../plugins/firebase'
export default {
  name: 'User',
  components: {
    UserHeader,
    UserService,
    UserFeed,
    UserReviews,
    UserServiceSelected,
  },
  data: () => ({
    avatarUrl: null,
    servicesVisible: true,
    selectedService: '',
    services: [],
    loading: false,
    postData: '',
    profile: {},
    userPostArray: [],
    serviceArray: null,
    sessions: null,
    uid: ""
  }),
  computed: {
    cssVars() {
      return {
        '--bannerUrl': 'url(' + this.profile.banner + ')',
      };
    },
  },
  async mounted() {
    const q = await db.collection('creators')
      .where('username', '==', this.$attrs.username)
      .get()
    this.profile = q.docs[0].data()
    db
      .collection('services')
      .where('uid', '==', this.profile.uid)
      .onSnapshot((snap) => {
        snap.forEach(doc => this.services.push(doc.data()))
      })
  },

  methods: {
    showServices() {
      this.servicesVisible = true;
    },
    serviceClicked(service) {
      this.servicesVisible = false;
      this.selectedService = service;
    },
  },

};
</script>

<style scoped>
.avatarCol {
  position: relative;
}
.avatarBorder {
  border: 3px solid #fa4b6b;
  background-color: #1e1e1ece;
  position: absolute;
  left: 19.7vw;
  top: -7vw;
}
.containerRow {
  background-image: url('../assets/_DashboardBG1.png');
  background-size: contain;
  background-color: #121212;
}
.userRow{
  background-image:linear-gradient(to bottom,#111111 0%,#1e1e1ecc 10%,#1e1e1e00 30%);
}
.userBanner {
  background-image: linear-gradient(to bottom,#1e1e1ea3 2.71%,#1e1e1e69 26.76%,#1e1e1e00 53.59%),linear-gradient(to top,#111111 2.71%,#1e1e1ecc 26.76%,#1e1e1e00 53.59%),var(--bannerUrl);
  background-size: cover;
  height: 18.75vw;
  background-position: top;
  background-repeat: no-repeat;
  background-color: #2d2d2d;
}
.servicesCol {
  padding-right: 1.042vw;
  padding-left: 1.80625vw;
}
.sellerRow {
  margin-top: 10.520833333333334vw;
}
.feedCol {
  max-width: 28.645833333333332vw;
}
.reviewsCol {
  padding-top: 100px;
}
.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter, .slide-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

/* Review Styles */
</style>