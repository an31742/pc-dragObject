const state = {
  tenantId: window.sessionStorage.getItem('tenantId'), // 租户id
  globalUniqueID: window.sessionStorage.getItem('globalUniqueID')
}

const mutations = {
  SET_TENANT_ID (state, tenantId) {
    state.tenantId = tenantId
    window.sessionStorage.setItem('tenantId', tenantId)
  },
  SET_GLOBAL_UNIQUE_ID (state, globalUniqueID) {
    state.globalUniqueID = globalUniqueID
    window.sessionStorage.setItem('globalUniqueID', globalUniqueID)
  }

}

const actions = {
  setTenantId ({ commit }, tenantId) {
    commit('SET_TENANT_ID', tenantId)
  },
  setGlobalUniqueID ({ commit }, globalUniqueID) {
    commit('SET_GLOBAL_UNIQUE_ID', globalUniqueID)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
