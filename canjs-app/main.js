import { route, RoutePushstate, Component, stacheRouteHelpers } from 'can'
import view from './main.stache!'

import Session from './models/session'
import MessageList from './pages/message-list/message-list'
import HomePage from './pages/home/home'
import LoginPage from './pages/login/login'
import SignupPage from './pages/signup/signup'

import './app.less'

Component.extend({
  tag: 'main-app',
  view,
  ViewModel: {
    page: 'string',
    routeData: {
      default () {
        route.urlData = new RoutePushstate()
        route.register('{page}', { page: 'login' })
        route.start()
        return route.data
      }
    },
    authError: {
      get (lastVal, setVal) {
        this.sessionPromise.catch(setVal)
        return null
      }
    },
    currentUser: {
      get: () => Session.current.user
    },
    sessionPromise: {
      type: 'any',
      default () {
        return new Session({})
          .save()
          .then(session => {
            if (session.userPromise) {
              return session.userPromise
            }
            if (session.user) {
              return session.user
            }
          })
      }
    },

    get componentToShow () {
      switch (this.routeData.page) {
        case 'messages':
          return new MessageList()
        case 'login':
          return new LoginPage()
        case 'signup':
          return new SignupPage()
        default:
          return new HomePage()
      }
    },

    logout () {

    },

    init () {
      this.sessionPromise
        .then(user => ('messages'))
        .catch(e => ('login'))
        .then(page => {
          // Set the default page to load
          route.data.update({ page })
        })
    }
  }
})
