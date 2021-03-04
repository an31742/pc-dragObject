// import request from './flow/node_modules/@/utils/request.js.js'
import request from '@/utils/request.js'
import FromList from './pcFromList/index'
import OneKeyRelease from './pcOneKeyRelease/index'
import Tree from './pcTree/index'
export default {
// 公用接口
  // 获取租户下所有的页面
  getAllOlderList (data) {
    return request({
      url: '/form/api/selFormByTenant.do',
      method: 'post',
      data
    })
  },
  ...FromList,
  ...OneKeyRelease,
  ...Tree
}
