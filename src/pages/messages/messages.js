import { Component } from 'can'
import './messages.less'
import view from './messages.stache'
import Messages from 'canrealtime/models/messages'

export const MessageList = Component.extend({
  tag: 'message-list',
  view,
  ViewModel: {
    // EXTERNAL STATEFUL PROPERTIES

    // INTERNAL STATEFUL PROPERTIES
    messages: {
      get (last, resolve) {
        this.messagesPromise
          .then(resolve)
          .catch(error => {
            console.log('error', error)
          })
        return []
      }
    },

    // DERIVED PROPERTIES
    get messagesPromise () {
      return Messages.findAll()
    },

    // METHODS

    // SIDE EFFECTS
    connectedCallback (element) {

    }
  }
})

export default MessageList
export const ViewModel = MessageList.ViewModel
