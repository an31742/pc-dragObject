import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

import app from './modules/app'
import widget from './modules/widget'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    currentPage: 1 // 当前页面索引
  },
  mutations: {
    SET_CURRENT_PAGE (state, payload) {
      state.currentPage = payload
    }
  },
  actions: {
    setCurrentPage ({ state, commit, getters }, payload) {
      // setTimeout(() => {
      commit('SET_CURRENT_PAGE', payload)
      // }, 1000)
    }
  },
  modules: {
    app,
    widget
  },
  getters
})

export default store
