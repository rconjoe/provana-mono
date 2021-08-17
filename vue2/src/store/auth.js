import { db } from '../plugins/firebase'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)

export const auth = {
    namespaced: true,

    state: () => ({
        currentUser: null,
        error: null,
        claims: null,
        tz: null
    }),

    mutations: {
        SET_USER(state, data) {
            state.currentUser = data;
        },
        SET_ERROR(state, data) {
            state.error = data;
        },
        SET_CLAIMS(state, data) {
            state.claims = data;
        },
        SET_TIMEZONE(state, data) {
            state.tz = data;
        }
    },

    actions: {
        async setTimezone({ commit }, uid) {
            const q = await db.collection('users').doc(uid).get()
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