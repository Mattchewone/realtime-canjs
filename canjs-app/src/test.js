import F from 'funcunit'
import QUnit from 'steal-qunit'

import 'canjs/models/test'

import '~/pages/messages/messages-test'

import '~/pages/home/home-test'

F.attach(QUnit)

QUnit.module('canjs functional smoke test', {
  beforeEach () {
    F.open('./development.html')
  }
})

QUnit.test('canjs main page shows up', function () {
  F('title').text('canjs', 'Title is set')
})
