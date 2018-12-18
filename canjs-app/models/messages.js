import { DefineMap, DefineList, QueryLogic } from 'can'
import feathersClient from '../feathers-client'
import feathersConnection from './connections/feathers'
import feathersQueryLogic from 'feathers-query-logic'

var Message = DefineMap.extend('Message', {
  _id: {
    identity: true,
    type: 'string'
  },
  name: 'string',
  to: 'string',
  from: 'string'
})

Message.List = DefineList.extend({
  '#': Message
})

Message.connection = feathersConnection({
  idProp: '_id',
  Map: Message,
  List: Message.List,
  feathersService: feathersClient.service('/messages'),
  name: 'message',
  queryLogic: new QueryLogic(Message, feathersQueryLogic)
})

export default Message
