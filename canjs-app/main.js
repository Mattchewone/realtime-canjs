import { DefineMap, route } from 'can'
import RoutePushState from 'can-route-pushstate'
import template from './main.stache!'

import Session from './models/session'
import MessageList from './pages/message-list/message-list'
import HomePage from './pages/home/home'
import LoginPage from './pages/login/login'
import SignupPage from './pages/signup/signup'

import './app.less'

const AppVM = DefineMap.extend({
  page: 'string',
  routeData: {
    default () {
      route.data = new DefineMap()
      route.urlData = new RoutePushState()
      route.register('{page}', { page: 'login' })
      route.start()
      return route.data
    }
  },
  authError: {
    get(lastVal, setVal) {
      this.sessionPromise.catch(setVal)
      return null
    }
  },
  currentUser: {
    get(lastVal, setVal) {
      return Session.current && Session.current.user
    }
  },
  sessionPromise: {
    type: 'any',
    serialize: false,
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

  get componentToShow() {
    switch(this.routeData.page) {
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
})

document.body.appendChild(template(new AppVM()))
