import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    theme: 'light'
  },
  mutations: {
    toggleTheme(state, theme) {
      state.theme = theme
    }
  }
})

export default store