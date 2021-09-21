import { store } from '.'
import { db } from '../plugins/firebase'
import * as dayjs from 'dayjs'


export const notifications = {

  namespaced: true,

  state: () => ({
    notifications: [],
      online: false,
  }),

  mutations: {
    SET_NOTIF(state, data) {
      state.notifications.push(data);
    },
    CLEAR_NOTIF(state, data) {
      state.notifications = []
    }
  },

  actions: {
     bindNotifs({commit, dispatch}) {
      db.collection('notifications')
        .doc(store.state.auth.claims.user_id)
        .collection('notif')
      .onSnapshot((snapshot) => {
        commit('CLEAR_NOTIF')
        
        snapshot.forEach((doc) => {
          commit('SET_NOTIF', doc.data());
        })
      })
    }
  }
}