<template>
	<div class="newServiceContainer" ref="formBox">
		<div class="d-flex justify-center my-auto fill-height" v-if="!showForm" @click="animateForm">
			<v-icon color="#ED2970" class="mr-1" size="14px"> fas fa-plus </v-icon>
			<h2 class="newServiceBtn"> New Service </h2>
		</div>
		<div v-else>
      <form ref="serviceForm">
        <div class="fieldsContainer">
          <h1> New Service </h1>
          <div class="field">
            <span class="titleLabel">
              <v-text-field v-model="newServiceName" :rules="nameRules"></v-text-field>
          </div>
        </div>

      </form>
       <v-btn @click="animateForm"> Cancel </v-btn> </div>
	</div>
</template>

<script>
import { gsap } from 'gsap'
export default {
	data: () => ({
		showForm: false,
	}),
	mounted() {
		this.formTween = gsap
			.timeline()
			.to(this.$refs.formBox, {
				height: '710px',
				duration: 0.3,
			})
			.pause(0)
	},
	methods: {
		animateForm() {
			if (this.showForm == false) {
				this.formTween.play()
				this.showForm = true
			} else {
				this.formTween.reverse()
				this.showForm = false
			}
		},
	},
}
</script>

<style scoped lang="scss">
.newServiceContainer {
	width: 350px;
	height: 175px;
	background-color: #222222;
}
.newServiceBtn {
	cursor: pointer;
	align-self: center;
	font: normal 600 20px Poppins;
	letter-spacing: -1px;
	color: #ed2970;
}
</style>
