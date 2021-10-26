<template>
	<v-toolbar color="#111111" dark>
		<v-row align="center">
			<v-col class="px-0 mt-2">
				<div v-if="editTitle === false">
					<!-- Back Button -->
					<v-btn @click="backToRooms" x-small color="transparent" fab class="pa-0 mb-1">
						<v-icon class="pa-0" size="1.3vw" color="primary"> fas fa-chevron-left </v-icon>
					</v-btn>
					<!-- Username -->
					<span class="pl-2 convoTitle text-truncate"
							>{{ title }}
						</span>
					<div class="titleDiv" @click="toggleEdit" v-if="creator">
						
						<v-icon small color="primary" class="ml-0 pencil">
							fas fa-pencil-alt
						</v-icon>
						<span class="edit"> edit</span>
					</div>
				</div>
				<v-text-field
					hint=" Enter to submit or X to cancel"
					persistent-hint
					append-icon="fas fa-times"
					color="#ffffff"
					dark
					v-else
					solo
					dense
                    :placeholder="title"
					v-model="newTitle"
					@keyup.enter.native="changeTitle(newTitle)"
					class="mx-0"
				>
					<v-icon slot="append" class="closeEdit" @click="toggleEdit"> fas fa-times </v-icon>
				</v-text-field>
			</v-col>
		</v-row>
	</v-toolbar>
</template>

<script>
	export default {
		props: ['title','editTitle','creator'],
        data: () => ({
            newTitle:''
        }),
		methods: {
            toggleEdit(){
                this.$emit('toggle-edit')
            },
			changeTitle(t){
                this.$emit('change-title',t)
            },
            backToRooms() {
				this.$emit('back-to-rooms')
			},
		},
	}
</script>

<style scope>
	.closeEdit {
		color: #d4145a;
		cursor: pointer;
	}
	.edit {
		font: normal normal 12px poppins;
		cursor: pointer;
	}
	.titleDiv {
		display: inline-block;
		height: 100%;
		align-content: flex-end;
	}
	.convoTitle {
		vertical-align: middle;
		font: normal 500 20px Poppins;
		vertical-align: center;
		cursor: pointer;
		line-height: 120%;
		display: inline-block;
		max-width: 13.625vw;
		padding-right: 0.5vw;
	}
	.pencil {
		cursor: pointer;
	}
</style>
