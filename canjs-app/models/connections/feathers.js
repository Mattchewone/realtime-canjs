import connect from 'can-connect'
import constructor from 'can-connect/constructor/constructor'
import canMap from 'can-connect/can/map/map'
import canRef from 'can-connect/can/ref/ref'
import constructorStore from 'can-connect/constructor/store/store'
import dataCallbacks from 'can-connect/data/callbacks/callbacks'
import combineRequests from 'can-connect/data/combine-requests/combine-requests'
import dataParse from 'can-connect/data/parse/parse'
import realTime from 'can-connect/real-time/real-time'
import callbacksOnce from 'can-connect/constructor/callbacks-once/callbacks-once'
import feathersServiceBehavior from 'can-connect-feathers/service'

const feathersConnection = function (newBehaviors, options) {
  if (arguments.length === 1) {
    options = newBehaviors
  }

  const behaviors = [
    feathersServiceBehavior,
    constructor,
    canMap,
    canRef,
    constructorStore,
    dataCallbacks,
    combineRequests,
    dataParse,
    realTime,
    callbacksOnce]

  if (arguments.length === 2) {
    [].push.apply(behaviors, newBehaviors)
  }

  return connect(behaviors, options)
}

export default feathersConnection
