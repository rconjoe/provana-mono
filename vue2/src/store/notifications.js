import { store } from '.'
import { db } from '../plugins/firebase'
import * as dayjs from 'dayjs'


export const notifications = {

  namespaced: true,

  state: () => ({
    notifications: [],
    disputes: []
  }),

  mutations: {
    SET_NOTIF(state, data) {
      state.notifications.push(data)
    },
    SET_DISPUTE(state, data) {
      state.disputes.push(data)
    },
    RESET_NOTIF(state) {
      state.notifications = []
      state.disputes = []
    }
  },

  actions: {
    bindNotifs({ commit, dispatch }) {
      db.collection('users')
        .doc(store.state.auth.currentUser.uid)
        .collection('notifications')
        .orderBy('time')
      .onSnapshot((snapshot) => {
        commit('RESET_NOTIF')
        snapshot.forEach((notif) => {
          const data = notif.data()
          dispatch('formatter', data)
        })
      })
    },

    formatter({commit}, rawNotif) {

      switch(rawNotif.category) {

        case 'disputed-sale':
          commit('SET_DISPUTE', rawNotif)
          return

        default:
          commit('SET_NOTIF', rawNotif)
          return
      }

    },

  }
}