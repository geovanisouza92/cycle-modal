import {run} from '@cycle/run'
import {makeDOMDriver} from '@cycle/dom'
import {App} from './app'

const main = App

const drivers = {
  DOM: makeDOMDriver('#app'),
  Modal: makeDOMDriver('#modal')
}

run(main, drivers)
