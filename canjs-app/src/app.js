import { DefineMap, route } from 'can'
import RoutePushstate from 'can-route-pushstate'
import debug from 'can-debug#?./is-dev'

//! steal-remove-start
if (debug) {
  debug()
}
//! steal-remove-end

const AppViewModel = DefineMap.extend('AppViewModel', {
  env: {
    default: () => ({ NODE_ENV: 'development' })
  },
  title: {
    default: 'canjs'
  },
  routeData: {
    default: () => route.data
  },
  pageComponentModuleName: {
    get () {
      switch (this.routeData.page) {
        case 'messages': return '~/pages/messages/'
        default: return '~/pages/home/'
      }
    }
  },
  pageComponent: {
    get () {
      return steal.import(this.pageComponentModuleName)
        .then(({ default: Component }) => {
          return new Component()
        })
    }
  }
})

route.urlData = new RoutePushstate()
route.register('{page}', { page: 'home' })

export default AppViewModel
