<template>
<div>
    <router-link to="/login" > Login</router-link>
    <span class="slash mx-2"> / </span>
    <router-link to="/register" > Register</router-link>
</div>

</template>

<script>
export default {
    name: "LoginBtn",
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
