import { Component } from 'can'


export default Component.extend({
  tag: 'page-home',
  view: `<h1>Home page</h1>
  <a href="{{ routeUrl(page='messages') }}">
    Go to messages
  </a>
  `,
  ViewModel: {}
})
