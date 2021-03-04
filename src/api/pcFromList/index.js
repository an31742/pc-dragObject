// import request from '../flow/node_modules/@/utils/request.js.js.js'
import request from '@/utils/request.js'
export default {
  // 页面表单列表  所有参数没有穿空参数字段必须传
  getAllFromList (data) {
    return request({
      url: '/form/api/selFormByTenant.do',
      method: 'post',
      data
    })
  },

  // 编辑
  updateFormList (data) {
    return request({
      url: '/form/api/saveForm.do',
      method: 'post',
      data
    })
  },
  // 租户下的页面表单的删除 包括批量删除
  deleteFormList (data) {
    return request({
      url: '/form/api/delFormByFormId.do',
      method: 'post',
      data
    })
  },
  // 查看
  lookFormList (data) {
    return request({
      url: '/form/api/selectPageInfo.do',
      method: 'get',
      params: data
    })
  },
  // 增加
  addFormList (data) {
    return request({
      url: '/form/api/addForm.do',
      method: 'post',
      data
    })
  },
  // 子流程
  getSubprocessList (data) {
    return request({
      url: '/form/api/queryProcessDef.do',
      method: 'post',
      data
    })
  },
  // 字典值
  getDicByKinds (data) {
    return request({
      url: '/sys/sysDictionary/selDicByKinds.do',
      method: 'get',
      params: data
    })
  },
  // 绑定
  bindFormList (data) {
    return request({
      url: '/form/api/bindForm.do',
      method: 'get',
      params: data
    })
  },
  // 复制
  copyFormList (data) {
    return request({
      url: '/form/api/copyForm.do',
      method: 'post',
      data
    })
  },
  // 起草工单
  saveStartFromList (data) {
    return request({
      url: '/form/api/saveStartFrom.do',
      method: 'get',
      params: data
    })
  },
  // 子流程下拉列表
  queryProcessDef (data) {
    return request({
      url: '/form/api/queryProcessDef.do',
      method: 'get',
      params: data
    })
  },
  // 下拉框字典查询
  selDicByKinds (data) {
    return request({
      url: '/sys/sysDictionary/selDicByKinds.do',
      method: 'get',
      params: data
    })
  },
  // 移动
  moveForm (data) {
    return request({
      url: '/form/api/moveForm.do',
      method: 'get',
      params: data
    })
  }

}
