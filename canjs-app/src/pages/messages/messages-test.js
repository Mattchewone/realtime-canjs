import QUnit from 'steal-qunit'
import { ViewModel } from './messages'

// ViewModel unit tests
QUnit.module('~/pages/messages')

QUnit.test('Has message', function () {
  var vm = new ViewModel()
  QUnit.equal(vm.message, 'This is the message-list component')
})
