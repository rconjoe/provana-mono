<template>
  <v-navigation-drawer
        v-if="!$vuetify.breakpoint.mobile"
        v-model="drawer"
        width="250px"
        permanent
        absolute
        expand-on-hover
        class="navDrawer"
        mini-variant-width="54"
      >  
        <v-list class="navList">
          <v-avatar class="avatarBorder ml-14" size="150"  >
            <v-img :src="avatar"> </v-img>
          </v-avatar>
          <!-- Menu -->
          <v-item-group v-model="window">
            <!-- Logic for Menu Selection -->
            <!-- For loop of btn items for each link -->
            <v-item
              v-for="link in links"
              :key="link.icon"
              v-slot:default="{ active}"
              class="pb-6 pt-4 "
            >
              <div>
                <v-btn activeClass="activeTab" class="dashBtn" text block  :input-value="active" @click="$emit('update-window', link.value)">
                      <v-icon>{{ link.icon }}</v-icon>
                    <span class="pl-4 linkText"> {{ link.text }} </span>
                </v-btn>
              </div>
            </v-item>
          </v-item-group>
        </v-list>
      </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
  }),
  props:['links','window','avatar']
}
</script>

<style scoped>
.avatarBorder{
  margin-top:80px;
  margin-bottom: 40px;
  border: 4px solid #FB4B6A;
}
.navDrawer{
background-color: #1c1c1cb2 ;
height:100%;}
.navList{
  height:100%;

}
.dashBtn.v-btn{
text-transform: none;
white-space: normal;
}
.dashBtn.v-btn span.v-btn__content{
padding-top:150px;
}
.linkText {
  font: normal 500 1vw Poppins;
}
.activeTab{
  background-color: #FA4B6B;
 color: #121212;
}
.v-btn::before{
  opacity: 0;
}



</style>