
import { db } from '../plugins/firebase'
import { store } from './index'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)

export const tz = {
    namespaced: true,

    state: () => ({
        tz: null
    }),

    mutations: {
        SET_TIMEZONE(state, data) {
            state.tz = data;
        }
    },

    actions: {
        async setTimezone({ commit }) {
            const q = await db.collection(store.state.auth.claims.type).doc(store.state.auth.currentUser.uid).get()
            if (!q.exists) {
                console.error(`${uid} not found in db, cannot set timezone. Defaulting...`)
                const guess = dayjs.tz.guess()
                commit('SET_TIMEZONE', guess)
            }
            else {
                const data = q.data()
                const tz = data.timezone
                if (!tz || tz === '') {
                    const guess = dayjs.tz.guess()
                    dayjs.tz.setDefault(guess)
                    commit('SET_TIMEZONE', guess)
                    await q.ref.set({ timezone: guess }, { merge: true })
                }
                else {
                    dayjs.tz.setDefault(tz)
                    commit('SET_TIMEZONE', tz)
                }
            }
        }
    }
}