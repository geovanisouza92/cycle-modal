
# cycle-modal

Inspired by [React Portals](https://reactjs.org/docs/portals.html) I made this simple example

# TL;DR

You can mount as many "Portals" as you like, using the power of drivers without bloating your components with side effects. Just structure (HTML) and logic (JS / Streams)

# Long, try to read

So, Cycle.js uses this concept of separating logic from side-effects. The logic is inside your components, while the side-effects are handled by [drivers](https://cycle.js.org/drivers.html).

When you think about a simple modal, you have two main concerns: Open and close the modal.

It's quite common, specially when using third-party libs like Bootstrap, to the modal be "attached" to `document.body` with the required styling, content and behavior.

Cycle.js, React, Vue, Angular, and many other frameworks has this concept of "mounting" the app inside a root element. The required approach for showing a modal sometimes require you mount-it outside the app's root element, e.g., when your app is embedded inside another bigger app (maybe just a section on a static site).

So, React 16 came with this concept of "Portals", that allows you to render some component outside the React's root element.

Cycle.js on the other hand, handles this using multiple DOM drivers, where you can direct portions of your component on other root elements, while maintaning all the logic in one place.
