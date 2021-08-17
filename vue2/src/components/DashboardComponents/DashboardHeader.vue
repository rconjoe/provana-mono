<template>
<v-row class="pa-5 Header" >
    <v-col cols="12" >
        <h1 class="text-h1">
        <slot> DASHBOARD</slot>
        </h1>
    </v-col>
    <v-col class="pt-0 " cols="12">
        <span class="primary--text">Reset Password</span>
    </v-col>
    </v-row>
</template>

<script>
export default {};
</script>

<style scoped>
.Header{
   background-image: url('../../assets/DashboardBG.png');
	background-size: cover;
	background-color: black;
}
.text-h1 {
    font-weight: 1000 ;
    line-height: 3rem;
    font-family: Poppins !important;
    font-size: 3rem  !important;
}
.subText{
    font-family: Poppins !important;
   


}
</style>
