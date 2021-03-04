import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (to.query.tenantId) {
    store.dispatch('app/setTenantId', to.query.tenantId)
  }

  if (to.query.globalUniqueID) {
    store.dispatch('app/setGlobalUniqueID', to.query.globalUniqueID)
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})
