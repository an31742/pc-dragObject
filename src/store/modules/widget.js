const state = {
  selectPopupShow: false // 下拉选组件底部弹出层是否显示
}

const mutations = {
  SHOW_SELECT_POPUP (state, isShow) {
    state.selectPopupShow = isShow
  }
}

const actions = {
  showSelectPopup ({ commit }, isShow) {
    commit('SHOW_SELECT_POPUP', isShow)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
