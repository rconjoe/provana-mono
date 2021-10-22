import { store } from '.'
import { db } from '../plugins/firebase'
import * as dayjs from 'dayjs'


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
          const data = doc.data();
          console.log(data)
          const notif = {
            accType: data.accType,
            category: data.category,
            content: data.content,
            time: dayjs(data.time).format('hh:mm MM-DD-YY'),
            uid: data.uid,
            unread: data.unread
          }
          commit('SET_NOTIF', notif);
        })
      })
    }
  }
}