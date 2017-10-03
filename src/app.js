import { div, button, span, p } from '@cycle/dom'
import xs from 'xstream'
import debounce from 'xstream/extra/debounce'

function Modal(sources) {
  // Intent: Here we handle modal actions like Close, OK, Yes/No
  const closeModal$ = xs
    .merge(
      // Click outside modal
      sources.Modal.select(':root').events('click'),
      // Click on close button
      sources.Modal.select('.close').events('click')
    )
    .mapTo(false) // Close modal
    .compose(debounce(1)) // Avoid duplicates

  // Model: The current state (open/closed, position, etc.)
  const modalState$ = xs.merge(sources.OpenModal, closeModal$).startWith(false) // Start closed

  // View: :)
  const modalVtree$ = xs
    .combine(sources.Content, modalState$)
    .map(([content, visible]) =>
      div(
        '#myModal.modal',
        { style: { display: visible ? 'block' : 'none' } },
        [span('.close', 'X'), content]
      )
    )

  // Modal component exports the current state and the
  // DOM structure (title, buttons, etc.)
  const sinks = {
    State: modalState$,
    DOM: modalVtree$
  }
  return sinks
}

export function App(sources) {
  // Intent: Here the "App" handles when to open the Modal
  const openModal$ = sources.DOM
    .select('#myBtn')
    .events('click')
    .mapTo(true) // Open modal

  // The modal receives the Content and the "Open" event
  const modal = Modal({
    ...sources,
    OpenModal: openModal$,
    Content: xs.of(p('Some text in the Modal...'))
  })

  // View
  const appVtree$ = xs.of(button('#myBtn', 'Open Modal'))

  // Here the app decides where the Modal will be rendered, our "Portal"
  const sinks = {
    DOM: appVtree$,
    Modal: modal.DOM
  }
  return sinks
}
