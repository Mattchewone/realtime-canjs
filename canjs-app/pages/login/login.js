import { Component, route } from 'can'

import Session from '../../models/session'

export default Component.extend({
  tag: 'page-login',
  view: `<div>
      <h1>Login</h1>
      <div>
        <form on:submit="this.login(scope.event)">
          <input name="username" placeholder="Username" value:to="this.username">
          <input name="password" type="password" placeholder="Password" value:to="this.password">
          <button type="submit">Login</button>
        </form>
      </div>
    </div>`,
  ViewModel: {
    username: 'string',
    password: 'string',

    login (event) {
      event.preventDefault()

      new Session({ strategy: 'local', email: this.username, password: this.password })
        .save()
        .then(res => {
          route.data.update({ page: 'messages' })
        })
    }
  }
})
