import { db, functions } from '../plugins/firebase'

export const viewing = {
    namespaced: true,
    state: () => ({
        // uid of the user whose profile you're viewing:
        viewingUID: null,
        // profile object corresponding to above UID:
        profile: null,
        // posts corresponding to above UID:
        postArray: null,
        // services "" ""
        services: null,
    }),
    mutations: {
        SET_VIEWING_UID(state, data) {
            state.viewingUID = data
        },
        SET_PROFILE(state, data) {
            state.profile = data
        },
        SET_POSTS(state, data) {
            state.postArray = data
        },
        SET_SERVICES(state, data) {
            state.services = data
        },
    },
    actions: {
        // gets passed a username from the url route via to.params in beforeEnter.
        // turns it into a UID and a profile object, then sets those to state.
        async name2data({ commit }, username) {
            // query db from frontend sdk:

            // TODO: need to change this to sellser
            const query = db.collection('sellers').where("username", "==", username)
            await query.get()
                // iterate through the response
                .then(function(snapshot) {
                    snapshot.forEach(function(doc) {
                        commit("SET_VIEWING_UID", doc.id)
                        commit("SET_PROFILE", doc.data())
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        // get services for the current viewee
        async fetchServices({ commit }) {
            // id from store just to be verbose:
            const id = store.state.viewing.viewingUID;
            // we use a function here because the sorting code has already
            // been written in the backend:
            const fun = functions.httpsCallable('getServices')
            await fun({ uid: id }).then((res) => {
                commit("SET_SERVICES", res.data)
            })
        },
        // get posts for current viewee
        async fetchPosts({ commit }) {
            const id = store.state.viewing.viewingUID;
            // same thing with the function, no sorting to be done here
            const fun = functions.httpsCallable('fetchSellersPosts')
            await fun({ uid: id }).then((res) => {
                commit("SET_POSTS", res.data)
            })
        }
    },
}