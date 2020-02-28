import React from 'react'
import Quantity from './Quantity'
// import ReactDOM from 'react-dom'
// import { act } from 'react-dom/test-utils'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('Quantity', () => {
  it('should increment if plus is clicked', () => {
    let { container } = render(<Quantity />)
    let quantity = container.querySelector(
      '[data-testid=quantity]'
    )
    let add = container.querySelector(
      '[data-testid=add-button]'
    )

    expect(quantity.value).toBe('0')
    fireEvent.click(add)
    expect(quantity.value).toBe('1')
  })

  it('should not decrement if minus is clicked and value is 0', () => {
    let { container } = render(<Quantity />)
    let quantity = container.querySelector(
      '[data-testid=quantity]'
    )
    let subtract = container.querySelector(
      '[data-testid=subtract-button]'
    )

    expect(quantity.value).toBe('0')
    fireEvent.click(subtract)
    expect(quantity.value).toBe('0')
  })

  it('should decrement if minus is clicked and value is above 0', () => {
    let { container } = render(<Quantity />)
    let quantity = container.querySelector(
      '[data-testid=quantity]'
    )
    let subtract = container.querySelector(
      '[data-testid=subtract-button]'
    )

    fireEvent.change(quantity, { target: { value: '5' } })
    expect(quantity.value).toBe('5')

    fireEvent.click(subtract)
    expect(quantity.value).toBe('4')
  })
})

/**
 * With React Testing Library
 */

// import { render, cleanup, fireEvent } from '@testing-library/react'
// import '@testing-library/jest-dom/extend-expect'

// describe('Quantity', () => {
//   afterEach(cleanup)

//   it('should start with 0', () => {
//     const { getByTestId } = render(<Quantity />)
//     const minutes = getByTestId('quantity')
//     expect(minutes.value).toEqual('0')
//   })
// })
