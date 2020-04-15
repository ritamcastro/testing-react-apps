 // Avoid implementation details
// http://localhost:3000/counter
import React from 'react'
// 🐨 add `screen` to the import here:
import {render, fireEvent, screen} from '@testing-library/react'
import Counter from '../../components/counter'

test('counter increments when the button is clicked', () => {
  const {container, getByRole, getByText} = render(<Counter />)
  // 🐨 replace these with screen queries
  // 💰 you can use `getByText` for each of these (`getByRole` can work for the button too)
  const decrement = getByRole('button', {name: 'Decrement'})
  const increment = getByRole('button', {name: 'Increment'})
  // const message = container.firstChild.querySelector('div')

  expect(getByText('Current count: 0')).toBeInTheDocument()
  fireEvent.click(increment)
  expect(getByText('Current count: 1')).toBeInTheDocument()
  fireEvent.click(decrement)
  expect(getByText('Current count: 0')).toBeInTheDocument()
})
