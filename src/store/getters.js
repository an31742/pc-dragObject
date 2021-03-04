const getters = {
  tenantId: state => state.app.tenantId, // 租户id
  globalUniqueID: state => state.app.globalUniqueID,
  selectPopupShow: state => state.widget.selectPopupShow
}
export default getters
