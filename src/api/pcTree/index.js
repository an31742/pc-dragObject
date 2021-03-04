// import request from '../flow/node_modules/@/utils/request.js.js.js'
import request from '@/utils/request.js'
export default {

  // 人员组织树 多了一个斜杠可以去掉试试
  getUserTree (data) {
    return request({
      url: '//AAAA/getUserTree.do',
      method: 'get',
      params: data
    })
  },
  // 部门组织树
  getDeptTree (data) {
    return request({
      url: '/AAAA/getDeptTree.do',
      method: 'get',
      params: data
    })
  },
  // 表单设计树
  getProcessTree (data) {
    return request({
      url: '/BPM/processTree.do',
      method: 'get',
      params: data
    })
  },
  // 人员模糊查询
  searchUserTreeList (data) {
    return request({
      url: '/AAAA/getUserList.do',
      method: 'get',
      params: data
    })
  },
  // 部门模糊查询
  searchDeptTreeList (data) {
    return request({
      url: '/AAAA/getDeptList.do',
      method: 'get',
      params: data
    })
  }
}
