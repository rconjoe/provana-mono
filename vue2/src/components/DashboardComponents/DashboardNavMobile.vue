<template>
<div class="mobiNav">
    <v-card>
        <v-item-group v-model='window' >
          <!-- Logic for Menu Selection -->
          <!-- For loop of btn items for each link -->
          <v-row align="center" justify="center" class="mt-0">
            <v-item class="mobiItem" v-for=" link in links" :key="link.icon" v-slot:default="{ active}" >
              <div class="mobiDiv">
                <v-btn class="px-2 mobiBtn" text block depressed :input-value="active" @click="$emit('update-window', link.value)">
                  <v-col>
                      <v-icon size="40">{{ link.icon }}</v-icon>
                  </v-col>
                </v-btn>
              </div>
            </v-item>
          </v-row>
        </v-item-group>
    </v-card>
</div>
</template>


<script>
export default {
  props:['links','window']
}
</script>

<style scoped>
.mobiNav{
  width:100%;
  height: auto;
}
.mobiItem{
  height:auto;
}

.mobiBtn{
  width:20vw;
  min-height:80px
}
</style>