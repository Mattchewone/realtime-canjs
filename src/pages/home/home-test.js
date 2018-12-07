import QUnit from 'steal-qunit'
import { ViewModel } from './home'

// ViewModel unit tests
QUnit.module('~/pages/home')

QUnit.test('Has message', function () {
  var vm = new ViewModel()
  QUnit.equal(vm.message, 'This is the home-page component')
})
