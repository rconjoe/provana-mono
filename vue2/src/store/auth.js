import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { store } from './index'
import { db } from '../plugins/firebase'
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
    async bindProfile({ commit }, uid) {
      if (!store.state.auth.claims.type) return
      db
        .collection(store.state.auth.claims.type)
        .doc(uid)
        .onSnapshot((snap) => {
          commit('SET_USER', snap.data())
        })
    },
    async setTimezone({ commit }) {
      if (!store.state.currentUser) {
        const guess = dayjs.tz.guess()
        commit('SET_TIMEZONE', guess)
      }
      else {
        const tz = store.state.currentUser.timezone
        if (!tz || tz === '') {
          const guess = dayjs.tz.guess()
          dayjs.tz.setDefault(guess)
          commit('SET_TIMEZONE', guess)
          await db.collection(store.state.auth.claims.type).doc(store.state.auth.currentUser.uid)
            .set({ timezone: guess }, { merge: true })
        }
        else {
          dayjs.tz.setDefault(tz)
          commit('SET_TIMEZONE', tz)
        }
      }
    }
  }
}
