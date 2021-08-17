<template>
  <v-card min-height="13.5vw" color="transparent">
    <v-row class="weekdaysContainer mx-auto">
      <!-- day 1 -->
      <v-col class="weekdays px-0" v-for="(day, index) in weekDays" :key="index">
        <v-row>
          <v-col>
            <h3 v-if="index === 0" class="dateHeader"> Today</h3>
            <h3 v-if="index === 1" class="dateHeader">{{ date2 }}</h3>
            <h3 v-if="index === 2" class="dateHeader">{{ date3 }}</h3>
            <h3 v-if="index === 3" class="dateHeader">{{ date4 }}</h3>
            <h3 v-if="index === 4" class="dateHeader">{{ date5 }}</h3>
            <h3 v-if="index === 5" class="dateHeader">{{ date6 }}</h3>
          </v-col>
        </v-row>

        <div id="openingBtns" v-for="(session,index) in day" :key="index">
          <v-btn class="openingBtn" @click="showDialog(session)"> {{ session.startTime }} </v-btn>
        </div>
      </v-col>
      <v-dialog v-if="selectedSession" v-model="serviceDialog" width="26.042vw">
        <v-card>
          <v-card-title class="headline primary ">
            {{ selectedSession.serviceName }} @ {{selectedSession.startTime}}
          </v-card-title>

          <v-card-text class="pt-3">
            {{ selectedSession.sessionDate }}
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="serviceDialog = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props:['weekDays'],
  data: () => ({
    serviceDialog: false,
    selectedSession:'',
    
  }),

  methods:{
    showDialog(e){
      this.selectedSession = e;
      this.serviceDialog = true;
    },
  },
  computed: {
    date2: () => {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var today = new Date();
        today.setDate(today.getDate() +1);
        var month = months[today.getMonth()];
        var day = today.getDate();
        return month + ' ' + day;
    },
    date3: () => {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var today = new Date();
        today.setDate(today.getDate() + 2);
        var month = months[today.getMonth()];
        var day = today.getDate();
        return month + ' ' + day;
    },
    date4: () => {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var today = new Date();
        today.setDate(today.getDate() + 3);
        var month = months[today.getMonth()];
        var day = today.getDate();
        return month + ' ' + day;
    },
    date5: () => {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var today = new Date();
        today.setDate(today.getDate() + 4);
        var month = months[today.getMonth()];
        var day = today.getDate();
        return month + ' ' + day;
    },
    date6: () => {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var today = new Date();
        today.setDate(today.getDate() + 5);
        var month = months[today.getMonth()];
        var day = today.getDate();
        return month + ' ' + day;
    },
  },
};
</script>

<style scoped>
#openingBtns {
  text-align: center;
}
#openingBtns .v-btn:hover {
  background-color: #fb4b6a;
  opacity: 1;
  border-radius: 0;
}

#openingBtns .v-btn {
  min-width: 3.32vw;
  height:1.7vw;
  margin-top: 0.417vw;
  background-color: #d51458;
  font: normal 400 0.78125vw Arboria;
  padding: 2px;
}
.openingBtn{
width: 4vw;
}

.weekdaysContainer {
  width: 31.25vw;
  overflow-y: auto;
  overflow-x: hidden;
}
.weekdays {
  max-width:5vw;
  height: 13.5vw;
  border-right: 1px solid #333333;
}
.weekdays:nth-child(6) {
  border-right: none;
}

.weekdays h3 {
font: normal 200 1.0417vw Arboria;
}
.weekdays:first-child h3 {
  font: normal 600 1.0417vw Arboria;
}
.dateHeader {
  text-align: center;
}
</style>
