<template>
  <div>
    <v-overlay
      :value='show'
      > </v-overlay>
        <div class='bar'>
          <v-progress-linear
            :value='show'
            indeterminate
            absolute
            > </v-progress-linear>
        </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingOverlay',
  data: () => ({
    show: true
  })
}
</script>

<style>
.bar {
  position: center center;
}
</style>