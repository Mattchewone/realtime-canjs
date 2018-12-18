import { Component, stacheRouteHelpers } from 'can'

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
    messages: 'any',
    users: 'any',

    get messagesAndUsers () {
      return Promise.all([
        this.messagesPromise,
        this.usersPromise
      ])
    },

    user: {
      get: () => Session.current.user
    },

    messagesPromise: {
      default: () => Messages.getList({ $or: [{ from: Session.current.user._id }, { to: Session.current.user._id }] })
    },

    usersPromise: {
      default: () => User.getList()
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
    },

    connectedCallback () {
      // Listen to the session prop so we can load messages
      // once we have an user
      this.listenTo('user', (e, newVal) => {
        // Load both users and messages and assign to VM
        this.messagesAndUsers.then(([messages, users]) => {
          this.messages = messages
          this.users = users
        })      
      })
    }
  }
})
