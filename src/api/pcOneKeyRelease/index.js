// import request from '../flow/node_modules/@/utils/request.js.js.js'
import request from '@/utils/request.js'
export default {
  //  上线
  onlineList  (data) {
    return request({
      url: '/processAppPulish/push.do',
      method: 'get',
      params: data
    })
  },
  // 发布
  pushList (data) {
    return request({
      url: '/processAppPulish/list.do',
      method: 'get',
      params: data
    })
  },
  // 下线
  offlineList (data) {
    return request({
      url: '/processAppPulish/offline.do',
      method: 'get',
      params: data
    })
  }

}
