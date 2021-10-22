import { db, functions } from '../plugins/firebase'
import { store } from '.'
import { formatter } from '../plugins/sessionFormatter'

export const dashboard = {
    namespaced: true,

    state: () => ({
      home: {
        purchased: [],
        sold: [],
        selected: {},
      }
    }),

    mutations: {
      SET_PURCHASED(state, data) {
        state.home.purchased = data
      },
      SET_SOLD(state, data) {
        state.home.sold = data
      },
      SET_SELECTED(state, data) {
        state.home.selected = data
      }
    },

    actions: {
      async getPurchased({ commit }) {
        commit('SET_PURCHASED', [])
        const purchasedArr = []
        const fun = functions.httpsCallable('fetchPurchasedSlots')
        const purchased = await fun({ buyerUid: store.state.auth.currentUser.uid })
        if (!purchased.data) {
          return
        }
        else {
          purchased.data.forEach(async (data) => {
            const session = formatter(data)
            purchasedArr.push(session)
          })
          commit('SET_PURCHASED', purchasedArr)
          return
        }
      },
      async getSold({ commit }) {
        commit('SET_SOLD', [])
        const soldArr = []
        const fun = functions.httpsCallable('fetchSoldSessions')
        const sold = await fun({ sellerUid: store.state.auth.currentUser.uid })
        if (!sold.data) {
          return
        }
        else {
          sold.data.forEach((data) => {
            const session = formatter(data)
            soldArr.push(session)
          })
          commit('SET_SOLD', soldArr)
          return
        }
      },
      async selectSession({ commit }, session) {
        let buyers = []
        if (session.slots > 1) {
          session.participants.forEach(async (participant) => {
            const buyer = await db.collection('users').doc(participant).get()
            buyers.push(buyer.data())
          })
        }
        else {
          const buyer = await db.collection('users').doc(session.buyerUid).get()
          buyers.push(buyer.data())
        }
        const seller = await db.collection('sellers').doc(session.sellerUid).get()
        commit('SET_SELECTED', {
          session: session,
          seller: seller.data(),
          buyers: buyers,
          bookedSlots: buyers.length
        })
        return
      },
    },

    getters: {
      sold: state => {
        return state.home.sold
      },
      purchased: state => {
        return state.home.purchased
      },
      selected: state => {
        return state.home.selected
      }
    }
  }
