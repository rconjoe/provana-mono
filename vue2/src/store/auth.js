import { store } from './index'

export const auth = {
    namespaced: true,

    state: () => ({
        currentUser: null,
        error: null,
        claims: null,
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
    },
}