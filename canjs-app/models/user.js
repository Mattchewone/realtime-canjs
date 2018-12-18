import { DefineMap, DefineList, QueryLogic } from 'can'
import feathersClient from '../feathers-client'
import feathersConnection from './connections/feathers'
import feathersQueryLogic from 'feathers-query-logic'

const User = DefineMap.extend({
  _id: {
    identity: true,
    type: 'string'
  },
  email: 'string',
  password: 'string'
})

User.List = DefineList.extend({
  '#': User,

  get usersById () {
    return this.reduce((users, user) => {
      users[user._id] = user
      return users
    }, {})
  },

  get usersByEmail () {
    // Map to object keyed by name for easy lookup
    return this.reduce((users, user) => {
      users[user.email] = user
      return users
    }, {})
  }
})

User.connection = feathersConnection({
  idProp: '_id',
  Map: User,
  List: User.List,
  name: 'user',
  feathersService: feathersClient.service('users'),
  queryLogic: new QueryLogic(User, feathersQueryLogic)
})

export default User
