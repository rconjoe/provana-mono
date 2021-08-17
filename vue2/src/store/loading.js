export const loading = {
    namespaced: true,
    state: () => ({
        show: false,
    }),
    mutations: {
        SET_LOADING(state, value) {
            state.show = value
        }
    },
    actions: {
        setLoading({ commit }, value) {
            commit('SET_LOADING', value)
        }
    }
}