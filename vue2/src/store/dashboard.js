import { db, functions } from '../plugins/firebase'
import { store } from '.'
import { formatter } from '../plugins/sessionFormatter'

export const dashboard = {
    namespaced: true,

    state: () => ({
      home: {
        purchased: [],
        sold: [],
      },
      selected: {
        session: {},
        seller: {},
        buyers: [],
        bookedSlots: [],
        service: {},
        chatroom: "",
      },
    }),

    mutations: {
      SET_PURCHASED(state, data) {
        state.home.purchased = data
      },
      SET_SOLD(state, data) {
        state.home.sold = data
      },
      SET_SELECTED_SESSION(state, data) {
        state.selected.session = data
      },
      SET_SELECTED_SELLER(state, data) {
        state.selected.seller = data
      },
      SET_SELECTED_BUYERS(state, data) {
        state.selected.buyers.push(data)
      },
      SET_SELECTED_BOOKEDSLOTS(state, data) {
        state.selected.bookedSlots = data
      },
      SET_SELECTED_SERVICE(state, data) {
        state.selected.service = data
      },
      SET_SELECTED_CHATROOM(state, data) {
        state.selected.chatroom = data
      },
      RESET_SELECTED(state) {
        state.selected = {
          session: {},
          seller: {},
          buyers: [],
          bookedSlots: {},
          service: {},
          chatroom: "",
        }
      },
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
            const slot = {
              id: data.id,
              name: data.name,
              slot: data.slot,
              slots: data.slots,
              mandatoryFill: data.mandatoryFill,
              start: formatter(data.start),
              end: formatter(data.end),
              sellerUid: data.sellerUid,
              serviceDocId: data.serviceDocId,
              buyerUid: data.buyerUid,
              buyerUsername: data.buyerUsername,
              paymentIntent: data.paymentIntent,
              status: data.status,
              parentSession: data.parentSession
            }
            purchasedArr.push(slot)
          })
          commit('SET_PURCHASED', purchasedArr)
          return
        }
      },
      async getSold({ commit }) {
        commit('SET_SOLD', [])
        const soldArr = []
        const fetchSoldSlots = functions.httpsCallable('fetchSoldSlots')
        const sold = await fetchSoldSlots({ sellerUid: store.state.auth.currentUser.uid })
        if (!sold.data) {
          return
        }
        else {
          sold.data.forEach((data) => {
            const slot = {
              id: data.id,
              name: data.name,
              slot: data.slot,
              slots: data.slots,
              mandatoryFill: data.mandatoryFill,
              start: formatter(data.start),
              end: formatter(data.end),
              sellerUid: data.sellerUid,
              serviceDocId: data.serviceDocId,
              buyerUid: data.buyerUid,
              buyerUsername: data.buyerUsername,
              paymentIntent: data.paymentIntent,
              status: data.status,
              parentSession: data.parentSession
            }
            soldArr.push(slot)
          })
          commit('SET_SOLD', soldArr)
          return
        }
      },
      async selectSlot({ commit }, slot) {
        commit('RESET_SELECTED')
        commit('SET_SELECTED_BOOKEDSLOTS', slot)
        const parentRef = db
          .collection('sessions')
          .doc(slot.parentSession)
        const parent = await parentRef.get()
        commit('SET_SELECTED_SESSION', parent.data())
        const qslots = await parentRef
          .collection('slots')
          .where('status', '==', 'booked')
          .get()
        const fetchUser = functions.httpsCallable('fetchUser')
        qslots.forEach(async slot => {
            let buyer = await fetchUser({uid: slot.data().buyerUid})
            commit('SET_SELECTED_BUYERS', buyer.data)
        })
        const seller = await db
          .collection('creators')
          .doc(parent.data().sellerUid)
          .get()
        commit('SET_SELECTED_SELLER', seller.data())
        const chat = await db.collection('chats')
          .doc(parent.id)
          .get()
        commit('SET_SELECTED_CHATROOM', chat.data().title)
        const srv = await db.collection('services')
          .doc(parent.data().serviceDocId)
          .get()
        commit('SET_SELECTED_SERVICE', srv.data())
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
