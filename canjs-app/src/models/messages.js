import DefineMap from 'can-define/map/map'
import DefineList from 'can-define/list/list'
import QueryLogic from 'can-query-logic'
import superModel from './super-model'
import feathersClient from './feathers-client'
import feathersQuery from './feathers-query'
import User from './user'

var Message = DefineMap.extend('Message', {
  _id: {
    type: 'string'
  },
  name: {
    type: 'string'
  },
  to: {
    Type: User
  },
  from: {
    Type: User
  }
})

Message.List = DefineList.extend({
  '#': Message
})

Message.connection = superModel({
  Map: Message,
  List: Message.List,
  feathersService: feathersClient.service('/messages'),
  name: 'message',
  queryLogic: new QueryLogic(Message, feathersQuery)
})

export default Message
