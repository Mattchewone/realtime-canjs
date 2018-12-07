import DefineMap from 'can-define/map/map'
import DefineList from 'can-define/list/list'
import QueryLogic from 'can-query-logic'
import superModel from './super-model'
import feathersClient from './feathers-client'
import feathersQuery from './feathers-query'

var User = DefineMap.extend('User', {
  _id: {
    type: 'string'
  },
  email: {
    type: 'string'
  },
  password: {
    type: 'string'
  }
})

User.List = DefineList.extend({
  '#': User
})

User.connection = superModel({
  Map: User,
  List: User.List,
  feathersService: feathersClient.service('/users'),
  name: 'user',
  queryLogic: new QueryLogic(User, feathersQuery)
})

export default User
