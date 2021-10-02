<template>
<div>
    <a @click="openLogin" > Login</a>
    <span class="slash mx-2"> / </span>
    <a @click="openLogin" > Register</a>
</div>

</template>

<script>
export default {
    name: "LoginBtn",
    methods:{
        openLogin(){
            this.$emit('open-login')
        }
    }
}
</script>
<style scoped>
a {
    text-decoration:none;
    font:normal bold 1.0417vw Arboria;
}
a:hover{
    color:white;
}
a.router-link-active  {
  color: white;
}
.slash{
    font:normal bold 1.0417vw Arboria;
    color:#717171;
}
</style>
