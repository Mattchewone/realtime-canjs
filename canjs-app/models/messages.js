import DefineMap from 'can-define/map/'
import DefineList from 'can-define/list/list'
import feathersClient from '../feathers-client'
import feathersConnection from './connections/feathers'
import makeAlgebra from './algebra'

var Message = DefineMap.extend('Message', {
  _id: 'string',
  name: 'string',
  to: 'string',
  from: 'string'
})

Message.List = DefineList.extend({
  '#': Message
})

const algebra = makeAlgebra({})

Message.connection = feathersConnection({
  idProp: '_id',
  Map: Message,
  List: Message.List,
  feathersService: feathersClient.service('/messages'),
  name: 'message',
  algebra
})

export default Message
