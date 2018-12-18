import { Component, route } from 'can'

import User from '../../models/user'
import Session from '../../models/session'

export default Component.extend({
  tag: 'page-signup',
  view: `<div>
    <h1>Signup</h1>
    <div>
      <form on:submit="this.createUser(scope.event)">
        <input name="username" placeholder="Username" value:to="this.username">
        <input name="password" type="password" placeholder="Password" value:to="this.password">
        <button type="submit">Signup</button>
      </form>
    </div>
    </div>`,
  ViewModel: {
    username: 'string',
    password: 'string',

    createUser (event) {
      event.preventDefault()
      new User({ email: this.username, password: this.password })
        .save()
        .then(res => {
          new Session({ strategy: 'local', email: this.username, password: this.password })
            .save()
            .then(res => {
              console.log('logged in')
              route.data.update({ page: 'messages' })
            })
        })
    }
  }
})
