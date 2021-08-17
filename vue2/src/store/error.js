export const error = {

  namespaced: true,

  state: () => ({
    data: {
      show: false,
      message: null,
      color: null,
      icon: null
    }
  }),

  getters: {
    errorData: state => {
      return state.data.message
    },

    showError: state => {
      return state.data.show
    }
  },

  mutations: {
    SET_SHOW_ERROR(state, value) {
      state.data.show = value
    },

    SET_ERROR(state, data) {
      state.data = {...data}
    }
  },

  actions: {
    setError({ commit }, data) {
      commit('SET_ERROR', data)
    },

    setShowError({ commit }, value) {
      commit('SET_SHOW_ERROR', value)
    }
  }
}