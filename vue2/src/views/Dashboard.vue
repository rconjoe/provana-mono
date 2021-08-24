<template>
  <div>
    <v-row class="pa-0  dashRow">
      <!-- Dashboard nav drawer must sit outside of the column -->
      <!-- Creator and supporter links are set by checking claim then displaying a limited or full list of links -->
      <div v-if="!$vuetify.breakpoint.mobile" cols="1" class="pa-0 navDrawerCol">
        <DashboardNavDrawer
          style="height:100%  "
          :links="(claims.type === 'creators') ? creators : supporters"
          :window="window"
          @update-window="updateWindow"
          :avatar="profile.avatar"
        />
      </div>
      <!-- Onboard Overlay -->
      <Overlay :show="(this.profile.onboarded !== undefined && this.profile.onboarded === false)">
          <OnboardOverlay />
      </Overlay>

      <!-- Column wraps all dashboard windows. -->
      <v-col class="pa-0 DashCol">
        <!-- Dashboard components are displayed using seperate window-items. We can't loop them because each window has different components. -->
        <v-window v-model="window" v-if="profile !== null" class="dashWindowWrapper">
          <!-- home window-->
          <v-window-item name="DashHomeWindow" class="dashWindow">
            <v-card color="transparent" name="DashHomeCard" dark flat class="dashCard">
              <dashboard-home :profile="profile"></dashboard-home>
            </v-card>
          </v-window-item>
          <!-- account window -->
          <v-window-item name="DashAccountWindow">
            <v-card color="transparent" name="DashAccountCard" class="dashCard" min-height="910px" dark flat tile max-width="100%">
              <dashboard-account :profile="profile" @update-profile-account="updateProfileAccount"></dashboard-account>
            </v-card>
          </v-window-item>

          <!-- services window -->
          <v-window-item name="DashServiceWindow" id="services">
            <v-card class="dashCard" name="DashServiceCard" color="transparent" min-height="800px" dark flat tile max-width="100vw">
              <dashboard-service @update-service="updateService"></dashboard-service>
            </v-card>
          </v-window-item>

          <!-- payment window -->
          <v-window-item name="DashPaymentWindow">
            <v-card color="transparent" height="800px" name="DashPaymentCard" dark flat tile max-width="100vw">
              <dashboard-payments></dashboard-payments>
            </v-card>
          </v-window-item>

          <!-- contact window -->
          <v-window-item name="DashContactWindow">
            <v-card color="transparent" name="DashContactCard" class="dashCard" height="800px" dark flat tile max-width="100vw">
              <dashboard-contact @update-notifications="updateNotifications"></dashboard-contact>
            </v-card>
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>

    <ChatBox/>
  </div>
</template>

<script>
import { db } from '../plugins/firebase';
import { mapState } from 'vuex'
import ChatBox from '@/components/Chat/ChatBox.vue';
import DashboardHome from '@/components/DashboardComponents/DashboardHome.vue';
import DashboardAccount from '@/components/DashboardComponents/DashboardAccount.vue';
import DashboardService from '@/components/DashboardComponents/DashboardService.vue';
import DashboardPayments from '@/components/DashboardComponents/DashboardPayments.vue';
import DashboardContact from '@/components/DashboardComponents/DashboardContact.vue';
import DashboardNavDrawer from '@/components/DashboardComponents/DashboardNavDrawer.vue';
import DashboardNavMobile from '@/components/DashboardComponents/DashboardNavMobile.vue';
import OnboardOverlay from '@/components/DashboardComponents/OnboardOverlay.vue';
import Overlay from '@/components/ReusableComponents/Overlay.vue';

export default {
  name: 'Dashboard',

  components: {
    ChatBox,
    DashboardHome,
    DashboardAccount,
    DashboardService,
    DashboardPayments,
    DashboardContact,
    DashboardNavMobile,
    DashboardNavDrawer,
    OnboardOverlay,
    Overlay
  },

  data: () => ({
    profile: {},
    drawer: null,
    window: 0,
    onboarded:true,
    id:null,
    supporters: [
      {
        icon: 'fas fa-home',
        text: 'Dasard',
        value: 0,
      },
      {
        icon: 'fas fa-user',
        text: 'Account',
        value: 1,
      },
      {
        icon: 'fas fa-bell',
        text: 'Contact',
        value: 4,
      },
    ],
    creators: [
      {
        icon: 'fas fa-home',
        text: 'Dashboard',
        value: 0,
      },
      {
        icon: 'fas fa-user',
        text: 'Account',
        value: 1,
      },
      {
        icon: 'far fa-calendar-alt',
        text: 'Services',
        value: 2,
      },
      {
        icon: 'fas fa-credit-card',
        text: 'Payment',
        value: 3,
      },
      {
        icon: 'fas fa-bell',
        text: 'Contact',
        value: 4,
      },
    ],
  }),
  computed:{
    notOnboarded() {
      if( this.$store.state.auth.claims.type === 'creators' && this.profile.onboarded === false) {
        return true
      }
      else{
        return false
      }
    },
    ...mapState({
      claims: state => state.auth.claims
    })
  },
  mounted() {
    db.collection(this.$store.state.auth.claims.type).doc(this.$user.uid)
    .onSnapshot((profile) => {
      this.profile = profile.data()
    })
  },
  methods: {
    updateWindow(toggle) {
      console.log(toggle);
    },
    updateProfileAccount(newProfile) {
      console.log(newProfile);
    },
    updateService(data) {
      console.log(data);
    },
    updateNotifications(data) {
      console.log(data);
    },
    updateWindow(data) {
      this.window = data;
    },
  }
  
};
</script>

<style scoped>
.dashWindowWrapper{
  background-image: url('../assets/_DashboardBG1.png');
  background-size: contain;
  min-height: 50.78125vw;
  min-width: 1920;
}
.dashWindow{
  background-color: transparent;
}
.nowrap {
  white-space: nowrap;
}
.mobiNav {
  position: fixed;
  bottom: 10px;
  z-index: 3;
}
.navDrawerCol {
  width:56px
}
.dashCol {
  overflow-y: auto;
  min-height: 100vh;

}

.dashCard {
  color: white;
  background-color: transparent;
  min-height: 100vh;
}
.scroll {
  overflow: scroll;
}
</style>