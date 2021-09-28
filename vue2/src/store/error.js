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
      state.data.message = data.message;
      state.data.color = data.color;
      state.data.icon = data.icon
      state.data.show = data.show
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