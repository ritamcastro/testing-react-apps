// simple test with ReactDOM
// http://localhost:3000/counter
import React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

test('counter increments when the button is clicked', () => {
  // 🐨 create a div to render your component to (💰 document.createElement)
  const ourDiv = document.createElement("div")

  // 🐨 append the div to document.body (💰 document.body.appendChild)
  document.body.appendChild(ourDiv)

  // 🐨 use ReactDOM.render to render the <Counter /> to the div
  const counter = ReactDOM.render(<Counter/>, ourDiv)

  // 🐨 get a reference to the increment and decrement buttons:
  const buttons = ourDiv.querySelectorAll('button')
  const decrementBtn = buttons[0]
  const incrementBtn = buttons[1]
  //   💰 div.querySelectorAll('button')
  // 🐨 get a reference to the message div:
  const messageDiv = ourDiv.firstChild.querySelector('div')
  //   💰 div.firstChild.querySelector('div')
  //
  // 🐨 expect the message.textContent toBe 'Current count: 0'
  expect(messageDiv.textContent).toBe('Current count: 0')

  // 🐨 click the increment button (💰 increment.click())
  incrementBtn.click()

  // 🐨 assert the message.textContent
  expect(messageDiv.textContent).toBe('Current count: 1')

  // 🐨 click the decrement button (💰 decrement.click())
  decrementBtn.click()
  // 🐨 assert the message.textContent
  expect(messageDiv.textContent).toBe('Current count: 0')

  // 🐨 cleanup by removing the div from the page (💰 document.body.removeChild(div))
  document.body.removeChild(ourDiv)

  // 🦉 If you don't cleanup, then it could impact other tests and/or cause a memory leak
})

/* eslint no-unused-vars:0 */
