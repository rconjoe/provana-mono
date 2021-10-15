<template>
<div>
  <h1> {{viewDate}} </h1>
  <v-btn v-for="(session,i) in sessionTimes" :key="i" @click="showSlots(session)">  {{btnTime(session.start)}}</v-btn>
</div>
</template>

<script>
import isBetween from 'dayjs/plugin/isBetween'
import { formatter } from '../../../plugins/sessionFormatter'
import dayjs from 'dayjs'
import { db } from '@/plugins/firebase'
dayjs.extend(isBetween)

export default {
    
    props:['date','service'],
    data: () => ({
        viewDate:'',
        queryDate:'',
        sessionTimes:[]
    }),
    mounted(){
        this.viewDate = dayjs(this.date).format('M/D')
        this.queryDate = dayjs(this.date).unix()

        db.collection('sessions')
				.where('serviceDocId', '==', this.service.id)
				.where('status', '==', 'published')
				.onSnapshot((querySnapshot) => {
					this.sessions = []
					querySnapshot.forEach((doc) => {
						const data = doc.data()
						const session = formatter(data)
                        const today = dayjs(session.start).isBetween(this.date, dayjs(this.date).add(1, 'day'))
                        if(today){
						this.sessionTimes.push(session)
                        }
                        else{}
					})
				})
        
    },
    methods:{
        showSlots(e){
            this.$emit('show-slots',e)
        },
        btnTime(e){
            return dayjs(e).format('h:mm')
        }
    },

}
</script>

<style>

</style>