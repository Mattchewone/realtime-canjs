import connect from 'can-connect'
import dataParse from 'can-connect/data/parse/'
import construct from 'can-connect/constructor/'
import constructStore from 'can-connect/constructor/store/'
import constructCallbacksOnce from 'can-connect/constructor/callbacks-once/'
import canMap from 'can-connect/can/map/'
import canRef from 'can-connect/can/ref/'
import dataCallbacks from 'can-connect/data/callbacks/'
import realTime from 'can-connect/real-time/real-time'
import feathersSessionBehavior from 'can-connect-feathers/session'

const sessionConnection = function(options) {
  return connect([
    feathersSessionBehavior,
    dataParse,
    canMap,
    canRef,
    construct,
    constructStore,
    constructCallbacksOnce,
    realTime,
    dataCallbacks
  ], options)
}

export default sessionConnection
