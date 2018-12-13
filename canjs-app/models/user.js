import DefineMap from 'can-define/map/'
import DefineList from 'can-define/list/list'
import canSet from 'can-set'
import feathersClient from '../feathers-client'
import feathersConnection from './connections/feathers'

const algebra = new canSet.Algebra(
  canSet.props.id('_id')
)

const User = DefineMap.extend({
  _id: 'string',
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
  Map: User,
  List: User.List,
  name: 'user',
  idProp: '_id',
  feathersService: feathersClient.service('users'),
  algebra
})

export default User
