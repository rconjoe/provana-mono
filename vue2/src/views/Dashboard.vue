<template>
  <div>
    <!--Conatiner row. -->
    <v-row class="pa-0  dashRow">
      <!-- Dashboard nav drawer must sit outside of the column -->
      <div v-if="!$vuetify.breakpoint.mobile" cols="1" class="pa-0 navDrawerCol">
        <DashboardNavDrawer
          style="height:100%  "
          v-if="!$vuetify.breakpoint.mobile"
          :links=" !seller ? buyerLinks : !onboarded ? onboardLinks : sellerLinks"
          :window="window"
          @update-window="updateWindow"
          :avatar="profile.avatar"
        />
      </div>

      <!-- Column wraps all dashboard windows. -->
      <v-col class="pa-0 DashCol">
        <!-- Dashboard components are displayed using seperate window-items. We can't loop them because each window has different components. -->
        <v-window v-model="window" v-if="profile !== null" class="dashWindowWrapper">
          <!-- home window-->
          <v-window-item name="DashHomeWindow" class="dashWindow">
            <v-card color="transparent" name="DashHomeCard" dark flat class="dashCard">

              <dashboard-home v-if="!seller ? true : onboarded ? true : false" :profile="profile"></dashboard-home>
              <DashboardNotOnboarded v-else/>
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
          <!-- requests card
                    <v-window-item>
                    <v-card>
                        <v-card-text>
                            <v-list-item-avatar color="grey lighten-1">
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title> request card </v-list-item-title>
                                <v-list-item-text>
                                    This is a test card.
                                </v-list-item-text>
                            </v-list-item-content>
                        </v-card-text>
                    </v-card>
                    </v-window-item>
                    requests card -->
        </v-window>
      </v-col>
    </v-row>

    <ChatBox/>
  </div>
</template>

<script>
import { db } from '../plugins/firebase';
import ChatBox from '@/components/Chat/ChatBox.vue';
import DashboardHome from '@/components/DashboardComponents/DashboardHome.vue';
import DashboardAccount from '@/components/DashboardComponents/DashboardAccount.vue';
import DashboardService from '@/components/DashboardComponents/DashboardService.vue';
import DashboardPayments from '@/components/DashboardComponents/DashboardPayments.vue';
import DashboardContact from '@/components/DashboardComponents/DashboardContact.vue';
import DashboardNavDrawer from '@/components/DashboardComponents/DashboardNavDrawer.vue';
import DashboardNavMobile from '@/components/DashboardComponents/DashboardNavMobile.vue';
import DashboardNotOnboarded from '@/components/DashboardComponents/DashboardNotOnboarded.vue'

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
    DashboardNotOnboarded
  },

  data: () => ({
    profile: null,
    drawer: null,
    window: 0,
    seller:null,
    onboarded:true,
    id:null,
    buyerLinks: [
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
    sellerLinks: [
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
    onboardLinks:[
      {
        icon: 'fas fa-home',
        text: 'Dashboard',
        value: 0,
      }
    ]
  }),
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
  },
  mounted() {
    db.collection(this.$store.state.auth.claims.type).doc(this.$user.uid)
    .onSnapshot((profile) => {
      this.profile = profile.data()
    })
  },
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