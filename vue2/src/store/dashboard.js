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
        const fetchPurchasedSlots = functions.httpsCallable('fetchPurchasedSlots')
        const purchased = await fetchPurchasedSlots({ buyerUid: store.state.auth.currentUser.uid })
        if (!purchased.data) {
          return
        }
        else {
          purchased.data.forEach(async (data) => {
            const session = {
              name: data.name,
              color: data.color,
              serviceColor: data.serviceColor,
              start: formatter(data.start),
              end: formatter(data.end),
              status: data.status,
              participants: data.participants,
              buyerUid: data.buyerUid,
              slot: data.slot,
              slots: data.slots,
              parentSession: data.parentSession,
              sellerUid: data.sellerUid,
              serviceDocId: data.serviceDocId,
              id: data.id,
            }
            purchasedArr.push(session)
          })
          commit('SET_PURCHASED', purchasedArr)
          return
        }
      },
      async getSold({ commit }) {
        commit('SET_SOLD', [])
        const soldArr = []
        const fetchSoldSessions = functions.httpsCallable('fetchSoldSessions')
        const sold = await fetchSoldSessions({ sellerUid: store.state.auth.currentUser.uid })
        if (!sold.data) {
          return
        }
        else {
          sold.data.forEach((data) => {
            const session = {
              name: data.name,
              color: data.color,
              serviceColor: data.serviceColor,
              start: formatter(data.start),
              end: formatter(data.end),
              status: data.status,
              participants: data.participants,
              buyerUid: data.buyerUid,
              slot: data.slot,
              slots: data.slots,
              parentSession: data.parentSession,
              sellerUid: data.sellerUid,
              serviceDocId: data.serviceDocId,
              id: data.id,
            }
            soldArr.push(session)
          })
          commit('SET_SOLD', soldArr)
          return
        }
      },
      async selectSession({ commit }, session) {
        const qslots = await db
          .collection('sessions')
          .doc(session.id)
          .collection('slots')
          .get()
        const fetchUser = functions.httpsCallable('fetchUser')
        let buyers = []
        qslots.forEach(async slot => {
          if (slot.data().status === 'booked') {
            let buyer = await fetchUser({uid: slot.data().buyerUid})
            buyers.push(buyer.data)
          }
        })
        console.log(buyers)
        const seller = await db
          .collection('creators')
          .doc(session.sellerUid)
          .get()
        commit('SET_SELECTED', {
          session: session,
          seller: seller.data(),
          buyers: buyers,
          bookedSlots: session
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
