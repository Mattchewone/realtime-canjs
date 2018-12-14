import DefineMap from 'can-define/map/'
import DefineList from 'can-define/list/list'
import sessionConnection from './connections/session'
import feathersClient from '../feathers-client'
import User from './user'

const Session = DefineMap.extend('Session', { seal: false }, {
  userId: 'string',
  accessToken: 'string',

  user: {
    Type: User,
    get (lastVal, setVal) {
      if (this.userPromise) {
        this.userPromise.then(setVal)
      }
      return lastVal
    }
  },
  userError: {
    get (lastVal, setVal) {
      if (this.userPromise) {
        this.userPromise.catch(setVal)
      }
      return null
    }
  },
  userPromise: {
    get () {
      if (this.userId) {
        return User.get({ _id: this.userId })
      }
      return null
    }
  }
})

Session.List = DefineList.extend({
  '#': Session
})

Session.connection = sessionConnection({
  feathersClient: feathersClient,
  idProp: 'exp',
  Map: Session,
  List: Session.List,
  name: 'session'
})

export default Session
