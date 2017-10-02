import { div, button, span, p } from '@cycle/dom'
import xs from 'xstream'
import debounce from 'xstream/extra/debounce'

export function App(sources) {
  const openModal$ = sources.DOM
    .select('#myBtn')
    .events('click')
    .mapTo(true) // Open modal
  const closeModal$ = xs
    .merge(
      // Click outside modal
      sources.Modal.select(':root').events('click'),
      // Click on close button
      sources.Modal.select('.close').events('click')
    )
    .mapTo(false) // Close modal
    .compose(debounce(1)) // Avoid duplicates
  const modalState$ = xs.merge(openModal$, closeModal$).startWith(false) // Start closed

  const modalVtree$ = modalState$.map(visible =>
    div('#myModal.modal', { style: { display: visible ? 'block' : 'none' } }, [
      span('.close', 'X'),
      p('Some text in the Modal...')
    ])
  )
  const appVtree$ = xs.of(button('#myBtn', 'Open Modal'))
  
  const sinks = {
    DOM: appVtree$,
    Modal: modalVtree$
  }
  return sinks
}
