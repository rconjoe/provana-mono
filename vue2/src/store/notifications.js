import { store } from '.'
import { db } from '../plugins/firebase'
import { formatter } from '../plugins/sessionFormatter'


export const notifications = {

  namespaced: true,

  state: () => ({
    notifications: [],
    disputes:[],
    online: false,
  }),

  mutations: {
    SET_NOTIF(state, data) {
      state.notifications.push(data);
    },
    CLEAR_NOTIF(state) {
      state.notifications = []
    },
    SET_DISPUTE(state, data) {
      state.notifications.push(data)
    },
    CLEAR_DISPUTE(state) {
      state.disputes = []
    }
  },

  actions: {
     bindNotifs({commit}) {
      db.collection('notifications')
        .doc(store.state.auth.claims.user_id)
        .collection('notif')
      .onSnapshot((snapshot) => {
        commit('CLEAR_NOTIF')
        commit('CLEAR_DISPUTE')
        snapshot.forEach((doc) => {
          const data = doc.data();
          const notif = {
            category: data.category,
            content: data.content,
            time: formatter(data.time),
            uid: data.uid,
            unread: data.unread,
            id: doc.id
          }
          if (notif.category === 'dispute') {
            commit('SET_DISPUTE', notif)
          }
          else {
            commit('SET_NOTIF', notif);
          }
        })
      })
    }
  }
}
