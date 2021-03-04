import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css' // CSS resets
import '@/assets/styles/index.scss' // 全局样式

import 'babel-polyfill' // 解决浏览器兼容性问题

import draggable from 'vuedraggable' // 拖拽组件
// import Vuetable from 'vuetable'
import Vant from 'vant' // 移动端 ui 组件
import 'vant/lib/index.css'
import './assets/styles/vant-reset.scss' // vant UI库样式复写

import ElementUI from 'element-ui' // element-ui
// import 'element-ui/lib/theme-chalk/index.css'

import './assets/styles/app-mock.scss'
import './assets/styles/pc-mock.scss'

import './perminssin'

// 用于方便开发可视化拖拽数据，上线前删除
import rawDisplayer from './components/infra/raw-displayer.vue'
// Vue.component('vuetable', Vuetable)
// 引入样式
// import 'vue-easytable/libs/themes-base/index.css'
// 导入 table 和 分页组件
// import { VTable } from 'vue-easytable'

// 注册到全局
// Vue.component(VTable.name, VTable)

Vue.use(ElementUI, { size: 'small' })

Vue.use(Vant)

Vue.component('draggable', draggable)
Vue.component('rawDisplayer', rawDisplayer)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
