
import connect from 'can-connect'

const errorHandler = connect.behavior('error-handler', baseConnect => {
  const behavior = {}

    ;['getData', 'getListData', 'createData', 'updateData', 'destroyData'].forEach(method => {
    behavior[method] = (...args) => {
      const promise = baseConnect[method].apply(baseConnect, args)
      promise.catch(e => {
        console.error((e.responseJSON && e.responseJSON.message) || e.responseText || e.message)
      })

      return promise
    }
  })

  return behavior
})

export default errorHandler
