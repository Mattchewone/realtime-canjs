import { Component, DefineMap } from 'can'

import Messages from '../../models/messages'
import Session from '../../models/session'
import User from '../../models/user'

import './message-list.less'

export default Component.extend({
  tag: 'message-list',
  view: `<div>
  <h1>Messages</h1>
  <div>
    <form on:submit="sendMessage(scope.event)">
      <input name="to" placeholder="To" value:bind="to">
      <input name="msg" placeholder="Message.." value:bind="msg">
      <button type="submit">Create</button>
    </form>
  </div>
  <div class="wrapper" >
    {{# for(message of messages) }}
      <section>
        <div>
          TO: {{ users.usersById[message.to].email }}
        </div>
        <div>
          MSG: {{ message.name }}
        </div>
        <div>
          FROM: {{ users.usersById[message.from].email }}
        </div>
        <div>
          {{# eq(message.from, user._id) }}
            <input type="text" value:bind="message.name">
            <button type="button" on:click="updateMessage(scope.event, message)">Save</button>
          {{/ eq}}
        </div>
      {{/ for}}
    </section>
  </div>
</div>`,
  ViewModel: {
    msg: 'string',
    to: 'string',

    messages: {
      get (last, resolve) {
        this.messagesAndUsers
          .then(response => resolve(response[0]))
        return []
      }
    },
    users: {
      get (last, resolve) {
        this.messagesAndUsers
          .then(response => resolve(response[1]))
        return []
      }
    },

    get messagesAndUsers () {
      return Promise.all([
        this.messagesPromise,
        this.userPromise
      ])
    },

    get user () {
      return Session.current.user
    },

    messagesPromise: {
      get () {
        if (Session.current.user) {
          return Messages.findAll({ $or: [{ from: Session.current.user._id }, { to: Session.current.user._id }] })
        }
      }
    },

    userPromise: {
      default () {
        return User.findAll()
      }
    },

    sendMessage (event) {
      event.preventDefault()
      const toUser = this.users.usersByEmail[this.to]

      if (toUser) {
        new Messages({ name: this.msg, to: toUser._id })
          .save()
          .then(() => {
            this.msg = ''
            this.to = ''
          })
      } else {
        console.log('No user found')
      }
    },

    updateMessage (event, message) {
      event.preventDefault()

      message.save()
    }
  }
})

